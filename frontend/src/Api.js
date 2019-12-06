import axios from "axios";
const appToken = `Bearer ${localStorage.getItem('app-token')}`;
const API = axios.create({
  baseURL: "https://lognation.herokuapp.com/api",
  headers: { 'Authorization': appToken }
});

const getEventos = async ({linesPerPage=10, orderByField="id", orderByDirection="ASC", pageNo=0}, paramsState) => {
  const { data } = await API.post(`/events/findEvents?linesPerPage=${linesPerPage}&orderByField=environment&=${orderByDirection}&pageNo=${pageNo}`,paramsState);
  return data;
};


export { getEventos };