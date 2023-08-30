import actions from './actions';
const {
    GET_ALL_ADMINS_BEGIN,
    GET_ALL_ADMINS_SUCCESS,
    GET_ALL_ADMINS_ERR,
    CREATE_NEW_ADMIN_BEGIN,
    CREATE_NEW_AMDIN_ERR,
    CREATE_NEW_ADMIN_SUCCESS,
    EDIT_ADMIN_BEGIN,
    EDIT_ADMIN_SUCCESS,
    EDIT_ADMIN_ERR,
    DELETE_ADMIN_BEGIN,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_ERR,
} = actions;

const initialState = {
    admins: [],
    loading: false,
    error: null,
    creationResponse: {},
    editResponse:{},
}
const SAdminReducer = (state = initialState, action) => {
    const { type, data, err } = action;
    switch (type) {
        case GET_ALL_ADMINS_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_ADMINS_SUCCESS:
            return {
                ...state,
                admins: data,
                loading: false,
            }
        case GET_ALL_ADMINS_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            }
        case CREATE_NEW_ADMIN_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case CREATE_NEW_ADMIN_SUCCESS:
            return {
                ...state,
                creationResponse: data,
                loading: false,
            }
        case CREATE_NEW_AMDIN_ERR:
            return {
                ...state,
                error: err,
                loading: false,
            }
        case EDIT_ADMIN_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case EDIT_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                creationResponse:data,
            }
        case EDIT_ADMIN_ERR:
            return {
                ...state,
                loading: false,
                error: err,
            }
        case DELETE_ADMIN_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case DELETE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                creationResponse:data,
            }
        case DELETE_ADMIN_ERR:
            return {
                ...state,
                loading: false,
                error: err,
            }
        default:
            return state;

    }
    
}
export default SAdminReducer;