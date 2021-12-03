import { baseService } from './baseService';

export const getCategories = () => {
  console.log({ baseService });
  return baseService
    .get('/categories')
    .then((r) => {
      return r.data;
    })
    .catch((error) => {
      console.log('Error fetching categories: ', error.message);
    });
};
