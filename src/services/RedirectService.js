import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";
import fetch from "auth/FetchInterceptor";

const URL_BASE = env.API_ENDPOINT_URL;

const RedirectService = {
  redirectModule: (module) => {
    const response = fetch(
      `${URL_BASE}/redirection/redirecttomodule/${module}`,
      {
        headers: authHeader(),
      }
    );
    const data = response;
    return data;
  },
};

export default RedirectService;
