
import axios from "axios";
import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";

const URL_BASE = env.API_ENDPOINT_URL;



const update = async (data) => {
  console.log(data)
  try {
    const config = authHeader()
    const response = await axios.post(URL_BASE+"/lot/update", data, config)
    const success = response.data?.success || null;
    return success;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};




const insert = async (data) => {
  console.log(data)
  try {
    const config = authHeader()
    const response = await axios.post(URL_BASE+"/lot/insert", data, config)
    const success = response.data?.success || null;
    return success;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};


const list = async (page,limit) => {  
  try {
    const config = authHeader()
    const url = `${URL_BASE}/lot/list?page=${page}&limit=${limit}`
    const response = await axios.get(url,config)
    const listado = response.data|| null;
    return listado;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


const get = async (id) => {  
  try {
    const config = authHeader()
    const url = `${URL_BASE}/lot/get?id=${id}`
    const response = await axios.get(url,config)
    const data = response.data|| null;
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};



const getActiveList = async () => {  
  try {
    const config = authHeader()
    const url = `${URL_BASE}/lot/active-list`
    const response = await axios.get(url,config)
    const listado = response.data|| null;
    return listado;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};



const getMaxConsecutive = async (storeId) => {  
  try {
    const config = authHeader()
    const url = `${URL_BASE}/lot/max-consecutive?storeId=${storeId}`
    const response = await axios.get(url,config)
    const data = response.data.max|| 0;
    return data;
  } catch (error) {
    console.error("Error:", error);
    return error.response;
  }
};




  export default{
    getMaxConsecutive,
    insert,
    list,
    get,
    update,
    getActiveList
  }

