import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";

const URL_BASE = env.API_ENDPOINT_URL;

export const UserService = {
  getUsers: async (withstatic) => {
    const response = await fetch(`${URL_BASE}/user/get-users?withstatic=${withstatic}`, {
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  }
}