
const GetUserFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return user;
  } else {
    return {};
  }
};


export { GetUserFromStorage };