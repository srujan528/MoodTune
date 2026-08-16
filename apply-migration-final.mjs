import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env.local') });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials in environment');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function applyMigration() {
  const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20240809000000_create_tables.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

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
      
      // Use the Supabase REST API to execute raw SQL via the SQL editor API
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ sql: statement })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error executing: ${statement.substring(0, 100)}...`);
        console.error(errorText);
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