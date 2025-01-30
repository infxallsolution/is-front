import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./../AuthHeader";
import { GetUserFromStorage } from "./../UserFromStorage";

const URL_BASE = env.API_ENDPOINT_URL;
const user = GetUserFromStorage();

export const SupplierService = {
  get: async () => {
    const response = await fetch(`${URL_BASE}/supplier?client_system_id=${user.client_system_id}`, {
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  },
  create: async (data) => {
    const response = await fetch(`${URL_BASE}/supplier?client_system_id=${user.client_system_id}`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  },
  update: async (supplierId, data) => {
    const response = await fetch(`${URL_BASE}/supplier/${supplierId}?client_system_id=${user.client_system_id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  },
  delete: async (supplierId) => {
    const response = await fetch(`${URL_BASE}/supplier/${supplierId}?client_system_id=${user.client_system_id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
    const responseData = await response.json();
    return responseData;
  },
};
