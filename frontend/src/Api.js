import axios from "axios";

const getToken = () => ({ Authorization: `Bearer ${localStorage.getItem("appToken")}` })
// const appToken = `Bearer ${localStorage.getItem("appToken")}`;
const API = axios.create({
  baseURL: "https://lognation.herokuapp.com/api"
});

const handleLogin = async (values) => {
  const { data } = await API.post('/auth/login', values)
  return data
}

const handleRegister = async (values) => {
  const { data } = await API.post('/auth/signup', values)
  return data
}

const handleForgot = async (values) => {
  const { data } = await API.post(`/auth/forgotPassword?email=${values}`)
  console.log(data)
  return data
}

const getEventos = async (
  {
    linesPerPage = 10,
    orderByField = "id",
    orderByDirection = "ASC",
    pageNo = 0
  },
  paramsState
) => {
  const headers = getToken();
  const { data } = await API.post(
    `/events/findEvents?linesPerPage=${linesPerPage}&orderByField=${orderByField}&=${orderByDirection}&pageNo=${pageNo}`,
    paramsState,
    { headers }
  );
  return data;
};

const shelveEvents = async eventIds => {
  const headers = getToken();
  await API.post(`/events/shelveMany`, eventIds, { headers });
};

const deleteEvents = async eventIds => {
  const headers = getToken();
  await API.post(`/events/deleteMany`, eventIds, { headers });
};

const getEventById = async eventID => {
  const headers = getToken();
  const { data } = await API.get(`/events/${eventID}`, { headers });
  return data;
};

const getEnvironmentList = async () => {
  const headers = getToken();
  const { data } = await API.get(`/environments`, { headers });
  return data;
};

const getFilterKeyList = async () => {
  const headers = getToken();
  const { data } = await API.get(`/filterkeys`, { headers });
  return data;
};

export {
  getEventos,
  getEventById,
  shelveEvents,
  deleteEvents,
  getEnvironmentList,
  getFilterKeyList,
  handleLogin,
  handleRegister,
  handleForgot
};
