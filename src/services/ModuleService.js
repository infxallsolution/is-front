import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";
import fetch from "auth/FetchInterceptor";

const ModuleService = {};

const ULR_BASE = env.API_ENDPOINT_URL;

ModuleService.getAllModules = (data) => {
  return fetch({
    url: `${ULR_BASE}/module/list`,
    method: "get",
    headers: authHeader(),
    data: data,
  });
};

ModuleService.getModule = (id) => {
  return fetch({
    url: `${ULR_BASE}/module/get/${id}`,
    method: "get",
    headers: authHeader(),
  });
};

ModuleService.insertClientAndModule = (data) => {};

export default ModuleService;
