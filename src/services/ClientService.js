import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";

const URL_BASE = env.API_ENDPOINT_URL;

export const ClientService = {
  getAllClients: async () => {
    const response = await fetch(`${URL_BASE}/client/list`, {
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  },
  getClient: async (id) => {
    const response = await fetch(`${URL_BASE}/client/get/${id}`, {
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  },
  insertClient: async (data) => {
    const response = await fetch(`${URL_BASE}/client/insert`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  },
  updateClient: async (data, id) => {
    const response = await fetch(`${URL_BASE}/client/update/${id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  },
  enableClient: async (id) => {
    const response = await fetch(`${URL_BASE}/client/enableClient/${id}`, {
      method: "PUT",
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  },
  disableClient: async (id) => {
    const response = await fetch(`${URL_BASE}/client/disableclient/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  },
};

export default ClientService;
