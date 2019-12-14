import { createActions, createReducer } from "reduxsauce";
import { data } from "./../../components/data";
const INITIAL_STATE = { data };

export const { Types, Creators } = createActions({
  shelveItems: ["index", "newData"],
  deleteItems: ["index"]
});

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
  [Types.DELETE_ITEMS]: deleteItems
});
