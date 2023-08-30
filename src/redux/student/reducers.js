import actions from './actions';
const {
    CREATE_NEW_STUDENT_BEGIN,
    CREATE_NEW_STUDENT_SUCCESS,
    CREATE_NEW_STUDENT_ERR,
    GET_ALL_STUDENTS_BEGIN,
    GET_ALL_STUDENTS_SUCCESS,
    GET_ALL_STUDENTS_ERR,
    EDIT_STUDENT_BEGIN,
    EDIT_STUDENT_SUCCESS,
    EDIT_STUDENT_ERR,
    DELETE_STUDENT_BEGIN,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_ERR,
} = actions;
const initialState = {
    students: [],
    loading: false,
    error: null,
    creationResponse: {},
    editResponse:{},
}

const StudentReducer = (state = initialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case GET_ALL_STUDENTS_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_STUDENTS_SUCCESS:
            return {
                ...state,
                students: data,
                loading: false,
            }
        case GET_ALL_STUDENTS_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            }
        case CREATE_NEW_STUDENT_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case CREATE_NEW_STUDENT_SUCCESS:
            return {
                ...state,
                creationResponse: data,
                loading: false,
            }
        case CREATE_NEW_STUDENT_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            }
        case EDIT_STUDENT_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case EDIT_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                creationResponse:data,
            }
        case EDIT_STUDENT_ERR:
            return {
                ...state,
                loading: false,
                error: err,
            }
        case DELETE_STUDENT_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                creationResponse:data,
            }
        case DELETE_STUDENT_ERR:
            return {
                ...state,
                loading: false,
                error: err,
            }
        default:
            return state;

    }
    
}
export default StudentReducer;