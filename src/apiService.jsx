import axios from 'axios';

const API_BASE_URL = 'https://msu-backend-old.vercel.app';
// Local Host URL
// const API_BASE_URL = 'http://127.0.0.1:8000';


const sendJsonData = (inputData) => {
    return axios.post(`${API_BASE_URL}/api/json/`, { input: inputData });
};

export default sendJsonData;
