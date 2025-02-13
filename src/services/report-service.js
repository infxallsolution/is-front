
import axios from "axios";
import { env } from "configs/EnvironmentConfig";
import { authHeader } from "./AuthHeader";

const URL_BASE = env.API_ENDPOINT_URL;


export const generateExcelMovements = async (startDate, endDate) => {
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  const accessToken = ""
  const params = {startDate:start,endDate:end };
  const config = { headers: {Authorization: `Bearer ${accessToken}`}, params , responseType: 'blob' };
  try {
    const response = await axios.get(
      URL_BASE + "/report/excel-movements",
      config
    );

    console.log(response)
    const data = response.data || null;
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};



export const generateExcelMovementDetails = async (startDate, endDate) => {  
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  const accessToken = ""
  const params = {startDate:start,endDate:end };
  const config = { headers: {Authorization: `Bearer ${accessToken}`}, params , responseType: 'blob' };
  try {
    const response = await axios.get(
      URL_BASE + "/report/excel-movement-details",
      config
    );

    console.log(response)
    const data = response.data || null;
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};




const getReportMovements = async (page, limit, startDate, endDate) => {  
  const accessToken = ""
  const params = {page, limit, startDate, endDate};
  const config = { headers: {Authorization: `Bearer ${accessToken}`}, params };
  try {
   // let config = authHeader()
    const url = `${URL_BASE}/report/report-movements`
    const response = await axios.get(url,config,params)
    const listado = response.data|| null;
    return listado;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


const getReportMovementDetails = async (page, limit, startDate, endDate) => {  
  const accessToken = ""
  const params = {page, limit, startDate, endDate};
  const config = { headers: {Authorization: `Bearer ${accessToken}`}, params };
  try {
   // let config = authHeader()
    const url = `${URL_BASE}/report/report-movement-details`
    const response = await axios.get(url,config,params)
    const listado = response.data|| null;
    return listado;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


  export default{
    getReportMovements,
    getReportMovementDetails,
    generateExcelMovementDetails,
    generateExcelMovements
  }

