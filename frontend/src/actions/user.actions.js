import axios from "../helpers/axios";
import { userConstants } from "./constants";

//action to signup
export const sign_up = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_SIGNUP_REQUEST });
    //post request from front end to signin with the data from frontend
    const res = await axios.post(`/admin/signup`, {
      ...user,
    });

    //if respond is 201 (user successfully signup)
    if (res.status === 201) {
      const { message } = res.data;

      dispatch({
        type: userConstants.USER_SIGNUP_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_SIGNUP_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};








/* import {  userContants } from "./constants"; //authConstants,
import axios from "../helpers/axios";

export const signup = (user) => {


    console.log(user)
    

    return async (dispatch) => {

        dispatch({ type: userContants.USER_REGISTER_REQUEST });
        const res = await axios.post(`/admin/signup`, {
            ...user
        });

        // if(res.status === 201){
        //     const { message } = res.data;
        //     dispatch({
        //         type: userContants.USER_REGISTER_SUCCESS,
        //         payload: {message}
        //     });
        // }else{
        //     if(res.status === 400){
        //         dispatch({
        //             type: userContants.USER_REGISTER_FAILURE,
        //             payload: { error: res.data.error }
        //         });
        //     }
        // }
    }
} */