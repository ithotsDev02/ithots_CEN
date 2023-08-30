import actions from "./actions";

const {
  CREATE_NEW_TUTOR_BEGIN,
  CREATE_NEW_TUTOR_SUCCESS,
  CREATE_NEW_TUTOR_ERROR,
  CREATE_NEW_COURSE_BEGIN,
  CREATE_NEW_COURSE_SUCCESS,
  CREATE_NEW_COURSE_ERROR,
  GET_ALL_COURSES_BEGIN,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_ERROR,
  GET_ALL_TUTORS_BEGIN,
  GET_ALL_TUTORS_SUCCESS,
  GET_ALL_TUTORS_ERROR,
  GET_BANKINFO_BEGIN,
  GET_BANKINFO_SUCCESS,
  GET_BANKINFO_ERR,
} = actions;

const initialState = {
  tutors: [],
  bankInfo: {},
  createdResponse: {},
  courses: [],
  loading: false,
  error: null,
};
const TutorReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case GET_BANKINFO_BEGIN:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case GET_BANKINFO_SUCCESS:
      return {
        ...state,
        bankInfo: action.payload.data,
        loading: action.payload.loading,
      };
    case GET_BANKINFO_ERR:
      return {
        ...state,
        error: action.payload.err,
        loading: action.payload.loading,
      };
    case GET_ALL_TUTORS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_TUTORS_SUCCESS:
      return {
        ...state,
        tutors: data,
        loading: false,
      };
    case GET_ALL_TUTORS_ERROR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CREATE_NEW_TUTOR_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CREATE_NEW_TUTOR_SUCCESS:
      return {
        ...state,
        createdResponse: data,
        loading: false,
      };
    case CREATE_NEW_TUTOR_ERROR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CREATE_NEW_COURSE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CREATE_NEW_COURSE_SUCCESS:
      return {
        ...state,
        createdResponse: data,
        loading: false,
      };
    case CREATE_NEW_COURSE_ERROR:
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
    case GET_ALL_COURSES_ERROR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default TutorReducer;
