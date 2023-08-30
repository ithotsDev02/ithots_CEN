import axiosInstance from "../../config/axoisconfig";
import actions from "./actions";
import { courseCreationSuccess } from "../../container/CreateCourse/partials/courseCreationSuccess";
import errorNotification from "../../components/notification/errorNotification";
import successNotification from "../../components/notification/successNotification";
const {
  createNewTutorProfileBegin,
  createNewTutorProfileSuccess,
  createNewTutorProfileError,
  createNewCourseBegin,
  createNewCourseSuccess,
  createNewCourseError,
  getAllCoursesBegin,
  getAllCoursesSuccess,
  getAllCoursesError,
  getAllTutorsBegin,
  getAllTutorsSuccess,
  getAllTutorsError,
  getBankInfoBegin,
  getBankInfoSuccess,
  getBankInfoError,
} = actions;

// axiosInstance.get(API_SERVER + '/todos')
const getAllTutors = () => {
  return async (dispatch) => {
    dispatch(getAllTutorsBegin());
    let url = "https://api.esculae.com/api/v1/personal/faculty";
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        dispatch(getAllTutorsSuccess(resp.data));
      })
      .catch((err) => {
        errorNotification("Error in creating tutor profile");
        dispatch(getAllTutorsError());
      });
  };
};
const createNewTutorProfile = (data, id) => {
  return async (dispatch) => {
    dispatch(createNewTutorProfileBegin());
    let url = "https://api.esculae.com/api/v1/personal/faculty/" + id;
    axiosInstance
      .put(url, data)
      .then((resp) => {
        setTimeout(() => {
          dispatch(createNewTutorProfileSuccess(resp.data));
          localStorage.setItem("userImage", resp.data.data.image);
   successNotification("Profile Updated Successfully.");
          window.location = "/tutor/newTutor";
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in creating tutor profile");
        dispatch(createNewTutorProfileError());
      });
  };
};
const resetCreationResponse = () => {
  return async (dispatch) => {
    dispatch(createNewCourseSuccess({}));
  };
};
const createNewCourse = (data, callback) => {
  return async (dispatch) => {
    dispatch(createNewCourseBegin());
    let url = "https://api.esculae.com/api/v1/course/course";
    axiosInstance
      .post(url, data)
      .then((resp) => {
        setTimeout(() => {
          dispatch(createNewCourseSuccess(resp.data));
          successNotification("New Course Created");
          courseCreationSuccess();
          dispatch(getAllCourses());
          callback();
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in creating new course", err);
        dispatch(createNewCourseError(err));
      });
  };
};
const getAllCourses = (type) => {
  return async (dispatch) => {
    dispatch(getAllCoursesBegin());
    let url = "";
    if (type === "tutor") {
      url = "https://api.esculae.com/api/v1/course/course";
    } else {
      url = "https://api.esculae.com/api/v1/personal/student-enroll-course";
    }
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        if (type === "tutor") {
          dispatch(getAllCoursesSuccess(resp.data));
        } else {
          let courseInfo = [];
          resp.data &&
            resp.data.data.map((course) => {
              courseInfo.push(course.course_from_enroll_course);
            });
          dispatch(getAllCoursesSuccess(courseInfo));
        }
      })
      .catch((err) => {
        errorNotification("Error in getting the course list");
        dispatch(getAllCoursesError());
      });
  };
};
const saveBankInformation = (info, setBankDetails, setisLoading) => {
  return async (dispatch) => {
    setisLoading(true);

    let url = "https://api.esculae.com/api/v1/personal/bank_details";
    axiosInstance
      .post(url, info, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setisLoading(false);

        successNotification("Information Updated Successfully!!");
        dispatch(
          getBankInformation(
            localStorage.getItem("currentUserInfo"),
            setBankDetails
          )
        );
      })
      .catch((err) => {
        setisLoading(false);

        errorNotification(
          "Error in saving the bank information, Please try again later!"
        );
      });
  };
};
const updateBankInformation = (info, id, setBankDetails, setisLoading) => {
  return async (dispatch) => {
    setisLoading(true);

    let url = "https://api.esculae.com/api/v1/personal/bank_details/" + id;
    axiosInstance
      .put(url, info, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        successNotification("Information Updated Successfully!!");
        setisLoading(false);

        dispatch(
          getBankInformation(
            localStorage.getItem("currentUserInfo"),
            setBankDetails,
            setisLoading
          )
        );
      })
      .catch((err) => {
        setisLoading(false);

        errorNotification(
          "Error in saving the bank information, Please try again later!"
        );
      });
  };
};
const getBankInformation = (tutorid, setBankDetails, setisLoading) => {
  return async (dispatch) => {
    setisLoading(true);
    // dispatch(getBankInfoBegin());
    let url =
      "https://api.esculae.com/api/v1/personal/bank_details/" + tutorid;
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setisLoading(false);

        if (resp?.data?.data) {
          setBankDetails(resp.data.data);
          // dispatch(
          //   getBankInfoSuccess(resp.data.data[resp.data.data.length - 1])
          // );
        } else {
          return {};
        }
        console.log("the bank details from the user is");
      })
      .catch((err) => {
        setisLoading(false);

        // errorNotification(
        //   "Error in saving the bank information, Please try again later!"
        // );
        // dispatch(getBankInfoError(err));
      });
  };
};
export {
  createNewTutorProfile,
  getBankInformation,
  createNewCourse,
  getAllCourses,
  resetCreationResponse,
  getAllTutors,
  saveBankInformation,
  updateBankInformation,
};
