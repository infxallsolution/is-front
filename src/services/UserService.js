import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";
import { GetUserFromStorage } from "./UserFromStorage";
const URL_BASE = env.API_ENDPOINT_URL;
const user = GetUserFromStorage()
export const UserService = {
  getUsers: async (withstatic) => {
    const response = await fetch(`${URL_BASE}/user/get-users?clientId=${user.clientId}`, {
      headers: authHeader(),
    });
    const data = await response.json();
    return data;
  },
   createUser: async (data) => {
     const response = await fetch(`${URL_BASE}/user/create-users?clientId=${user.clientId}`, {
       method: "POST",
       headers: authHeader(),
       body: JSON.stringify(data),
     });
     const responseData = await response.json();
     return responseData;
   },
   updateUser: async ( userId,data) => {
    const response = await fetch(`${URL_BASE}/user/update-users?clientId=${user.clientId}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  },
  deleteUser: async (userdelete) => {
    const response = await fetch(`${URL_BASE}/user/delete-users?clientId=${user.clientId}`, {
      method: "DELETE",
      headers: authHeader(),
      body: JSON.stringify(userdelete),
    });
    const responseData = await response.json();
    return responseData;
  },
}