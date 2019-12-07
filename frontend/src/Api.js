import axios from "axios";

const API = axios.create({
  baseURL: "https://lognation.herokuapp.com/api",
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJla3JhdXNudW5lc0BnbWFpbC5jb20iLCJpYXQiOjE1NzU2ODAyMTksImV4cCI6MTU3NTc2NjYxOX0._5yNhCkM39J-MIIH4PWVy_K9hecDOuVUqMdWe5-yKBiLdeHtapNd_kTWwhkKHIbhPwfd9foWLpMPggmRVq_kMg' }
});

const getEventos = async ({linesPerPage=10, orderByField="id", orderByDirection="ASC", pageNo=0}, paramsState) => {
  const { data } = await API.post(`/events/findEvents?linesPerPage=${linesPerPage}&orderByField=id&=${orderByDirection}&pageNo=${pageNo}`,paramsState);
  return data;
};

const getEventosByLevel = async (level) => {
  const { data } = await API.get(`/Data/data.json`);
  let dataResult;
  if (level) {
    dataResult = data.filter(result => {
      return result.level === level
    })
  } else {
    dataResult = data;
  }

  return dataResult;
};

const getEventById = async (eventID) => {
  const { data } = await API.get(`/events/${eventID}`);
  return data;
};

export { getEventos, getEventosByLevel, getEventById };