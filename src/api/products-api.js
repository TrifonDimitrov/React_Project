import * as request from "./requester";

const BASE_URL = "http://localhost:3000/api/climates";

export const getAll = async () => {
  const result = await request.get(BASE_URL);

  const products = Object.values(result);

  return products;
};

export const getOne = (modelId) => request.get(`${BASE_URL}/${modelId}`)
