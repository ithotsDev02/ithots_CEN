import actions from "./actions";
import axiosInstance from "../../config/axoisconfig";
import errorNotification from "../../components/notification/errorNotification";
import successNotification from "../../components/notification/successNotification";
axiosInstance.defaults.headers.common["xaccesstoken"] = `${localStorage.getItem(
  "token"
) || ""}`;
const {
  getCategoriesBegin,
  getCategoriesSuccess,
  getCategoriesErr,
  createCategoryBegin,
  createCategorySuccess,
  createCategoryError,
  getSubCategoriesBegin,
  getSubCategoriesSuccess,
  getSubCategoriesErr,
  createSubCategoryBegin,
  createSubCategorySuccess,
  createSubCategoryError,
  editCategoryBegin,
  editCategorySuccess,
  editCategoryError,
  deleteCategoryBegin,
  deleteCategorySuccess,
  deleteCategoryError,
  editSubCategoryBegin,
  editSubCategorySuccess,
  editSubCategoryError,
  deleteSubCategoryBegin,
  deleteSubCategorySuccess,
  deleteSubCategoryError,
} = actions;
const getCategories = () => {
  return async (dispatch) => {
    let url = "https://api-v2.esculae.com/api/v1/course/category";
    dispatch(getCategoriesBegin());
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          return dispatch(getCategoriesSuccess(resp.data));
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in loading categories");
        dispatch(getCategoriesErr(err));
      });
  };
};
const createCategory = (categoryData) => {
  return async (dispatch) => {
    dispatch(createCategoryBegin());

    let url = "https://api-v2.esculae.com/api/v1/course/category";
    axiosInstance
      .post(url, JSON.stringify(categoryData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(createCategorySuccess(resp.data));
          dispatch(getCategories());
          // return dispatch(createCategorySuccess(resp.data));
        }, 1000);
      })

      .catch((err) => {
        errorNotification("Error in creating category");
        dispatch(createCategoryError(err));
      });
  };
};
const getSubCategories = () => {
  return async (dispatch) => {
    dispatch(getSubCategoriesBegin());
    let url = "https://api-v2.esculae.com/api/v1/course/sub-category";
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          return dispatch(getSubCategoriesSuccess(resp.data));
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in loading sub categories");
        dispatch(getSubCategoriesErr(err));
      });
  };
};
const createSubCategory = (categoryData) => {
  return async (dispatch) => {
    let url = "https://api-v2.esculae.com/api/v1/course/sub-category";
    dispatch(createSubCategoryBegin());
    axiosInstance
      .post(url, JSON.stringify(categoryData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(getSubCategories());
          dispatch(createSubCategorySuccess(resp.data));
        }, 1000);
      })

      .catch((err) => {
        errorNotification("Error in creating sub categories");
        dispatch(createSubCategoryError(err));
      });
  };
};
const editCategory = (id, categoryData) => {
  return async (dispatch) => {
    dispatch(editCategoryBegin());
    let url = "https://api-v2.esculae.com/api/v1/course/category/" + id;
    axiosInstance
      .put(url, JSON.stringify(categoryData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(getCategories());
          dispatch(editCategorySuccess(resp.data));
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in edit categories");
        dispatch(editCategoryError(err));
      });
  };
};
const editSubCategory = (id, categoryData) => {
  return async (dispatch) => {
    dispatch(editSubCategoryBegin());

    let url = "https://api-v2.esculae.com/api/v1/course/sub-category/" + id;
    axiosInstance
      .put(url, JSON.stringify(categoryData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTimeout(() => {
          dispatch(getSubCategories());
          dispatch(editSubCategorySuccess(resp.data));
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in editing sub categories");
        dispatch(editSubCategoryError(err));
      });
  };
};
const deleteCategory = (id, categoryData) => {
  return async (dispatch) => {
    let url = "https://api-v2.esculae.com/api/v1/course/category/" + id;
    axiosInstance
      .put(url, JSON.stringify(categoryData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        dispatch(deleteCategoryBegin());
        setTimeout(() => {
          dispatch(getCategories());
          dispatch(deleteCategorySuccess(resp.data));
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in deleting categories");
        dispatch(deleteCategoryError(err));
      });
  };
};
const deleteSubCategory = (id, categoryData) => {
  console.log("dasdadafadfsadsdfae", id, categoryData);

  return async (dispatch) => {
    dispatch(deleteSubCategoryBegin());
    let url = "https://api-v2.esculae.com/api/v1/course/sub-category/" + id;
    axiosInstance
      .put(url, JSON.stringify(categoryData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log("api reasasdasdad", resp.data);
        setTimeout(() => {
          dispatch(getSubCategories());
          dispatch(deleteSubCategorySuccess(resp.data));
        }, 1000);
      })
      .catch((err) => {
        errorNotification("Error in deleting sub categories");
        dispatch(deleteSubCategoryError(err));
      });
  };
};

export {
  getCategories,
  createCategory,
  getSubCategories,
  createSubCategory,
  editCategory,
  editSubCategory,
  deleteCategory,
  deleteSubCategory,
};
