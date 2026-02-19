// Common utility functions

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay) {
    let debounceTimeout;
    return function (...args) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Get URL parameter value
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value or null
 */
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Build URL with parameters
 * @param {string} base - Base URL
 * @param {Object} params - Parameters object
 * @returns {string} - Complete URL
 */
function buildUrl(base, params) {
    const url = new URL(base, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            url.searchParams.append(key, value);
        }
    });
    return url.toString();
}

// Export utilities
window.Utils = {
    debounce,
    getUrlParam,
    buildUrl
};
