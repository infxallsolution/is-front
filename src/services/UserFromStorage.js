
const GetUserFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return user;
  } else {
    return {};
  }
};

const   BodyWithClient = async(data) =>{
  var body = data;
  const user = JSON.parse(localStorage.getItem("user"));
  body.client_system_id = user.client_system_id;
  return body
}



export { GetUserFromStorage, BodyWithClient };