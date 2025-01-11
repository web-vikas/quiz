/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create all common method and functions
 */
import toast from 'react-hot-toast';
/**
 * Handles the API response
 * @param {json} response
 * @returns response data or null and show error alerts.
 */
export const handleApiResponse = (response) => {
  if (response?.status == 200) return response.data;
  else if (response?.status == 400) toast.error('Error 400 : ' + response?.message);
  else if (response?.status == 401)
    toast.error(
      `Unauthorized 401: ${response?.message ? response?.message : 'Action is not permitted.'}`
    );
  else if (response?.status == 403) toast.error('Unauthorized 403 : Action forbidden.');
  else if (response?.status === 500) toast.error('Error 500 : ' + response?.message);
  else toast.error('Error : Something went wrong. Please contact admin.');
  return null;
};


/**
 * Generates a strong password of a given length.
 *
 * @param {number} length - The desired length of the password.
 * @returns {string} - A strong password consisting of random letters, numbers, and special characters.
 */
export const generateStrongPassword = (length = 8) => {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  const allChars = upperCase + lowerCase + numbers;

  let password = '';

  // Ensure the password contains at least one character from each category
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  // Generate the remaining characters randomly
  for (let i = 4; i <= length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to avoid predictable patterns
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}
