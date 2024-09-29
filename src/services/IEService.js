import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const CLIENT_ID = process.env.REACT_APP_TEST_CLIENT_ID;

const IEService = {}


 IEService.GetIEFormats = async (page=1, limit=1000) => {
    const response = await axios.get(`${API_URL}/api/ieformat/v1/get?page=${page}&pageSize=${limit}`);
    return response;
  }


  IEService.GetDetailIEFormat = async (id) => {
    const response = await axios.get(`${API_URL}/api/ieformat/v1/get-detail-format/${id}?clientId=${CLIENT_ID}`);
    return response;
  }
  

  IEService.CreateIEConfiguration = async (data) => {
    const body = {
      ieformatId : data.ieformat,
      ieformatDetailId : data.ieformatdetailid,
      clientId : CLIENT_ID,
      concepts: data.concepts
    }
    const response = await axios.post(`${API_URL}/api/ieconfiguration/v1`,
      body
    );
    return response;
  }
  

  IEService.GetConceptsByFormatDetailIdAndClientId = async (data) => {
    const body = {
      ieformatId : data.ieformat,
      ieformatDetailId : data.ieformatdetailid,
      clientId : CLIENT_ID,
      concepts: data.concepts
    }
    const response = await axios.post(`${API_URL}/api/ieconfiguration/v1`,
      body
    );
    return response;
  }

  IEService.GetConfigurationByFormatId = async (ieformatid) => {
    const response = await axios.get(`${API_URL}/api/ieconfiguration/v1/get-configurations-by-formatid/${ieformatid}?clientId=${CLIENT_ID}`);
    return response.data;
  }



export default IEService