import axios from "axios";

const API = axios.create({
  baseURL: "https://lognation.herokuapp.com/api",
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaWVnb0B2aXNzaW5pLmNvbS5iciIsImlhdCI6MTU3NTU0MDg1MSwiZXhwIjoxNTc1NjI3MjUxfQ.fLicxBOCeAtfcmtuiwmHBWuqBfGOQw4d6BWhMrXat2CThK1U21rSTzqsqBSlt276yqjfPzeOJf_i83a4JmB7HQ' }
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