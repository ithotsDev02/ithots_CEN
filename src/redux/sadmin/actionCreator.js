import actions from "./actions";
import errorNotification from "../../components/notification/errorNotification";
import successNotification from "../../components/notification/successNotification";
import axiosInstance from "../../config/axoisconfig";
axiosInstance.defaults.headers.common["xaccesstoken"] = `${localStorage.getItem(
  "token"
) || ""}`;
const {
  getAllAdminsBegin,
  getAllAdminsError,
  getAllAdminsSuccess,
  createNewAdminBegin,
  createNewAdminSuccess,
  createNewAdminError,
  editAdminBegin,
  editAdminSuccess,
  editAdminError,
  deleteAdminBegin,
  deleteAdminSuccess,
  deleteAdminError,
} = actions;
const getAllAdmins = () => {
  return async (dispatch) => {
    let url = "https://api.esculae.com/api/v1/personal/admins";
    dispatch(getAllAdminsBegin());
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          return dispatch(getAllAdminsSuccess(resp.data));
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in loading admin list");
        dispatch(getAllAdminsError(err));
      });
  };
};
const createNewAdmin = (data) => {
  return async (dispatch) => {
    dispatch(createNewAdminBegin());

    let url = "https://api.esculae.com/api/v1/personal/signup";
    axiosInstance
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(createNewAdminSuccess(resp.data));
          // getAllAdmins()
          successNotification("New Admin Created Successfully.");
        }, 1000);
        dispatch(getAllAdmins());
      })

      .catch((err) => {
        errorNotification("Error in creating category");
        dispatch(createNewAdminError(err));
      });
  };
};
const editAdmin = (data) => {
  return async (dispatch) => {
    dispatch(editAdminBegin());

    let url = "https://api.esculae.com/api/v1/personal/signup";
    axiosInstance
      .put(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(editAdminSuccess(resp.data));
          // getAllAdmins()
          dispatch(getAllAdmins());
          successNotification("Info updated Successfully.");
        }, 1000);
      })

      .catch((err) => {
        errorNotification("Error in updating info");
        dispatch(editAdminError(err));
      });
  };
};
const deleteAdmin = (data) => {
  return async (dispatch) => {
    dispatch(deleteAdminBegin());

    let url = "https://api.esculae.com/api/v1/personal/signup";
    axiosInstance
      .put(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(deleteAdminSuccess(resp.data));
          successNotification("Info updated Successfully.");

          // getAllAdmins()
          successNotification("User removed Successfully.");
        }, 1000);
      })

      .catch((err) => {
        errorNotification("Error in deleting admin");
        dispatch(deleteAdminError(err));
      });
  };
};
export { createNewAdmin, getAllAdmins, editAdmin, deleteAdmin };
