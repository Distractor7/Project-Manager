//Axios is imported.
import axios from "axios";

//Created an axios instance below and defined the base URL for all api requests on local host 8080.
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export default apiClient;
