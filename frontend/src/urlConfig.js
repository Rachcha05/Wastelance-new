export const api= 'http://localhost:2000/api';
export const baseUrl= 'http://localhost:2000/api';

export const generatePublicUrl = (fileName) => {
    return `${baseUrl}/public/${fileName}`;
  };