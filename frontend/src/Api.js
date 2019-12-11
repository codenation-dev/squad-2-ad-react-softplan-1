import axios from "axios";
const appToken = `Bearer ${localStorage.getItem("appToken")}`;
const API = axios.create({
  baseURL: "https://lognation.herokuapp.com/api",
  headers: { Authorization: appToken }
});

const getEventos = async (
  {
    linesPerPage = 10,
    orderByField = "id",
    orderByDirection = "ASC",
    pageNo = 0
  },
  paramsState
) => {
  const { data } = await API.post(
    `/events/findEvents?linesPerPage=${linesPerPage}&orderByField=${orderByField}&=${orderByDirection}&pageNo=${pageNo}`,
    paramsState
  );
  return data;
};

const shelveEvents = async eventIds => {
  await API.post(`/events/shelveMany`, eventIds);
};

const deleteEvents = async eventIds => {
  await API.post(`/events/deleteMany`, eventIds);
};

const getEventById = async eventID => {
  const { data } = await API.get(`/events/${eventID}`);
  return data;
};

const getEnvironmentList = async () => {
  const { data } = await API.get(`/environments`);
  return data;
};

const getFilterKeyList = async () => {
  const { data } = await API.get(`/filterkeys`);
  return data;
};

export {
  getEventos,
  getEventById,
  shelveEvents,
  deleteEvents,
  getEnvironmentList,
  getFilterKeyList
};
