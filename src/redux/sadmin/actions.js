const actions = {
    GET_ALL_ADMINS_BEGIN: "GET_ALL_ADMINS_BEGIN",
    GET_ALL_ADMINS_SUCCESS: "GET_ALL_ADMINS_SUCCESS",
    GET_ALL_ADMINS_ERR: "GET_ALL_ADMINS_ERR",
    CREATE_NEW_ADMIN_BEGIN: "CREATE_NEW_ADMIN_BEGIN",
    CREATE_NEW_ADMIN_SUCCESS: "CREATE_NEW_ADMIN_SUCCESS",
    CREATE_NEW_AMDIN_ERR: "CREATE_NEW_AMDIN_ERR",
    EDIT_ADMIN_BEGIN:"EDIT_ADMIN_BEGIN", 
    EDIT_ADMIN_SUCCESS: "EDIT_ADMIN_SUCCESS",
    EDIT_ADMIN_ERR: "EDIT_ADMIN_ERR",
    DELETE_ADMIN_BEGIN: "DELETE_ADMIN_BEGIN",
    DELETE_ADMIN_SUCCESS: "DELETE_ADMIN_SUCCESS", 
    DELETE_ADMIN_ERR:"DELETE_ADMIN_ERR",
    getAllAdminsBegin: () => {
        return {
            type:actions.GET_ALL_ADMINS_BEGIN
        }
    },
    getAllAdminsSuccess: (data) => {
        return {
            type: actions.GET_ALL_ADMINS_SUCCESS,
            data
        }
    },
    getAllAdminsError: (data) => {
        return {
            type: actions.GET_ALL_ADMINS_ERR,
            data,
        }
    },
    createNewAdminBegin: () => {
        return {
            type: actions.CREATE_NEW_ADMIN_BEGIN
        }
    },
    createNewAdminSuccess: (data) => {
        return {
            type: actions.CREATE_NEW_ADMIN_SUCCESS,
            data
        }
    },
    createNewAdminError: (err) => {
        return {
            type: actions.CREATE_NEW_AMDIN_ERR,
            err
        }
    },
    editAdminBegin: () => {
        return {
            type:actions.EDIT_ADMIN_BEGIN
        }
    },
    editAdminSuccess: (data) => {
        return {
            type: actions.EDIT_ADMIN_SUCCESS,
            data
        }
    },
    editAdminError: (err) => {
        return {
            type: actions.EDIT_ADMIN_ERR,
           err
        }
    },
    deleteAdminBegin: () => {
        return {
            type:actions.DELETE_ADMIN_BEGIN
        }
    },
    deleteAdminSuccess: (data) => {
        return {
            type: actions.DELETE_ADMIN_SUCCESS,
            data
        }
    },
    deleteAdminError: (err) => {
        return {
            type: actions.DELETE_ADMIN_ERR,
            err
        }
    }


    
}
export default actions