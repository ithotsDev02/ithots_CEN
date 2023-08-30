import axiosInstance from "../../config/axoisconfig";
import actions from "./actions";
import errorNotification from "../../components/notification/errorNotification";
import successNotification from "../../components/notification/successNotification";
axiosInstance.defaults.headers.common["xaccesstoken"] = `${localStorage.getItem(
  "token"
) || ""}`;
const {
  getAllStudentsBegin,
  getAllStudentsSuccess,
  getAllStudentsError,
  createNewStudentBegin,
  createNewStudentSuccess,
  createNewStudentError,
  editStudentBegin,
  editStudentSuccess,
  editStudentError,
  deleteStudentBegin,
  deleteStudentSuccess,
  deleteStudentError,
} = actions;

const resetPassword = (data, setisLocLoading) => {
  return async (dispatch) => {
    setisLocLoading(true);
    let url =
      "https://api.esculae.com/api/v1/personal/student-forgot-password";
    axiosInstance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          setisLocLoading(false);
          successNotification("Please check your email for further steps");
        }, 1000);
      })
      .catch((err) => {
        setisLocLoading(false);
        errorNotification(
          "We are facing some issues in resetting your password, Please try again in some or contact admin"
        );
      });
  };
};
const getAllStudents = () => {
  return async (dispatch) => {
    let url = "https://api.esculae.com/api/v1/personal/student";
    dispatch(getAllStudentsBegin());
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          return dispatch(getAllStudentsSuccess(resp.data));
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in loading student list");
        dispatch(getAllStudentsError(err));
      });
  };
};
const createNewStudent = (data, id) => {
  return async (dispatch) => {
    dispatch(createNewStudentBegin());

    let url = "https://api.esculae.com/api/v1/personal/student/" + id;
    axiosInstance
      .put(url, data)
      .then((resp) => {
        setTimeout(() => {
          dispatch(createNewStudentSuccess(resp.data));
          localStorage.setItem("userImage", resp.data.data.image);
          dispatch(getAllStudents());
          successNotification("Profile Updated Successfully.");
          window.location = "/student/newStudent";
        }, 1000);
      })

      .catch((err) => {
        errorNotification("Error in updating profile");
        dispatch(createNewStudentError(err));
      });
  };
};
const editStudent = (data) => {
  return async (dispatch) => {
    dispatch(editStudentBegin());

    let url = "https://api.esculae.com/api/v1/personal/signup";
    axiosInstance
      .put(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(editStudentSuccess(resp.data));
          // getAllAdmins()
          successNotification("Info updated Successfully.");
        }, 1000);
      })

      .catch((err) => {
        errorNotification("Error in updating info");
        dispatch(editStudentError(err));
      });
  };
};
const deleteStudent = (data) => {
  return async (dispatch) => {
    dispatch(deleteStudentBegin());

    let url = "https://api.esculae.com/api/v1/personal/signup";
    axiosInstance
      .put(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(deleteStudentSuccess(resp.data));
          // getAllAdmins()
          successNotification("User removed Successfully.");
        }, 1000);
      })

      .catch((err) => {
        errorNotification("Error in deleting admin");
        dispatch(deleteStudentError(err));
      });
  };
};
export {
  resetPassword,
  getAllStudents,
  createNewStudent,
  editStudent,
  deleteStudent,
};
