import { createActions, createReducer } from "reduxsauce";
import { getEventos } from "../../Api";

const INITIAL_STATE = {
  eventos: [],
  isLoading: true,
  error: null,
  pagination: {
    linesPerPage: 10,
    orderByField: "createdAt",
    orderByDirection: "ASC",
    pageNo: 0,
    totalPages: 0,
    totalElements: 0,
    number: 0
  },
  paramsState: {},
  list: []
};

export const { Types, Creators } = createActions({
  shelveItems: ["index", "newData"],
  deleteItems: ["index"],
  getEvents: ["data"],
  changePagination: ["isLoading", "pagination"],
  changeParams: ["data", "paramState"],
  isLoading: []
});

const changeParams = (state = INITIAL_STATE, { data, paramsState }) => {
  return {
    ...state,
    paramsState,
    pagination: {
      ...state.pagination,
      ...data
    }
  };
};

const changePagination = (state = INITIAL_STATE, { isLoading, pagination }) => {
  const result = getEventos(pagination, state.paramsState);

  return {
    ...state,
    isLoading,
    pagination: {
      ...state.pagination,
      ...result
    }
  };
};

const isLoading = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true
  };
};

const getEvents = (state = INITIAL_STATE, action) => {
  const result = action.data;
  const eventos = result.content;
  const pagination = {
    linesPerPage: result.size,
    pageNo: result.number,
    orderByField: state.pagination.orderByField,
    orderByDirection: "ASC",
    totalPages: result.totalPages,
    totalElements: result.totalElements,
    number: result.number
  };

  return {
    ...state,
    eventos,
    pagination,
    isLoading: false
  };
};

const shelveItems = (state = INITIAL_STATE, action) => ({
  ...state,
  data: state.data.map((item, idx) =>
    action.index === idx ? action.newData : item
  )
});

const deleteItems = (state = INITIAL_STATE, action) => ({
  ...state,
  data: state.data.filter((_, idx) => idx !== action.index)
});

export default createReducer(INITIAL_STATE, {
  [Types.SHELVE_ITEMS]: shelveItems,
  [Types.DELETE_ITEMS]: deleteItems,
  [Types.GET_EVENTS]: getEvents,
  [Types.CHANGE_PAGINATION]: changePagination,
  [Types.CHANGE_PARAMS]: changeParams,
  [Types.IS_LOADING]: isLoading
});
