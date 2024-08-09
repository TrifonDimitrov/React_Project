import * as productApi from "../api/products-api";

// export const useCreateProduct = () => {
//   return async (productData) => {
//     const token = localStorage.getItem("token");
    
//     if (!token) {
//       throw new Error("No token found, please login first.");
//     }

//     return await productApi.createProduct(productData, token);
//   };
// };


export const useCreateProduct = () => {
  return async (productData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please login first.");
    }

    return await productApi.createProduct(productData, token);
  };
};
