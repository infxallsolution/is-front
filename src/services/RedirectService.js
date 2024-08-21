import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";
import fetch from "auth/FetchInterceptor";
import { useSelector } from "react-redux";

const URL_BASE = env.API_ENDPOINT_URL;

const RedirectService = {


  redirectModule: (module) => {    
    let company = localStorage.getItem("company")
    console.log("ANALIZA LA COMPAÑIA:"+company)
    const response = fetch(
      `${URL_BASE}/redirection/redirecttomodule/${module}?company=${company}`,
      {
        headers: authHeader(),
      }
    );
    const data = response;
    return data;
  },
};

export default RedirectService;
