/**
 * @version 0.0.1
 * Updated On : December 29, 2024
 * APIs related to Authentication
 */
import { axiosApi, responseHandler } from 'src/services/core';

export const AuthApi = {
  /**
   * Login API
   * @param {object} data object data.
   * @param {string|boolean} toast_success success message if provided. Default value false.
   * @param {string|boolean} toast_loading loading message if provided. Default value false.
   * @returns {json|null} json response or null.
   */
  Login: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post('/auth/login', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },
  /**
   * SignUp API
   * @param {object} data object data.
   * @param {string|boolean} toast_success success message if provided. Default value false.
   * @param {string|boolean} toast_loading loading message if provided. Default value false.
   * @returns {json|null} json response or null.
   */
  SignUp: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post('/auth/store-signup', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },
  /**
   * Get OTP API
   * @param {object} data object data.
   * @param {string|boolean} toast_success success message if provided. Default value false.
   * @param {string|boolean} toast_loading loading message if provided. Default value false.
   * @returns {json|null} json response or null.
   */
  GetOtp: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post('/auth/send-verification-code', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },
  /**
   * Verify OTP API
   * @param {object} data object data.
   * @param {string|boolean} toast_success success message if provided. Default value false.
   * @param {string|boolean} toast_loading loading message if provided. Default value false.
   * @returns {json|null} json response or null.
   */
  VerifyOtp: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post('/auth/verify-code', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },

  // Forget Password Reset APIs
  /**
   * Verify your email to change password
   * @param {object} data object data.
   * @param {string|boolean} toast_success success message if provided. Default value false.
   * @param {string|boolean} toast_loading loading message if provided. Default value false.
   * @returns {json|null} json response or null.
   */
  verifyEmail: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post('/auth/reset-password', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },

  /**
   * Change your password with a new one
   * @param {object} data object data.
   * @param {string|boolean} toast_success success message if provided. Default value false.
   * @param {string|boolean} toast_loading loading message if provided. Default value false.
   * @returns {json|null} json response or null.
   */
  changePassword: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post('/auth/change-password', data);
    return responseHandler(api_call, toast_success, toast_loading);
  }
};
