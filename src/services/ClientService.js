import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";

const ClientService = {};

const URL_BASE = env.API_ENDPOINT_URL;

ClientService.getAllClients =  () => {
  return fetch({
    url: `${URL_BASE}/client/list`,
    method: "get",
    headers: authHeader(),
  });
};

ClientService.getClient = (id) => {
  return fetch({
    url: `${URL_BASE}/client/get/${id}`,
    method: "get",
    headers: authHeader(),
  });
};

ClientService.insertClient = (data) => {
  return fetch({
    url: `${URL_BASE}/client/insert`,
    method: "post",
    headers: authHeader(),
    data: data,
  });
};

ClientService.updateClient = (data, id) => {
  return fetch({
    url: `${URL_BASE}/client/update/${id}`,
    method: "put",
    headers: authHeader(),
    data: data,
  });
}

export default ClientService;
