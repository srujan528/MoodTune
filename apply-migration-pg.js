const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials in environment');
  process.exit(1);
}

// Extract connection details from Supabase URL
const url = new URL(supabaseUrl);
const host = url.hostname;
const port = 5432;
const database = 'postgres';
const user = 'postgres';
const password = process.env.SUPABASE_SERVICE_ROLE_KEY;

const pool = new Pool({
  host,
  port,
  database,
  user,
  password,
  ssl: { rejectUnauthorized: false }
});

async function applyMigration() {
  const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20240809000000_create_tables.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log('Applying migration...');
  
  const client = await pool.connect();
  
  try {
    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (!statement.trim()) continue;
      
      try {
        console.log(`Executing: ${statement.substring(0, 80)}...`);
        await client.query(statement);
        console.log('  OK');
      } catch (err) {
        console.error(`Error executing: ${statement.substring(0, 100)}...`);
        console.error(err.message);
      }
    }
    
    console.log('Migration application complete.');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

applyMigration().catch(console.error);