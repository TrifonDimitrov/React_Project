import * as request from "./requester";

const BASE_URL = "http://localhost:3000/api/climates";

export const getAll = async () => {
  const result = await request.get(BASE_URL);

  const products = Object.values(result);

  return products;
};

export const getOne = (modelId) => request.get(`${BASE_URL}/${modelId}`);

// export const createProduct = (productData, token) => request.post(`${BASE_URL}/create`, productData, token);

export const createProduct = async (productData, token) => {
  const response = await fetch('http://localhost:3000/api/climates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Изпращане на токена в заглавието
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error: ${error.message}`);
  }

  return await response.json();
};

