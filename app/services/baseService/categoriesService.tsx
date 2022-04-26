import { baseService } from './baseService';

export const getCategories = () => {
  return baseService.get('/categories').then((r) => {
    // const result = Object.entries<string[]>(r.data);
    const result = Object.keys(r.data).map((key) => {
      return { label: key, slugs: r.data[key] };
    });
    return result;
  });
};
