// Authentication Utility Functions for Supabase

/**
 * Check if user is currently authenticated
 * @returns {Promise<boolean>} True if authenticated, false otherwise
 */
async function checkAuth() {
    try {
        const { data: { session } } = await window.supabase.auth.getSession();
        return session !== null;
    } catch (error) {
        console.error('Error checking auth:', error);
        return false;
    }
}

/**
 * Get current user session
 * @returns {Promise<Object|null>} Current session or null
 */
async function getSession() {
    try {
        const { data: { session } } = await window.supabase.auth.getSession();
        return session;
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
}

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, error: string|null}>} Sign in result
 */
async function signIn(email, password) {
    try {
        const { data, error } = await window.supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, error: null, data: data };
    } catch (error) {
        return { success: false, error: error.message || 'An unexpected error occurred' };
    }
}

/**
 * Sign out current user
 * @returns {Promise<{success: boolean, error: string|null}>} Sign out result
 */
async function signOut() {
    try {
        const { error } = await window.supabase.auth.signOut();
        
        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: error.message || 'An unexpected error occurred' };
    }
}

/**
 * Require authentication - redirect to login if not authenticated
 * @param {string} redirectPath - Path to redirect to if not authenticated (default: '/')
 * @returns {Promise<boolean>} True if authenticated, false if redirected
 */
async function requireAuth(redirectPath = '/') {
    const isAuthenticated = await checkAuth();
    
    if (!isAuthenticated) {
        window.location.href = redirectPath;
        return false;
    }
    
    return true;
}

/**
 * Handle auth state changes
 * @param {Function} callback - Callback function called when auth state changes
 * @returns {Function} Unsubscribe function
 */
function handleAuthState(callback) {
    const { data: { subscription } } = window.supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });

    return () => {
        subscription.unsubscribe();
    };
}

/**
 * Get current user
 * @returns {Promise<Object|null>} Current user or null
 */
async function getCurrentUser() {
    try {
        const { data: { user } } = await window.supabase.auth.getUser();
        return user;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

