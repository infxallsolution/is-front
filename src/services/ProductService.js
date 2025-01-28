import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";
import { GetUserFromStorage } from "./UserFromStorage";
const URL_BASE = env.API_ENDPOINT_URL;
const user = GetUserFromStorage()

export const ProductService = {
  getProducts: async (withstatic) => {
    const response = await fetch(`${URL_BASE}/product?clientId=${user.clientId}`, {
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  },
  createProduct: async (data) => {
    const response = await fetch(`${URL_BASE}/product?clientId=${user.clientId}`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  },
  updateProduct: async (productId, data) => {
    const response = await fetch(`${URL_BASE}/product?clientId=${user.clientId}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  },
  deleteProduct: async (productdelete) => {
    const response = await fetch(`${URL_BASE}/product?clientId=${user.clientId}`, {
      method: "DELETE",
      headers: authHeader(),
      body: JSON.stringify({id:productdelete}),
    });
    const responseData = await response.json();
    return responseData;
  },
}
