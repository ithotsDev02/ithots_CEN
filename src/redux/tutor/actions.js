const actions = {
  CREATE_NEW_TUTOR_BEGIN: "CREATE_NEW_TUTOR_BEGIN",
  CREATE_NEW_TUTOR_SUCCESS: "CREATE_NEW_TUTOR_SUCCESS",
  CREATE_NEW_TUTOR_ERROR: "CREATE_NEW_TUTOR_ERROR",
  CREATE_NEW_COURSE_BEGIN: "CREATE_NEW_COURSE_BEGIN",
  CREATE_NEW_COURSE_SUCCESS: "CREATE_NEW_COURSE_SUCCESS",
  CREATE_NEW_COURSE_ERROR: "CREATE_NEW_COURSE_ERROR",
  GET_ALL_COURSES_BEGIN: "GET_ALL_COURSES_BEGIN",
  GET_ALL_COURSES_SUCCESS: "GET_ALL_COURSES_SUCCESS",
  GET_ALL_COURSES_ERROR: "GET_ALL_COURSES_ERROR",
  GET_ALL_TUTORS_BEGIN: "GET_ALL_TUTORS_BEGIN",
  GET_ALL_TUTORS_SUCCESS: "GET_ALL_TUTORS_SUCCESS",
  GET_ALL_TUTORS_ERROR: "GET_ALL_TUTORS_ERROR",
  GET_BANKINFO_BEGIN: "GET_BANKINFO_BEGIN",
  GET_BANKINFO_SUCCESS: "GET_BANKINFO_SUCCESS",
  GET_BANKINFO_ERR: "GET_BANKINFO_ERR",
  getBankInfoBegin: () => {
    return {
      type: actions.GET_BANKINFO_BEGIN,
      payload: { loading: true },
    };
  },
  getBankInfoSuccess: (data) => {
    return {
      type: actions.GET_BANKINFO_SUCCESS,
      payload: { loading: false, data: data },
    };
  },
  getBankInfoError: (err) => {
    return {
      type: actions.GET_BANKINFO_ERR,
      payload: { loading: false, err: err },
    };
  },
  getAllTutorsBegin: () => {
    return {
      type: actions.GET_ALL_TUTORS_BEGIN,
    };
  },
  getAllTutorsSuccess: (data) => {
    return {
      type: actions.GET_ALL_TUTORS_SUCCESS,
      data,
    };
  },
  getAllTutorsError: (err) => {
    return {
      type: actions.GET_ALL_TUTORS_ERROR,
      err,
    };
  },
  createNewTutorProfileBegin: () => {
    return {
      type: actions.CREATE_NEW_TUTOR_BEGIN,
    };
  },
  createNewTutorProfileSuccess: (data) => {
    return {
      type: actions.CREATE_NEW_TUTOR_BEGIN,
      data,
    };
  },
  createNewTutorProfileError: (err) => {
    return {
      type: actions.CREATE_NEW_TUTOR_ERROR,
      err,
    };
  },
  createNewCourseBegin: () => {
    return {
      type: actions.CREATE_NEW_COURSE_BEGIN,
    };
  },
  createNewCourseSuccess: (data) => {
    return {
      type: actions.CREATE_NEW_COURSE_SUCCESS,
      data,
    };
  },
  createNewCourseError: (err) => {
    return {
      type: actions.CREATE_NEW_COURSE_ERROR,
      err,
    };
  },
  getAllCoursesBegin: () => {
    return {
      type: actions.GET_ALL_COURSES_BEGIN,
    };
  },
  getAllCoursesSuccess: (data) => {
    return {
      type: actions.GET_ALL_COURSES_SUCCESS,
      data,
    };
  },
  getAllCoursesError: (err) => {
    return {
      type: actions.GET_ALL_COURSES_ERROR,
      err,
    };
  },
};
export default actions;
