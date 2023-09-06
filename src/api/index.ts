// @todo: get value from env
const BASE_URL = "https://jsonplaceholder.typicode.com";

// use fetch api to get data
export const get = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);
  const data = await response.json();

  return data;
};
