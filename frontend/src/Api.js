import axios from "axios";
const appToken = `Bearer ${localStorage.getItem('app-token')}`;
const API = axios.create({
  baseURL: "https://lognation.herokuapp.com/api",
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJla3JhdXNudW5lc0BnbWFpbC5jb20iLCJpYXQiOjE1NzU2ODAyMTksImV4cCI6MTU3NTc2NjYxOX0._5yNhCkM39J-MIIH4PWVy_K9hecDOuVUqMdWe5-yKBiLdeHtapNd_kTWwhkKHIbhPwfd9foWLpMPggmRVq_kMg' }
});

const getEventos = async ({linesPerPage=10, orderByField="id", orderByDirection="ASC", pageNo=0}, paramsState) => {
  const { data } = await API.post(`/events/findEvents?linesPerPage=${linesPerPage}&orderByField=environment&=${orderByDirection}&pageNo=${pageNo}`,paramsState);
  return data;
};

const getEventById = async (eventID) => {
  const { data } = await API.get(`/events/${eventID}`);
  return data;
};

export { getEventos, getEventosByLevel, getEventById };
