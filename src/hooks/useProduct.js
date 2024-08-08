import * as productApi from "../api/products-api";

export function useCreateProduct() {
  const productCreateHandler = (productData) => productApi.createProduct(productData);

  return productCreateHandler;
}
