export const getToken = () => {
  return localStorage.getItem('token');
};

export const clearToken = () => {
  localStorage.removeItem('token');
  console.log("work done")
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};
