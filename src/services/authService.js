/**
 * CHRONOS Authentication Service Abstraction
 * 
 * Provides a clean interface for Login, Registration, Password Reset, and Session retrieval.
 * Designed so a real backend (REST, GraphQL, Supabase, Firebase) can be integrated seamlessly.
 * 
 * SECURITY NOTE:
 * Plaintext passwords, secrets, and private API keys are NEVER stored in localStorage.
 */

const AUTH_USER_KEY = 'chronos_auth_user_v1';

// Safe email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim());
};

/**
 * Authenticate user with email and password
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} Authenticated user profile
 */
export const loginUser = async ({ email, password }) => {
  // Simulate network latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 400));

  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = password || '';

  if (!cleanEmail) {
    throw new Error('Please enter your email address.');
  }

  if (!isValidEmail(cleanEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!cleanPassword) {
    throw new Error('Please enter your password.');
  }

  if (cleanPassword.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  // Derive display name from email if not preset
  const localPart = cleanEmail.split('@')[0];
  const formattedName = localPart
    .split(/[._-]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  const userProfile = {
    id: `usr_${Date.now().toString(36)}`,
    name: formattedName || 'Chronos Collector',
    email: cleanEmail,
    tier: 'Platinum Founding Member',
    memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  };

  return userProfile;
};

/**
 * Register a new user account
 * @param {object} payload - { name, email, password }
 * @returns {Promise<object>} Created user profile
 */
export const registerUser = async ({ name, email, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 450));

  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = password || '';

  if (!cleanName || cleanName.length < 2) {
    throw new Error('Please enter your full name (minimum 2 characters).');
  }

  if (!cleanEmail || !isValidEmail(cleanEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!cleanPassword || cleanPassword.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  }

  const userProfile = {
    id: `usr_${Date.now().toString(36)}`,
    name: cleanName,
    email: cleanEmail,
    tier: 'Titanium Founding Member',
    memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  };

  return userProfile;
};

/**
 * Request password recovery instructions
 * @param {string} email 
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const requestPasswordReset = async (email) => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const cleanEmail = (email || '').trim().toLowerCase();

  if (!cleanEmail || !isValidEmail(cleanEmail)) {
    throw new Error('Please provide a valid registered email address.');
  }

  return {
    success: true,
    message: `Password reset instructions have been dispatched to ${cleanEmail}.`,
  };
};

/**
 * Get cached session user profile from localStorage
 * @returns {object|null}
 */
export const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id && parsed.email) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read CHRONOS session from localStorage:', e);
  }
  return null;
};

/**
 * Save non-sensitive user profile to localStorage
 * @param {object|null} user 
 */
export const setStoredUser = (user) => {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch (e) {
    console.warn('Could not persist CHRONOS session to localStorage:', e);
  }
};
