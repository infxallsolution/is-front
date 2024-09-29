import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const CLIENT_ID = process.env.REACT_APP_TEST_CLIENT_ID

const ConceptService = {}


ConceptService.get = async () => {
    const response = await axios.get(`${API_URL}/api/concept/v1?clientId=${CLIENT_ID}`);
    return response;
  }


export default ConceptService