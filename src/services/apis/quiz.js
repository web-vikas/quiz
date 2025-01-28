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
    getQuizById: async (id, toast_success = false, toast_loading = false) => {
        const token = await getToken()
        const api_call = axiosApi.get(`/quiz/${id}`, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
    CreateNewQuestion: async (data, toast_success = false, toast_loading = false) => {
        const token = await getToken()
        const api_call = axiosApi.post('/quiz/question/', data, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
    getQuestionsByQuizId: async (id, toast_success = false, toast_loading = false) => {
        const token = await getToken()
        const api_call = axiosApi.get(`/quiz/questions/${id}`, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
    getQuestionsAndQuizInfoByQuizId: async (id, toast_success = false, toast_loading = false) => {
        const api_call = axiosApi.get(`/take-quiz/${id}`);
        return responseHandler(api_call, toast_success, toast_loading);
    },
    SubmitQuizAndGetScore: async (data, toast_success = false, toast_loading = false) => {
        const api_call = axiosApi.post(`/quizzes/${data?.quizId}/submit`, data);
        return responseHandler(api_call, toast_success, toast_loading);
    },
    deleteQuizById: async (id, toast_success = false, toast_loading = false) => {
        const token = await getToken()
        const api_call = axiosApi.delete(`/quiz/${id}`, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
    deleteQuestionByQuestionId: async (id, toast_success = false, toast_loading = false) => {
        const token = await getToken()
        const api_call = axiosApi.delete(`/quiz/question/${id}`, {
            headers: { Authorization: 'Bearer ' + token }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
    GenerateQuestions: async (data, toast_success = false, toast_loading = false) => {
        const token = await getToken()
        const api_call = axiosApi.post(`/quiz/generate`, data,{
            headers: { Authorization: 'Bearer ' + token }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
    InsertQuestions: async (data, toast_success = false, toast_loading = false) => {
        const token = await getToken()
        const api_call = axiosApi.post(`/quiz/insert-multiple`, data,{
            headers: { Authorization: 'Bearer ' + token }
        });
        return responseHandler(api_call, toast_success, toast_loading);
    },
}