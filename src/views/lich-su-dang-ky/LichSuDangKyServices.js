import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/LichSuDangKy';

export const getAllLichSuDangKy = () => {
  return axios.get(apiUrl);
};

export const createLichSuDangKy = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateLichSuDangKy = (payload) => {
  return axios.put(apiUrl + '/' + payload?.idLichSuDangKy, payload);
};

export const deleteLichSuDangKy = (id) => {
  return axios.delete(apiUrl + '/' + id);
};
