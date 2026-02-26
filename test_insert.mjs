import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
    console.log('Attempting to insert a mock RFQ...');

    const mockData = {
        name: "Test User",
        email: "test@example.com",
        phone: "+91 9876543210",
        company: "Acme Corp",
        productName: "High-Grade Bolts",
        quantity: "500 pcs",
        message: "This is an automated test from the NextJS environment."
    };

    const { data, error } = await supabase
        .from('rfqs')
        .insert([mockData])
        .select(); // Ask Supabase to return the row we just inserted

    if (error) {
        console.error('\n❌ Error inserting into table:', error.message);
        console.error('   Details:', error);
    } else {
        console.log('\n✅ Successfully inserted data!');
        console.log('   Returned row:', JSON.stringify(data, null, 2));
    }
}

testInsert();
