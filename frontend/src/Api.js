import axios from "axios";
const appToken = `Bearer ${localStorage.getItem('app-token')}`;
const API = axios.create({
  baseURL: "https://lognation.herokuapp.com/api",
  headers: { 'Authorization': appToken }
});

const getEventos = async ({linesPerPage=10, orderByField="id", orderByDirection="ASC", pageNo=0}, paramsState) => {
  const { data } = await API.post(`/events/findEvents?linesPerPage=${linesPerPage}&orderByField=${orderByField}&=${orderByDirection}&pageNo=${pageNo}`,paramsState);
  return data;
};

const getList = async () => {
  const { data } = await API.get(`/environments`);
  console.log(data)
  return data;
};

const getEventById = async (eventID) => {
  const { data } = await API.get(`/events/${eventID}`);
  return data;
};

export { getEventos, getList, getEventById };
