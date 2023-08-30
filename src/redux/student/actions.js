const actions = {
  CREATE_NEW_STUDENT_BEGIN: "CREATE_NEW_STUDENT_BEGIN",
  CREATE_NEW_STUDENT_SUCCESS: "CREATE_NEW_STUDENT_SUCCESS",
  CREATE_NEW_STUDENT_ERR: "CREATE_NEW_STUDENT_ERR",
  GET_ALL_STUDENTS_BEGIN: "GET_ALL_STUDENTS_BEGIN",
  GET_ALL_STUDENTS_SUCCESS: "GET_ALL_STUDENTS_SUCCESS",
  GET_ALL_STUDENTS_ERR: "GET_ALL_STUDENTS_ERR",
  EDIT_STUDENT_BEGIN: "EDIT_STUDENT_BEGIN",
  EDIT_STUDENT_SUCCESS: "EDIT_STUDENT_SUCCESS",
  EDIT_STUDENT_ERR: "EDIT_STUDENT_ERR",
  DELETE_STUDENT_BEGIN: "DELETE_STUDENT_BEGIN",
  DELETE_STUDENT_SUCCESS: "DELETE_STUDENT_SUCCESS",
  DELETE_STUDENT_ERR: "DELETE_STUDENT_ERR",
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
  getAllStudentsBegin: () => {
    return {
      type: actions.GET_ALL_STUDENTS_BEGIN,
    };
  },
  getAllStudentsSuccess: (data) => {
    return {
      type: actions.GET_ALL_STUDENTS_SUCCESS,
      data,
    };
  },
  getAllStudentsError: (err) => {
    return {
      type: actions.GET_ALL_STUDENTS_ERR,
      err,
    };
  },
  createNewStudentBegin: () => {
    return {
      type: actions.CREATE_NEW_STUDENT_BEGIN,
    };
  },
  createNewStudentSuccess: (data) => {
    return {
      type: actions.CREATE_NEW_STUDENT_SUCCESS,
      data,
    };
  },
  createNewStudentError: (err) => {
    return {
      type: actions.CREATE_NEW_STUDENT_SUCCESS,
      err,
    };
  },
  editStudentBegin: () => {
    return {
      type: actions.EDIT_STUDENT_BEGIN,
    };
  },
  editStudentSuccess: (data) => {
    return {
      type: actions.EDIT_STUDENT_SUCCESS,
      data,
    };
  },
  editStudentError: (err) => {
    return {
      type: actions.EDIT_STUDENT_ERR,
      err,
    };
  },
  deleteStudentBegin: () => {
    return {
      type: actions.DELETE_STUDENT_BEGIN,
    };
  },
  deleteStudentSuccess: (data) => {
    return {
      type: actions.DELETE_STUDENT_SUCCESS,
      data,
    };
  },
  deleteStudentError: (err) => {
    return {
      type: actions.DELETE_STUDENT_ERR,
      err,
    };
  },
};
export default actions;
