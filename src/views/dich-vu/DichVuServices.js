import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/DichVuNguoiDung';

export const getAllDichVuNguoiDung = () => {
  return axios.get(apiUrl + '/getAllDichVuNguoiDung');
};

export const createDichVuNguoiDung = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateDichVuNguoiDung = (payload) => {
  return axios.put(apiUrl + '/' + payload?.maDichVu, payload);
};

export const deleteDichVuNguoiDung = (id) => {
  return axios.delete(apiUrl + '/' + id);
};

export const getDichVuNguoiDungByMaNguoiDung = (id) => {
  return axios.get(apiUrl + '/ByMaNguoiDung/' + id);
};
