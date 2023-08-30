const actions = {
  GET_ALL_COURSES_BEGIN: "GET_ALL_COURSES_BEGIN",
  GET_ALL_COURSES_SUCCESS: "GET_ALL_COURSES_SUCCESS",
  GET_ALL_COURSES_ERR: "GET_ALL_COURSES_ERR",
  EDIT_COURSE_BEGIN: "EDIT_COURSE_BEGIN",
  EDIT_COURSE_SUCCESS: "EDIT_COURSE_SUCCESS",
  EDIT_COURSE_ERR: "EDIT_COURSE_ERR",
  DELETE_COURSE_BEGIN: "DELETE_COURSE_BEGIN",
  DELETE_COURSE_SUCCESS: "DELETE_COURSE_SUCCESS",
  DELETE_COURSE_ERR: "DELETE_COURSE_ERR",
  GET_COURSE_INFO_BEGIN: "GET_COURSE_INFO_BEGIN",
  GET_COURSE_INFO_SUCCESS: "GET_COURSE_INFO_SUCCESS",
  GET_COURSE_INFO_ERR: "GET_COURSE_INFO_ERR",
  GET_BATCH_BEGIN: "GET_BATCH_BEGIN",
  GET_BATCH_SUCCESS: "GET_BATCH_SUCCESS",
  GET_BATCH_ERR: "GET_BATCH_ERR",
  CREATE_BATCH_BEGIN: "CREATE_BATCH_BEGIN",
  CREATE_BATCH_SUCCESS: "CREATE_BATCH_SUCCESS",
  CREATE_BATCH_ERR: "CREATE_BATCH_ERR",
  EDIT_BATCH_BEGIN: "EDIT_BATCH_BEGIN",
  EDIT_BATCH_SUCCESS: "EDIT_BATCH_SUCCESS",
  EDIT_BATCH_ERR: "EDIT_BATCH_ERR",
  DELETE_BATCH_BEGIN: "DELETE_BATCH_BEGIN",
  DELETE_BATCH_SUCCESS: "DELETE_BATCH_SUCCESS",
  DELETE_BATCH_ERR: "DELETE_BATCH_ERR",
  CREATE_TRANSACTION_BEGIN: "CREATE_TRANSACTION_BEGIN",
  CREATE_TRANSACTION_SUCCESS: "CREATE_TRANSACTION_SUCCESS",
  CREATE_TRANSACTION_ERR: "CREATE_TRANSACTION_ERR",
  create_transaction_begin: () => {
    return {
      type: actions.CREATE_TRANSACTION_BEGIN,
    };
  },
  create_transaction_success: () => {
    return {
      type: actions.CREATE_TRANSACTION_SUCCESS,
    };
  },
  create_transaction_error: () => {
    return {
      type: actions.CREATE_TRANSACTION_ERR,
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
      type: actions.GET_ALL_COURSES_ERR,
      err,
    };
  },
  getCourseInfoBegin: () => {
    return {
      type: actions.GET_COURSE_INFO_BEGIN,
    };
  },
  getCourseInfoSuccess: (data) => {
    return {
      type: actions.GET_COURSE_INFO_SUCCESS,
      data,
    };
  },
  getCourseInfoError: (err) => {
    return {
      type: actions.GET_COURSE_INFO_ERR,
      err,
    };
  },
  editCoursesBegin: () => {
    return {
      type: actions.EDIT_COURSE_BEGIN,
    };
  },
  editCoursesSuccess: (data) => {
    return {
      type: actions.EDIT_COURSE_SUCCESS,
      data,
    };
  },
  editCoursesError: (err) => {
    return {
      type: actions.EDIT_COURSE_ERR,
      err,
    };
  },
  deleteCoursesBegin: () => {
    return {
      type: actions.DELETE_COURSE_BEGIN,
    };
  },
  deleteCoursesSuccess: (data) => {
    return {
      type: actions.DELETE_COURSE_SUCCESS,
      data,
    };
  },
  deleteCoursesError: (err) => {
    return {
      type: actions.DELETE_COURSE_ERR,
      err,
    };
  },
  getBatchBegin: () => {
    return {
      type: actions.GET_BATCH_BEGIN,
    };
  },
  getBatchSuccess: (data) => {
    return {
      type: actions.GET_BATCH_SUCCESS,
      data,
    };
  },
  getBatchError: (err) => {
    return {
      type: actions.GET_BATCH_ERR,
      err,
    };
  },
  createBatchBegin: () => {
    return {
      type: actions.CREATE_BATCH_BEGIN,
    };
  },
  createBatchSuccess: (data) => {
    return {
      type: actions.CREATE_BATCH_SUCCESS,
      data,
    };
  },
  createBatchError: (err) => {
    return {
      type: actions.CREATE_BATCH_ERR,
      err,
    };
  },
  editBatchBegin: () => {
    return {
      type: actions.EDIT_BATCH_BEGIN,
    };
  },
  editBatchSuccess: (data) => {
    return {
      type: actions.EDIT_BATCH_SUCCESS,
      data,
    };
  },
  editBatchError: (err) => {
    return {
      type: actions.EDIT_BATCH_ERR,
      err,
    };
  },
  deleteBatchBegin: () => {
    return {
      type: actions.DELETE_BATCH_BEGIN,
    };
  },
  deleteBatchSuccess: (data) => {
    return {
      type: actions.DELETE_BATCH_SUCCESS,
      data,
    };
  },
  deleteBatchError: (err) => {
    return {
      type: actions.DELETE_BATCH_ERR,
      err,
    };
  },
};
export default actions;
