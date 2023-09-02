import actions from "./actions";
import errorNotification from "../../components/notification/errorNotification";
import successNotification from "../../components/notification/successNotification";
import { getAllCourses } from "../tutor/actionCreator";
import { deleteNotification } from "../notification/actionCreator";
import { cartUpdateQuantity } from "../cart/actionCreator";
import axiosInstance from "../../config/axoisconfig";
// axiosInstance..headers.common["with"] = `${localStorage.getItem(
//   "token"
// ) || ""}`;
axiosInstance.defaults.withCredentials = true;
const {
  getAllCoursesBegin,
  getAllCoursesSuccess,
  getAllCoursesError,
  editCoursesBegin,
  editCoursesSuccess,
  editCoursesError,
  deleteCoursesBegin,
  deleteCoursesSuccess,
  deleteCoursesError,
  getCourseInfoBegin,
  getCourseInfoSuccess,
  getCourseInfoError,
  getBatchBegin,
  getBatchSuccess,
  getBatchError,
  createBatchBegin,
  createBatchSuccess,
  createBatchError,
  editBatchBegin,
  editBatchSuccess,
  editBatchError,
  deleteBatchBegin,
  deleteBatchSuccess,
  deleteBatchError,
  create_transaction_begin,
  create_transaction_success,
  create_transaction_error,
} = actions;

const createTransaction = (courseid, data, batchId, enrollType, facultyId) => {
  return async (dispatch) => {
    let url = "https://api-v2.esculae.com/api/v1/course/transactions";
    dispatch(create_transaction_begin());
    console.log("the datsdasd", data);
    axiosInstance
      .post(url, data)
      .then((resp) => {
        setTimeout(() => {
          dispatch(create_transaction_success(resp.data));
          successNotification("Payment Successfull. Course added to learning.");
          dispatch(cartUpdateQuantity([]));
          enrollStudent(
            courseid,
            data.student_id,
            batchId,
            enrollType,
            facultyId
          );
          // window.location = `/cart?payment=success&transactionId=${resp.data.data.transaction_number}&price=${resp.data.data.amount}`;
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Course can not be purchased at this time!");
        dispatch(create_transaction_error(err));
      });
  };
};

const enrollStudent = (courseId, studentId, batchId, enrollType, facultyId) => {
  let url = "https://api-v2.esculae.com/api/v1/personal/student-enroll-course";
  axiosInstance
    .post(url, {
      CourseId: parseInt(courseId),
      StudentId: parseInt(studentId),
      BatchId: parseInt(batchId),
      enrollType: enrollType,
      FacultyId: parseInt(facultyId),
    })
    .then((resp) => {
      window.location = "/student";
      console.log("resp ", resp);
    })
    .catch((err) => {
      errorNotification(
        "Payment done, We are facing some issues right now please wait for some time"
      );
    });
};

const requestBatchCreation = (
  courseId,
  studentId,
  facultyId,
  facultyfullname,
  facultyemail
) => {
  let url = "https://api-v2.esculae.com/api/v1/personal/student-request-batch";
  axiosInstance
    .post(url, {
      CourseId: parseInt(courseId),
      StudentId: parseInt(studentId),
      FacultyId: parseInt(facultyId),
      full_name: facultyfullname,
      email: facultyemail,
    })
    .then((resp) => {
      successNotification(
        "Request for batch creation sent to the tutor, Please wait for the batch."
      );
    })
    .catch((err) => {
      errorNotification(
        "Can not send alert to tutor at this moment for batch creation, Please try again later"
      );
    });
};

const editCourse = (id, data) => {
  return async (dispatch) => {
    let url = "https://api-v2.esculae.com/api/v1/course/course/" + id;
    dispatch(editCoursesBegin());
    axiosInstance
      .put(url, data)
      .then((resp) => {
        setTimeout(() => {
          dispatch(editCoursesSuccess(resp.data));
          dispatch(getAllCourses());
          successNotification("Course Details Updated Successfully!");
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in updating course info!");
        dispatch(editCoursesError(err));
      });
  };
};
const disable = (id, data, calllback) => {
  return async (dispatch) => {
    let url = "https://api-v2.esculae.com/api/v1/course/course/" + id;
    dispatch(deleteCoursesBegin());
    axiosInstance
      .put(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        // console.log('dsfdasdadsd',resp)
        setTimeout(() => {
          // dispatch(getAllCourses())
          dispatch(deleteCoursesSuccess(resp.data));
          successNotification("Course Status Updated Successfully!");
          calllback(true);
          // dispatch(getAllCourses());
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in delete course");
        dispatch(deleteCoursesError(err));
      });
  };
};
const getCouseInfo = (id) => {
  return async (dispatch) => {
    dispatch(getCourseInfoBegin());
    let url = "https://api-v2.esculae.com/api/v1/course/course/" + id;
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(getCourseInfoSuccess(resp.data));
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in getting the course list");
        dispatch(getCourseInfoError());
      });
  };
};
const getBatch = (id) => {
  return async (dispatch) => {
    console.log("id passed ios", id);
    dispatch(getBatchBegin());
    var url = "";
    if (id === null) {
      url = "https://api-v2.esculae.com/api/v1/course/batch";
    } else {
      url = "https://api-v2.esculae.com/api/v1/course/batch/" + id;
    }
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log("the response sent is", resp.data);
        dispatch(getBatchSuccess(resp.data));
      })
      .catch((err) => {
        errorNotification("Error in getting the batch information");
        dispatch(getBatchError(err));
      });
  };
};
const createBatch = (data) => {
  return async (dispatch) => {
    dispatch(createBatchBegin());
    let url = "https://api-v2.esculae.com/api/v1/course/batch";
    axiosInstance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          successNotification("New Batch Created Successfully!");
          dispatch(createBatchSuccess(resp.data));
          if (
            localStorage.getItem("NotificationSelection") &&
            localStorage.getItem("NotificationSelection") !== ""
          ) {
            dispatch(
              deleteNotification(localStorage.getItem("NotificationSelection"))
            );
          }
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in creating new batch");
        dispatch(createBatchError());
      });
  };
};
const editBatch = (id, data) => {
  return async (dispatch) => {
    let url = "https://api-v2.esculae.com/api/v1/course/batch/" + id;
    dispatch(editBatchBegin());
    axiosInstance
      .put(url, data)
      .then((resp) => {
        setTimeout(() => {
          dispatch(editBatchSuccess(resp.data));
          successNotification("Batch Details Updated Successfully!");
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in updating batch info!");
        dispatch(editBatchError(err));
      });
  };
};
const deleteBatch = (id) => {
  return async (dispatch) => {
    let url = "https://api-v2.esculae.com/api/v1/course/batch/" + id;
    dispatch(deleteBatchBegin());
    axiosInstance
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(deleteBatchSuccess(resp.data));
          successNotification("Batch Removed Successfully!");
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in deleting batch");
        dispatch(deleteBatchError(err));
      });
  };
};
export {
  getAllCourses,
  editCourse,
  disable,
  getCouseInfo,
  getBatch,
  createBatch,
  editBatch,
  deleteBatch,
  createTransaction,
  requestBatchCreation,
};
