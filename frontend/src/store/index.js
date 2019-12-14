import { createStore } from "redux";
import reducer from "./ducks";

const store = createStore(reducer);

export default store;
