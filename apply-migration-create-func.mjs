import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env.local') });

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials in environment');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createExecSqlFunction() {
  console.log('Creating exec_sql function...');
  
  const createFunctionSql = `
    CREATE OR REPLACE FUNCTION exec_sql(sql text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql;
    END;
    $$;
  `;

  // Use the Supabase REST API to create the function
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${serviceRoleKey}`,
      'apikey': serviceRoleKey,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ sql: createFunctionSql })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error creating exec_sql function:', errorText);
    return false;
  }
  console.log('exec_sql function created successfully');
  return true;
}

async function applyMigration() {
  const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20240809000000_create_tables.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log('Creating exec_sql function...');
  const created = await createExecSqlFunction();
  if (!created) {
    console.error('Failed to create exec_sql function');
    return;
  }

  console.log('Applying migration...');
  
  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (const statement of statements) {
    if (!statement.trim()) continue;
    
    try {
      console.log(`Executing: ${statement.substring(0, 80)}...`);
      
      const { error } = await supabase.rpc('exec_sql', { sql: statement });
      
      if (error) {
        console.error(`Error executing: ${statement.substring(0, 100)}...`);
        console.error(error);
      } else {
        console.log('  OK');
      }
    } catch (err) {
      console.error(`Exception: ${err.message}`);
    }
  }
  
  console.log('Migration application complete.');
}

applyMigration().catch(console.error);