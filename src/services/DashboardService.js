import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";

const URL_BASE = env.API_ENDPOINT_URL;

export const DashboardService = {
    listDataByClient: async (id, option,company) => {
        const url = `${URL_BASE}/dashboard/listbyclient/${id}?option=${option}&company=${company}`;
        const response = await fetch(url, {
            headers: authHeader(),
        });
        const data = await response.json();
        return data;
    },
};