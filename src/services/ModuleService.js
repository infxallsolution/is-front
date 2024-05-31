import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";
const ULR_BASE = env.API_ENDPOINT_URL;

const ModuleService = {
  getAllModules: async () => {
    const response = await fetch(`${ULR_BASE}/module/list`, {
      headers: authHeader(),
    });
    const data = await  response.json();
    return data;
  },
  getModule: async (id) => {
    const response = await fetch(`${ULR_BASE}/module/get/${id}`, {
      method: "get",
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  },
  getModuleByClient: async (id) => {
    const response = await fetch(
      `${ULR_BASE}/moduleclient/listbyclient?id=${id ? id : " "}`,
      {
        method: "get",
        headers: authHeader(),
      }
    );
    const data = await response.json()
    return data;
  },
  insertModuleClient: async (data) => {
    const response = await fetch(`${ULR_BASE}/moduleclient/insert`, {
      method: "post",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    return response;
  },
  deleteModuleClient: async (data) => {
    const response = await fetch(`${ULR_BASE}/moduleclient/delete`, {
      method: "delete",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    return response;
  }
};

export default ModuleService;
