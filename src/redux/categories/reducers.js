import actions from "./actions";

const {
  GET_CATEGORIES_BEGIN,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERR,
  CREATE_CATEGORY_BEGIN,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERR,
  GET_SUBCATEGORIES_BEGIN,
  GET_SUBCATEGORIES_SUCCESS,
  GET_SUBCATEGORIES_ERR,
  CREATE_SUBCATEGORIES_BEGIN,
  CREATE_SUBCATEGORIES_SUCCESS,
  CREATE_SUBCATEGORIES_ERR,
  EDIT_CATEGORY_BEGIN,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_ERR,
  DELETE_CATEGORY_BEGIN,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERR,
  EDIT_SUBCATEGORIES_BEGIN,
  EDIT_SUBCATEGORIES_SUCCESS,
  EDIT_SUBCATEGORIES_ERR,
  DELETE_SUBCATEGORIES_BEGIN,
  DELETE_SUBCATEGORIES_SUCCESS,
  DELETE_SUBCATEGORIES_ERR,
    
} = actions;

const initState = {
  categories: {},
  subCategories:{},
  loading: false,
  error: null,
  creationResponse: {},
  editResponse: {},
  deleteResponse: {},
    
};

/**
 *
 * @todo impure state mutation/explaination
 */
const CategoryReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case GET_CATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: data,
        loading: false,
      };
    case GET_CATEGORIES_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CREATE_CATEGORY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        creationResponse: data,
        loading: false,
      };
    case CREATE_CATEGORY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_SUBCATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_SUBCATEGORIES_SUCCESS:
          return {
        ...state,
        subCategories: data,
        loading: false,
      };
    case GET_SUBCATEGORIES_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CREATE_SUBCATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        creationResponse: data,
        loading: false,
      };
    case CREATE_SUBCATEGORIES_ERR:
         return {
        ...state,
        error: err,
        loading: false,
         };
    case EDIT_CATEGORY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        editResponse: data,
        loading: false,
      };
    case EDIT_CATEGORY_ERR:
         return {
        ...state,
        error: err,
        loading: false,
         };
    case DELETE_CATEGORY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteResponse: data,
        loading: false,
      };
    case DELETE_CATEGORY_ERR:
         return {
        ...state,
        error: err,
        loading: false,
      };
    case EDIT_SUBCATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EDIT_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        editResponse: data,
        loading: false,
      };
    case EDIT_SUBCATEGORIES_ERR:
         return {
        ...state,
        error: err,
        loading: false,
         };
    case DELETE_SUBCATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        deleteResponse: data,
        loading: false,
      };
    case DELETE_SUBCATEGORIES_ERR:
         return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default CategoryReducer;
