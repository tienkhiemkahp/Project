import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/NguoiDung';

export const getAllNguoiDung = () => {
  return axios.get(apiUrl + '/getAllNguoiDung');
};

export const createNguoiDung = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateNguoiDung = (payload) => {
  return axios.put(apiUrl + '/' + payload?.maNguoiDung, payload);
};

export const deleteNguoiDung = (id) => {
  return axios.delete(apiUrl + '/' + id);
};

export const login = (payload) => {
  return axios.post(apiUrl + '/login', payload);
};

export const createDichVuNguoiDung = (payload) => {
  return axios.post(BASE_PART + '/api/DichVuNguoiDung', payload);
};
