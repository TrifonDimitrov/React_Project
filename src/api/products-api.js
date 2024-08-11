import * as request from "./requester";

const BASE_URL = "http://localhost:3000/api/climates";

export const getAll = async () => {
  const result = await request.get(BASE_URL);

  const products = Object.values(result);

  return products;
};

export const getOne = (modelId) => request.get(`${BASE_URL}/${modelId}`);

export const deleteProduct = async (modelId) =>
  await request.del(`${BASE_URL}/${modelId}`);

export const createProduct = async (productData, token) => {
  const response = await fetch("http://localhost:3000/api/climates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Изпращане на токена
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error: ${error.message}`);
  }

  return await response.json();
};

export const editProduct = async (modelId, productData) => {
  const response = await fetch(`${BASE_URL}/${modelId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Filed to edit product!");
  }
  return response.json();
};
