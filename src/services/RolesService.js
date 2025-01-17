import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";

const URL_BASE = env.API_ENDPOINT_URL;

export const RolesService = {
  getRoles: async (withstatic) => {
    const response = await fetch(`${URL_BASE}/roles/get-roles?withstatic=${withstatic}`, {
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  }
}