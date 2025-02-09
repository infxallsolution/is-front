import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";
import { GetUserFromStorage, BodyWithClient } from "./UserFromStorage";
const URL_BASE = env.API_ENDPOINT_URL;
const user = GetUserFromStorage()
export const UserService = {
  get: async (page, pageSize, filters) => {
    try {
       const queryParams = new URLSearchParams({
                  page: page.toString(),
                  pageSize: pageSize.toString(),
                  // ...filters, // Agregar filtros dinámicos,<
                  client_system_id:user.client_system_id.toString()
                }).toString();

      const response = await fetch(`${URL_BASE}/user?${queryParams}`, {
        headers: authHeader(),
      });
      const data = await response.json();
      return data;
    } catch (ex) {
      throw ex
    }
  },
  create: async (data) => {
    try {
        const body = await BodyWithClient(data)
        const response = await fetch(`${URL_BASE}/user`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      if(!response.ok)
      {
        throw new Error(`Error ${response.status}: ${responseData.message}`);
      }
    
      return responseData;
    } catch (ex) {
      throw ex
    }
  },
  update: async (userId, data) => {
    try {
      const body = await BodyWithClient(data)
      const response = await fetch(`${URL_BASE}/user/${userId}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      return responseData;
    } catch (ex) {
      throw ex
    }
  },
  delete: async (userId) => {
    try {
      const response = await fetch(`${URL_BASE}/user/${userId}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      const responseData = await response.json();
      return responseData;
    } catch (ex) {
      throw ex
    }
  },
}

