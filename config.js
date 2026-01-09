// Supabase Configuration
// Note: Anon key is public and safe to commit (designed for client-side use)
// Security is handled via RLS policies and signup restrictions in Supabase

const SUPABASE_URL = 'https://ejntlcnxlfsuxlioetnp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eNCtSNIBBx3a7tqOOFxrFQ_ghcGMqF1';

// Initialize Supabase client - wait for CDN to load
// This ensures supabase is available before creating the client
(function initSupabase() {
    if (typeof supabase !== 'undefined') {
        // Supabase CDN is loaded, create client
        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabase = supabaseClient;
    } else {
        // CDN not ready yet, retry after short delay
        setTimeout(initSupabase, 10);
    }
})();

