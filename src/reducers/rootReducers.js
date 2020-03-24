import * as types from "../constants/ActionTypes";
const initialState = {
  users: [],
  total: null,
  per_page: null,
  current_page: 1
};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DATA:
      console.log(action.payload)
      return {
        ...state,
        users: action.payload.data,
        total: action.payload.total,
        per_page: action.payload.per_page,
        current_page: action.payload.page
      };
    default:
      return state;
  }
};
