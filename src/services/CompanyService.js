import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";
import fetch from "auth/FetchInterceptor";

const URL_BASE = env.API_ENDPOINT_URL;

const CompanyService = {
  getCompanies: (clientId) => {
    const response = fetch(
      `${URL_BASE}/company/listbyclient/${clientId}`,
      {
        headers: authHeader(),
      }
    );
    const data = response;
    return data;
  },
};

export default CompanyService;
