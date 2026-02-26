import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDb() {
    console.log('Checking connection to Supabase...');

    // Try to query the table
    const { data, error } = await supabase
        .from('rfqs')
        .select('*')
        .limit(5);

    if (error) {
        console.error('\n❌ Error querying table:', error.message);
        if (error.code === '42P01') {
            console.log('   The table "rfqs" DOES NOT EXIST yet.');
        } else {
            console.log('   Details:', error);
        }
    } else {
        console.log('\n✅ Table "rfqs" EXISTS!');
        console.log(`   Found ${data.length} entries in this query.`);
        if (data.length > 0) {
            console.log('\nSample data:', JSON.stringify(data[0], null, 2));
        } else {
            console.log('   The table is currently EMPTY.');
        }
    }
}

checkDb();
