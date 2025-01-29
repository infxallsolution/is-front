import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./../AuthHeader";
import { GetUserFromStorage } from "./../UserFromStorage";

const URL_BASE = env.API_ENDPOINT_URL;
const user = GetUserFromStorage();

export const InventoryDocumentTypeService =  {
  get: async () => {
    const response = await fetch(`${URL_BASE}/inventory-document-type?client_system_id=${user.client_system_id}`, {
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  },

  create: async (data) => {
    const response = await fetch(`${URL_BASE}/inventory-document-type?client_system_id=${user.client_system_id}`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  },

  update: async (id, data) => {
    const response = await fetch(`${URL_BASE}/inventory-document-type/${id}?client_system_id=${user.client_system_id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  },

  delete: async (id) => {
    const response = await fetch(`${URL_BASE}/inventory-document-type/${id}?client_system_id=${user.client_system_id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
    const responseData = await response.json();
    return responseData;
  },
};
