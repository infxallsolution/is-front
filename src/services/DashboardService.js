import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";

const URL_BASE = env.API_ENDPOINT_URL;

export const DashboardService = {
    getDashboardData: async (id) => {
        const response = await fetch(`${URL_BASE}/dashboard/list/${id}`, {
            headers: authHeader(),
        });
        const data = await response.json();
        return data;
    },
    listDataByClient: async (id, option) => {
        const response = await fetch(`${URL_BASE}/dashboard/listbyclient/${id}?option=${option}`, {
            headers: authHeader(),
        });
        const data = await response.json();
        return data;
    },
};