import axios from "axios";
import { Creators as Actions } from "./store/ducks/events";

const getToken = () => ({
  Authorization: `Bearer ${localStorage.getItem("appToken")}`
});
// const appToken = `Bearer ${localStorage.getItem("appToken")}`;
const API = axios.create({
  baseURL: "https://lognation.herokuapp.com/api"
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
  const headers = getToken();
  const {
    data
  } = await API.post(
    `/events/findEvents?linesPerPage=${linesPerPage}&orderByField=${orderByField}&=${orderByDirection}&pageNo=${pageNo}`,
    paramsState,
    { headers }
  );
  return data;
};

const getEvents = dispatch => {
  dispatch(Actions.isLoading());
  getEventos({}, {}).then(data => {
    dispatch(Actions.getEvents(data));
  });
};

const changeParams = (dispatch, paramsState ) => {
  const paginationNew = {
    pageNo: 0
  };
  getEventos(paginationNew, paramsState).then(data => {
    dispatch(Actions.changeParams(data, paramsState));
  });
};

// const changePagination = (state = INITIAL_STATE, { isLoading, pagination }) => {
//   const result = getEventos(pagination, state.paramsState);

//   return {
//     ...state,
//     isLoading,
//     pagination: {
//       ...state.pagination,
//       ...result
//     }
//   };
// };
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
  getEvents,
  changeParams
};
