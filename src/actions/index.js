import * as types from "../constants/ActionTypes";
import axios from "axios";
export const makeHttpRequestWithPage = pageNumber => {
  return async dispatch => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${pageNumber}`
    );

    const data = await response.data;
    dispatch({
      type: types.FETCH_DATA,
      payload: data
    });
  };
};
