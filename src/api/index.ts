// @todo: get value from env
const BASE_URL = "https://jsonplaceholder.typicode.com";

// use fetch api to get data
export const get = async <T>(url: string) => {
  const response = await fetch(`${BASE_URL}${url}`);
  const data = await response.json();

  return data as T;
};

export const post = async <T>(url: string, body: any) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return data as T;
};

export const put = async <T>(url: string, body: any) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return data as T;
};

export const del = async <T>(url: string) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return data as T;
};
