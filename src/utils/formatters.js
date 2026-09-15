// Utility helper functions for CHRONOS 3D

/**
 * Format raw price number to USD currency string
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format product rating to 1 decimal point
 * @param {number} rating 
 * @returns {string}
 */
export const formatRating = (rating) => {
  if (typeof rating !== 'number') return '5.0';
  return rating.toFixed(1);
};

/**
 * Truncate long descriptions
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};
