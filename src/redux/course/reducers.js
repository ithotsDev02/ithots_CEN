import actions from "./actions";
const {
  GET_ALL_COURSES_BEGIN,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_ERR,
  EDIT_COURSE_BEGIN,
  EDIT_COURSE_SUCCESS,
  EDIT_COURSE_ERR,
  DELETE_COURSE_BEGIN,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_ERR,
  GET_COURSE_INFO_BEGIN,
  GET_COURSE_INFO_SUCCESS,
  GET_COURSE_INFO_ERR,
  GET_BATCH_BEGIN,
  GET_BATCH_SUCCESS,
  GET_BATCH_ERR,
  CREATE_BATCH_BEGIN,
  CREATE_BATCH_SUCCESS,
  CREATE_BATCH_ERR,
  EDIT_BATCH_BEGIN,
  EDIT_BATCH_SUCCESS,
  EDIT_BATCH_ERR,
  DELETE_BATCH_BEGIN,
  DELETE_BATCH_SUCCESS,
  DELETE_BATCH_ERR,
  CREATE_TRANSACTION_BEGIN,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_ERR,
} = actions;
const initialState = {
  courses: [],
  batches: [],
  loading: false,
  error: null,
  creationResponse: {},
  courseInfo: {},
  editResponse: {},
};
const CoursesReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case CREATE_TRANSACTION_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        creationResponse: data,
        loading: false,
      };
    case CREATE_TRANSACTION_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_ALL_COURSES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_COURSES_SUCCESS:
      return {
        ...state,
        courses: data,
        loading: false,
      };
    case GET_ALL_COURSES_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_COURSE_INFO_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_COURSE_INFO_SUCCESS:
      return {
        ...state,
        courseInfo: data,
        loading: false,
      };
    case GET_COURSE_INFO_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case EDIT_COURSE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EDIT_COURSE_SUCCESS:
      return {
        ...state,
        editResponse: data,
        loading: false,
      };
    case EDIT_COURSE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case DELETE_COURSE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        editResponse: data,
        loading: false,
      };
    case DELETE_COURSE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_BATCH_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_BATCH_SUCCESS:
      return {
        ...state,
        batches: data,
        loading: false,
      };
    case GET_BATCH_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CREATE_BATCH_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BATCH_SUCCESS:
      return {
        ...state,
        creationResponse: data,
        loading: false,
      };
    case CREATE_BATCH_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case EDIT_BATCH_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EDIT_BATCH_SUCCESS:
      return {
        ...state,
        editResponse: data,
        loading: false,
      };
    case EDIT_BATCH_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case DELETE_BATCH_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BATCH_SUCCESS:
      return {
        ...state,
        editResponse: data,
        loading: false,
      };
    case DELETE_BATCH_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default CoursesReducer;
