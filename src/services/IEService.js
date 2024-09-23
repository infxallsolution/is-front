import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const IEService = {}


 IEService.GetIEFormats = async (page=1, limit=1000) => {
    const response = await axios.get(`${API_URL}/api/ieformat/v1/get?page=${page}&pageSize=${limit}`);
    return response;
  }


  IEService.GetDetailIEFormat = async (id) => {
    const response = await axios.get(`${API_URL}/api/ieformat/v1/get-detail-format/${id}`);
    return response;
  }
  


export default IEService