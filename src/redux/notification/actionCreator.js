import actions from "./actions";
import initialState from "../../demoData/message-list.json";
import axiosInstance from "../../config/axoisconfig";

const {
  readNotificationBegin,
  readNotificationSuccess,
  readNotificationErr,
} = actions;

const readNotificationList = () => {
  return async (dispatch) => {
    dispatch(readNotificationBegin());
    let url = "https://api.esculae.com/api/v1/personal/student-request-batch";

    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(readNotificationSuccess(resp.data.data));
        }, 1000);
      })
      .catch((err) => {
        // errorNotification("Error in getting Notifications");
        dispatch(readNotificationErr());
      });
  };
};

const deleteNotification = (id) => {
  return async (dispatch) => {
    let url =
      "https://api.esculae.com/api/v1/personal/student-request-batch/" + id;

    axiosInstance
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        dispatch(readNotificationList());
      })
      .catch((err) => {
        // errorNotification("Error in getting Notifications");
        // dispatch(readNotificationErr());
      });
  };
};
export { readNotificationList, deleteNotification };
