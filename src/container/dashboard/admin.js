// --Lokesh
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import FeatherIcon from "feather-icons-react";
import { PageHeader } from "../../components/page-headers/page-headers";
import { Cards } from "../../components/cards/frame/cards-frame";
import { Button } from "../../components/buttons/buttons";
import { Main } from "../styled";
import { ShareButtonPageHeader } from "../../components/buttons/share-button/share-button";
import { ExportButtonPageHeader } from "../../components/buttons/export-button/export-button";
import { CalendarButtonPageHeader } from "../../components/buttons/calendar-button/calendar-button";
import NestedTable from "../admin/CategoryAndSubcategoryTable/index";
import CustomModal from "../admin/CreateCategory/index";
import {
  getCategories,
  createCategory,
  createSubCategory,
  getSubCategories,
  editCategory,
  editSubCategory,
  deleteCategory,
  deleteSubCategory,
} from "../../redux/categories/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";

const Dashboard = () => {
  const [state, setState] = useState({
    flag: "english",
    username: localStorage.getItem("username"),
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDeleteConf, setShowDeleteConf] = useState(false);
  const [modalType, setModalType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [icons, setIcons] = useState([]);
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState({});
  const [selectedCategoryType, setSelectedCategoryType] = useState("");
  const [parentCatID, setParentCatID] = useState("");
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState("");
  const isLoading = useSelector((state) => state.categories.loading);
  const categories = useSelector((state) => state.categories.categories?.data);
  const Subcategories = useSelector(
    (state) => state.categories.subCategories?.data
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, []);
  const handleOk = () => {
    if (isEditMode === false) {
      let data = {};
      if (selectedCategoryType === "category") {
        if (categoryName !== "") {
          data = {
            name: categoryName,
            order: 1,
            is_active: true,
          };
          dispatch(createCategory(data));
        } else {
          alert("Category name can not be empty");
        }
      } else {
        if (categoryName !== "" && parentCatID !== "") {
          data = {
            name: categoryName,
            order: 1,
            categoryId: parentCatID,
            is_active: true,
          };
          dispatch(createSubCategory(data));
        } else {
          alert("Category name can not be empty");
        }
      }
    } else {
      let data = {
        id: selectedCategoryInfo.key,
        name: categoryName,
      };
      selectedCategoryType === "category"
        ? dispatch(editCategory(selectedCategoryInfo.id, data))
        : dispatch(editSubCategory(selectedCategoryInfo.id, data));
    }
    setIsModalVisible(false);
    setIsEditMode(false);
    setCategoryName("");
    setIcons([]);
    setSelectedCategoryInfo({});
    setSelectedCategoryType("");
    setParentCatID("");
    setSubCategoryName("");
    setModalType("");
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    resetValues();
  };
  const resetValues = () => {
    console.log("triggered rfeset");
    setCategoryName("");
    setIcons([]);
    setSelectedCategoryInfo({});
    setSelectedCategoryType("");
    setIsEditMode(false);
    setParentCatID("");
    setSubCategoryName("");
    setModalType("");
  };
  const cancelDelete = () => {
    setShowDeleteConf(false);
    setSelectedCatId("");
  };
  const removeCategory = () => {
    let data = { is_active: false };
    if (selectedCategoryType === "category") {
      dispatch(deleteCategory(selectedCatId, data));
    } else {
      dispatch(deleteSubCategory(selectedCatId, data));
    }

    setShowDeleteConf(false);
    setSelectedCatId("");
  };
  const handleEditClick = (categoryInfo, isSubCategory) => {
    if (isSubCategory) {
      setShowSubCategory(true);
    }
    setIsEditMode(true);
    setCategoryName(categoryInfo.name);
    setSelectedCategoryInfo(categoryInfo);
    setSelectedCategoryType(isSubCategory ? "subcategory" : "category");
    setIsModalVisible(true);
    setModalType("edit");
  };
  const handleDeleteClick = (key, isSubCategory) => {
    setSelectedCatId(key);
    setSelectedCategoryType(isSubCategory ? "subcategory" : "category");
    setShowDeleteConf(true);
  };

  return (
    <div style={{ marginTop: "-5%" }}>
      <PageHeader
        ghost
        title="Categories List"
        buttons={[
          <div key="6" className="page-header-actions">
            <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" />
            <Button
              size="small"
              key="4"
              type="primary"
              onClick={() => {
                setSelectedCategoryType("category");
                setIsEditMode(false);
                setIsModalVisible(true);
                setShowSubCategory(false);
              }}
            >
              <FeatherIcon icon="plus" size={14} />
              Add Category
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
              <div style={{ minHeight: "calc(100vh - 320px)" }}>
                {/* <h2>Welcome, {state.username}</h2> */}
                {/* <h2>Categories List</h2> */}

                <CustomModal
                  subCategoryName={subCategoryName}
                  setSubCategoryName={setSubCategoryName}
                  setCategoryName={setCategoryName}
                  setIcons={setIcons}
                  categoryName={categoryName}
                  icons={icons}
                  title={
                    modalType === "edit"
                      ? "Edit Category"
                      : "Create a new Category"
                  }
                  isSubCategory={showSubCategory}
                  isModalVisible={isModalVisible}
                  handleOk={handleOk}
                  resetValues={resetValues}
                  handleCancel={handleCancel}
                />
                <NestedTable
                  handleOk={handleOk}
                  modalType={modalType}
                  handleCancel={handleCancel}
                  isModalVisible={isModalVisible}
                  setIsModalVisible={setIsModalVisible}
                  resetValues={resetValues}
                  setParentCatID={setParentCatID}
                  isLoading={isLoading}
                  Subcategories={Subcategories}
                  categories={categories}
                  setCategoryName={setCategoryName}
                  categoryName={categoryName}
                  deleteCategory={removeCategory}
                  cancelDelete={cancelDelete}
                  setShowSubCategory={setShowSubCategory}
                  showSubCategory={showSubCategory}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                  showConfirmation={showDeleteConf}
                />
              </div>
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default Dashboard;
