const actions = {
    GET_CATEGORIES_BEGIN: "GET_CATEGORIES_BEGIN",
    GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
    GET_CATEGORIES_ERR: "GET_CATEGORIES_ERR",
    CREATE_CATEGORY_BEGIN:"CREATE_CATEGORY_BEGIN",
    CREATE_CATEGORY_SUCCESS:"CREATE_CATEGORY_SUCCESS",
    CREATE_CATEGORY_ERR: "CREATE_CATEGORY_ERR",
    GET_SUBCATEGORIES_BEGIN: "GET_SUBCATEGORIES_BEGIN",
    GET_SUBCATEGORIES_SUCCESS: "GET_SUBCATEGORIES_SUCCESS",
    GET_SUBCATEGORIES_ERR: "GET_SUBCATEGORIES_ERR",
    CREATE_SUBCATEGORIES_BEGIN:"CREATE_SUBCATEGORIES_BEGIN",
    CREATE_SUBCATEGORIES_SUCCESS:"CREATE_SUBCATEGORIES_SUCCESS",
    CREATE_SUBCATEGORIES_ERR: "CREATE_SUBCATEGORIES_ERR",
    EDIT_CATEGORY_BEGIN: "EDIT_CATEGORY_BEGIN",
    EDIT_CATEGORY_SUCCESS: "EDIT_CATEGORY_SUCCESS",
    EDIT_CATEGORY_ERR: "EDIT_CATEGORY_ERR",
    DELETE_CATEGORY_BEGIN:"DELETE_CATEGORY_BEGIN",
    DELETE_CATEGORY_SUCCESS:"DELETE_CATEGORY_SUCCESS",
    DELETE_CATEGORY_ERR: "DELETE_CATEGORY_ERR",
    EDIT_SUBCATEGORIES_BEGIN: "EDIT_SUBCATEGORIES_BEGIN",
    EDIT_SUBCATEGORIES_SUCCESS: "EDIT_SUBCATEGORIES_SUCCESS",
    EDIT_SUBCATEGORIES_ERR: "EDIT_SUBCATEGORIES_ERR",
    DELETE_SUBCATEGORIES_BEGIN:"DELETE_SUBCATEGORIES_BEGIN",
    DELETE_SUBCATEGORIES_SUCCESS:"DELETE_SUBCATEGORIES_SUCCESS",
    DELETE_SUBCATEGORIES_ERR: "DELETE_SUBCATEGORIES_ERR",
    getCategoriesBegin: () => {
      return {
        type: actions.GET_CATEGORIES_BEGIN,
      };
    },
    getCategoriesSuccess: (data) => {
      return {
        type: actions.GET_CATEGORIES_SUCCESS,
        data,
      };
    },
    getCategoriesErr: (err) => {
      return {
        type: actions.GET_CATEGORIES_ERR,
        err,
      };
    },
    createCategoryBegin: () => {
        return {
          type:actions.CREATE_CATEGORY_BEGIN
      }
    },
    createCategorySuccess:(data)=> {
    return {
        type: actions.CREATE_CATEGORY_SUCCESS,
        data
    }
    },
    createCategoryError: (err) => {
        return {
            type: actions.CREATE_CATEGORY_ERROR,
            err,
        }
    },
    getSubCategoriesBegin: () => {
    return {
      type: actions.GET_SUBCATEGORIES_BEGIN,
    };
    },
    getSubCategoriesSuccess: (data) => {
      return {
        type: actions.GET_SUBCATEGORIES_SUCCESS,
        data,
      };
    },
    getSubCategoriesErr: (err) => {
      return {
        type: actions.GET_SUBCATEGORIES_ERR,
        err,
      };
    },
    createSubCategoryBegin: () => {
        return {
          type:actions.CREATE_SUBCATEGORIES_BEGIN
      }
    },
    createSubCategorySuccess:(data)=> {
    return {
        type: actions.CREATE_SUBCATEGORIES_SUCCESS,
        data
    }
    },
    createSubCategoryError: (err) => {
        return {
            type: actions.CREATE_SUBCATEGORIES_ERROR,
            err,
        }
    },
    editCategoryBegin: () => {
        return {
          type:actions.EDIT_CATEGORY_BEGIN
      }
    },
    editCategorySuccess:(data)=> {
    return {
        type: actions.EDIT_CATEGORY_SUCCESS,
        data
    }
    },
    editCategoryError: (err) => {
        return {
            type: actions.EDIT_CATEGORY_ERROR,
            err,
        }
    },
    deleteCategoryBegin: () => {
        return {
          type:actions.DELETE_CATEGORY_BEGIN
      }
    },
    deleteCategorySuccess:(data)=> {
    return {
        type: actions.DELETE_CATEGORY_SUCCESS,
        data
    }
    },
    deleteCategoryError: (err) => {
        return {
            type: actions.DELETE_CATEGORY_ERROR,
            err,
        }
    },
    editSubCategoryBegin: () => {
        return {
          type:actions.EDIT_SUBCATEGORIES_BEGIN
      }
    },
    editSubCategorySuccess:(data)=> {
    return {
        type: actions.EDIT_SUBCATEGORIES_SUCCESS,
        data
    }
    },
    editSubCategoryError: (err) => {
        return {
            type: actions.EDIT_SUBCATEGORIES_ERROR,
            err,
        }
    },
    deleteSubCategoryBegin: () => {
        return {
          type:actions.DELETE_SUBCATEGORIES_BEGIN
      }
    },
    deleteSubCategorySuccess:(data)=> {
    return {
        type: actions.DELETE_SUBCATEGORIES_SUCCESS,
        data
    }
    },
    deleteSubCategoryError: (err) => {
        return {
            type: actions.DELETE_SUBCATEGORIES_ERROR,
            err,
        }
    }
 
};

export default actions;
