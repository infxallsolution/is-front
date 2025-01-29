import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./../AuthHeader";
import { GetUserFromStorage } from "./../UserFromStorage";
const URL_BASE = env.API_ENDPOINT_URL;
const user = GetUserFromStorage()

export const WarehouseService = {
  get: async () => {
    const response = await fetch(`${URL_BASE}/warehouse?client_system_id=${user.client_system_id}`, {
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  },
  createWarehouse: async (data) => {
    const response = await fetch(`${URL_BASE}/warehouse?client_system_id=${user.client_system_id}`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  },
  // updateProduct: async (productId, data) => {
  //   const response = await fetch(`${URL_BASE}/product/update-products?client_system_id=${user.client_system_id}`, {
  //     method: "PUT",
  //     headers: authHeader(),
  //     body: JSON.stringify(data),
  //   });
  //   const responseData = await response.json();
  //   return responseData;
  // },
  // deleteProduct: async (productdelete) => {
  //   const response = await fetch(`${URL_BASE}/product/delete-products?client_system_id=${user.client_system_id}`, {
  //     method: "DELETE",
  //     headers: authHeader(),
  //     body: JSON.stringify(productdelete),
  //   });
  //   const responseData = await response.json();
  //   return responseData;
  // },
}
