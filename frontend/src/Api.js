import axios from "axios";

const API = axios.create({
  baseURL: "https://lognation.herokuapp.com/api",
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaWVnb0B2aXNzaW5pLmNvbS5iciIsImlhdCI6MTU3NTUxMjE2MywiZXhwIjoxNTc1NTk4NTYzfQ.9ZvpNZp5redQsGWkNS1eqJlLIYX1vAjCMT2xQzD3Mxk3XZ6UC_0tbJx6exlf202aajRS1wWUUA0gx2GLu67TQw' }
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

export { getEventos, getEventosByLevel };