import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/GoiCuoc';

export const getAllGoiCuoc = () => {
  return axios.get(apiUrl + '/getAllGoiCuoc');
};

export const createGoiCuoc = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateGoiCuoc = (payload) => {
  return axios.put(apiUrl + '/' + payload?.maGoiCuoc, payload);
};

export const deleteGoiCuoc = (id) => {
  return axios.delete(apiUrl + '/' + id);
};

export const getDanhSachDK = (id, idHocKy) => {
  return axios.get(apiUrl + `/getDanhSachDK/${id}/${idHocKy}`);
};

export const getStudentsByClass = (payload) => {
  let config = {
    params: { idLopHoc: payload },
  };
  return axios.get(apiUrl + '/thongKeGoiCuoc', config);
};
export const getTotalTuitionByStudentId = (maGoiCuoc, idHocKy) => {
  return axios.get(apiUrl + `/tongtienhoc/${maGoiCuoc}/${idHocKy}`);
};
