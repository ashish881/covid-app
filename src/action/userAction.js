import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  VERIFY_USER
} from "../constant/userConstant";

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    console.log("sucesslogin", data);

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("--------------errror-action", error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const userRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/register",
      { name, email, password },
      config
    );
    console.log(data);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    //After registering dispatch the login to get the user login on userInfo
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyUser = () => async (dispatch, getState) => {

  const _token = getState().userLogin.userInfo
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + _token?.token
    },
  };
  const { data } = await axios.get(
    "/api/user/verify",
    config
  );

  console.log('------------------', data)
  dispatch({
    type: VERIFY_USER,
    payload: data
  })
}