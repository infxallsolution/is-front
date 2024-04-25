import { AUTH_TOKEN } from "constants/AuthConstant";

const authHeader = () => {
  const jwtToken = localStorage.getItem(AUTH_TOKEN);

  if (jwtToken) {
    return {
      Authorization: `Bearer ${jwtToken}`,
      "Content-type": "application/json",
    };
  } else {
    return {};
  }
};


export { authHeader };