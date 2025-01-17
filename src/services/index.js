/**
 * @version 0.0.1
 * Updated On : August 29, 2024
 * Import and export apis from ./apis
 * Import it in component as API.Login()
 */

import { AuthApi } from './apis/auth';
import { QuizApi } from './apis/quiz';

export const API = {
  ...AuthApi,
  ...QuizApi
};
