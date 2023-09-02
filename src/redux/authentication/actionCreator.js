import axiosInstance from "../../config/axoisconfig";
import Cookies from "js-cookie";
import actions from "./actions";

import errorNotification from "../../components/notification/errorNotification";
import successNotification from "../../components/notification/successNotification";
const {
  loginBegin,
  loginSuccess,
  loginErr,
  logoutBegin,
  logoutSuccess,
  logoutErr,
  signupBegin,
  signupSuccess,
  signupErr,
} = actions;

const signup = (userinfo, endpoint) => {
  return async (dispatch) => {
    dispatch(signupBegin());

    let url = "https://api-v2.esculae.com/api/v1/personal" + endpoint;
    axiosInstance
      .post(url, JSON.stringify(userinfo), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(signupSuccess(resp.data));
          successNotification("Please check you email inbox for next steps");
          // return dispatch(createCategorySuccess(resp.data));
        }, 1000);
      })

      .catch((err) => {
        errorNotification("Error in creating acccount, Please contact admin");
        dispatch(signupErr(err));
      });
  };
};
const login = (user, type) => {
  return async (dispatch) => {
    var userRole;
    let url;
    if (type === "sadmin56355") {
      url = "https://api-v2.esculae.com/api/v1/business/login";
    } else if (type === "admin83606") {
      url = "https://api-v2.esculae.com/api/v1/personal/login";
    } else if (type === "tutor") {
      url = "https://api-v2.esculae.com/api/v1/personal/faculty-login";
    } else if (type === "student") {
      url = "https://api-v2.esculae.com/api/v1/personal/student-login";
    }

    axiosInstance
      .post(url, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log("the response is", resp);
        dispatch(loginBegin());
        setTimeout(() => {
          localStorage.setItem("logedIn", "true");
          if (type == "sadmin56355") {
            userRole = "superadmin";
          } else if (type == "admin83606") {
            userRole = "admin";
          } else if (type == "tutor") {
            userRole = "tutor";
          } else {
            userRole = "student";
          }

          localStorage.setItem("USR_ROLE", userRole);
          localStorage.setItem("currentUserInfo", resp.data.userId || 0);
          localStorage.setItem("userImage", resp.data.image || "");
          localStorage.setItem("token", resp.data.accessToken);
          localStorage.setItem("username", resp.data.email);
          localStorage.setItem("full_name", resp.data.full_name || "");
          if (type == "sadmin56355") {
            window.location = "/sadmin";
          } else if (type == "admin83606") {
            window.location = "/admin";
          } else if (type == "tutor") {
            window.location = "/tutor";
          } else {
            window.location = "/student";
          }
          return dispatch(loginSuccess(true));
        }, 1000);
      })
      .catch((err) => {
        errorNotification(
          "Error in login, Please contact admin or check your username / password"
        );
        // dispatch(loginErr(err));
      });
  };
};

const logOut = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutBegin());
      Cookies.remove("logedIn");
      dispatch(logoutSuccess(null));
      window.location = "/";
      localStorage.clear();
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut, signup };
