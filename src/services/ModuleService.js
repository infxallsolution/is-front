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
};

export default ModuleService;
