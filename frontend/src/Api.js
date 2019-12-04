import axios from "axios";

const API = axios.create({
  baseURL: "https://lognation.herokuapp.com/api",
  headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaWVnb0B2aXNzaW5pLmNvbS5iciIsImlhdCI6MTU3NTQxNjg0MSwiZXhwIjoxNTc1NTAzMjQxfQ.3YIlVyFrpvkcHtWycQnbxBG_rdtSKlOwgpWEO3zR7XUZERoTapupZ9wqI4Ee0JEMLIMVQAL8JcxFiAiqU3Scfw'}
});

const getEventos = async ({linesPerPage=10, orderByField="createdAt", orderByDirection="ASC", pageNo=0}) => {
  const { data } = await API.post(`/events/findEvents?linesPerPage=${linesPerPage}&orderByField=${orderByField}&=${orderByDirection}&=${pageNo}`);
  console.log(data);
  return data;
};

const getEventosByLevel = async (level) => {
  const { data } = await API.get(`/Data/data.json`);
  let dataResult;
  if(level){
    dataResult = data.filter(result => {
      return result.level === level
    })
  }else{
    dataResult = data;
  }

  return dataResult;
};

export { getEventos, getEventosByLevel };