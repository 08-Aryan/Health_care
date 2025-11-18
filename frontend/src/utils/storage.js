const TOKEN_KEY = "auth_token";

/**
 * Save JWT token to localStorage
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Retrieve JWT token from localStorage
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove JWT token from localStorage (logout)
 */
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
