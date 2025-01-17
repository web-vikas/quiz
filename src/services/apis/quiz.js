import { axiosApi, getToken, responseHandler } from "../core";

export const QuizApi = {
    CreateNewQuiz: async (data, toast_success = false, toast_loading = false) => {
        const token = await getToken()
        const api_call = axiosApi.post('/quiz/', data, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
    GetAllQuizzes: async (toast_success = false, toast_loading = false) => {
        const token = await getToken()
        const api_call = axiosApi.get('/quiz/', {
            headers: { Authorization: 'Bearer ' + token }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
}