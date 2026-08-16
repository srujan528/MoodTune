import { createClient } from '@supabase/supabase-js';
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

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

async function applyMigration() {
  const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20240809000000_create_tables.sql');
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
      
      // Use the Supabase REST API to execute raw SQL via rpc
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