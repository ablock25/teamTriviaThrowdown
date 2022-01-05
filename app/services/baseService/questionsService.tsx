import { baseService } from './baseService';

export const getQuestions = (limit: number, category?: string) => {
  if (category) {
    return baseService
      .get(`/questions?categories=${category}&limit=${limit}`)
      .then((r) => {
        return r.data;
      })
      .catch((error) => {
        console.log('Error fetching questions: ', error.message);
      });
  } else {
    return baseService
      .get(`/questions?limit=${limit}`)
      .then((r) => {
        return r.data;
      })
      .catch((error) => {
        console.log('Error fetching questions: ', error.message);
      });
  }
};
