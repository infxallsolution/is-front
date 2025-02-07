import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";
import { GetUserFromStorage } from "./UserFromStorage";

const URL_BASE = env.API_ENDPOINT_URL;
const user = GetUserFromStorage()
export const RolesService = {
  get: async (withstatic) => {
    const response = await fetch(`${URL_BASE}/roles?withstatic=${user.static}`, {
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  }
}