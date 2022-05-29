import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.baseURL = BASE_URL;

export async function requestGet<T>(
  url: string,
  urlParameters?: object
): Promise<T> {
  const result = await axios.get(url, {
    params: urlParameters,
    headers: { Authorization: `Bearer localStorage.getItem("token")` || "" },
  });

  return result.data as T;
}

export async function requestPost<T>(
  url: string,
  urlParameters?: object,
  data?: object
): Promise<T> {
  const result = await axios.post(url, data, {
    params: urlParameters,
    headers: { Authorization: `Bearer localStorage.getItem("token")` || "" },
  });

  return result.data as T;
}
