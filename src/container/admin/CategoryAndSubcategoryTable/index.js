import { Table } from "antd";
import React, { useState, useEffect } from "react";
import { Button } from "../../../components/buttons/buttons";
import FeatherIcon from "feather-icons-react";
import CustomModal from "../CreateCategory/index";
import { Avatar, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import Confirmation from "../../superadmin/ConfirmationBox/index";
function NestedTable({
  handleEditClick,
  handleDeleteClick,
  showConfirmation,
  cancelDelete,
  deleteCategory,
  setShowSubCategory,
  showSubCategory,
  isLoading,
  Subcategories,
  categories,
  setCategoryName,
  categoryName,
  setParentCatID,
  handleOk,
  handleCancel,
  isModalVisible,
  setIsModalVisible,
  modalType,
  resetValues,
}) {
  const [categoriesFilterList, setCategoriesFilterList] = useState([]);
  const [subCategoriesFilterList, setSubCategoriesFilterList] = useState([]);
  useEffect(() => {
    let list = [];
    let sublist = [];
    categories &&
      categories.map((category) => {
        if (category.is_active === true) {
          list.push({
            text: category.name,
            value: category.name,
          });
        }
        setCategoriesFilterList(list);
      });
    Subcategories &&
      Subcategories.map((item) => {
        if (item.is_active === true) {
          sublist.push({
            text: item.name,
            value: item.name,
          });
        }
        setSubCategoriesFilterList(sublist);
      });
  }, []);
  const expandedRow = (row) => {
    const columns = [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: "50%",
        //   filters: subCategoriesFilterList,
        // filterMultiple: true,
        onFilter: (value, record) => record.category.indexOf(value) === 0,
        sorter: (a, b) => a.category.length - b.category.length,
        sortDirections: ["descend", "ascend"],
      },
      { title: "Icon", dataIndex: "icon", key: "icon", width: "25%" },
      { title: "Action", dataIndex: "action", key: "action", width: "25%" },
    ];
    setParentCatID(row.key);
    const data = [];
    Subcategories &&
      Subcategories.map((category) => {
        if (category.CategoryId === row.key && category.is_active === true) {
          data.push({
            key: category.id,
            category: category.name,
            icon: (
              <Avatar
                src={
                  <Image
                    src={
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAaVBMVEUAd7X///8AcLEEebb7/f4Debb9/v79/v8DeLY8l8Y7lsYAbbCcyuKlz+WQxN+Lwd0KfbiDvdvl8fcAc7O+3OwgiL6x1ehFnMlytNZqsNQZhLzF4O7w9/tSo81gqtGp0ebc7PUsjsJ8udngaOvIAAADg0lEQVRoge2abZeqIBCAGV7EjXItKjc1y/7/j7xD7m5AWHdD+uScs3s8kDzOIMwMDoGrSJ4lEC6H0ckVkUEiyeQPBC+ar+pjcqm+GsQMEAntUSuaQJQ+toZC8F+7U4KJBMKE6ltUwkAqJUgiEapCAJGwpSwVgxBGtyAJh4NKCVEH4AStRZNZC+1F0V5orgXN00FyukBzZekh2XsgbzFXCMIGSQlhTCsjegrMCEQQVXfF8rOrFYm3YxjCdFnw6zbdFkJHr6AgROjdGYAbATjXOlaXEISRcgN88GEZh3NJIuclBBF0BfzXr3EoYve1ACTXPViuOAO+izRYAMLUxVLEqBK7RQcggp48yHJ6SG5cjAWRsI/0A0FN9g6Ew2p6TZhae+a6pDDXwn67UKt++rcL3+Gts072sW4gDOn5L4VjRBa7rwT3LkarDMNvmeEf8EV0tDSyC9O++dZku4uPyEb8CdO6KrbNtvjQOt5rjXnGnGGkrKmibALfP+7jBQ6fs0lCvnHIn4Tlj2KBsTkJX4cGYgLH1yiD8n+A/LcgACevrHe7ujRXQYXCEFHaIsLNZjgMnMrjstm0nLebZnXodSi6Cbvfz3Zzk3Y97I/ozOxmE2Dkql5vnCS0OQbe+WAgoZbOjcUPpLBbeU0I7dprZi4xlZYyM8ENNP3d6h2DcPkj/Ab5vDVjkllrgg/DpfNA+HN59D3DKMTahW3ILbxoa3Ru/D75x59Uni6vQ3hZOL7N8j9+ePMqRMLmACNnGHce6FUItrcgA4ThCdwU9HUIjDLuVImAjB/4+EFnjCZXba6xv/SU8oLOOEhmvQgu5GRPShQER25Pl667nFrXeBmc7ZUSA8FxLyU1mSWtTw7Fm5S4ia/Ud5KsnVtM34dlrwiIxNkV31ZhhG1sXTh01sy/DkG7W55SqC9npcLXJBBvHEzPLFU4rCeBgBeHs7MDKaaA4A5ZWggvdXKzs5chGTSOn2XKTZlX02jiJnnGOU8O8ZO8u146CWTpQdYzZIbMkBkyQ2bIDJkhA+QmDsRqDkCs3tXTqH4FtiyDxx6BkMiW/ZO4K6eH/eom+27oy2nnNB+8DPfo9j5JgswBk/PVnj1sfnzTKMScPVpf7fMnzU97JzqDfCxvhMxfsf8Ake8pX3hLIUbqkhJtSkpSF8ccTXGMKSXqk5f5vKVg6Xpkkbz06j1FZJC6HO4fbRVnSvd35FUAAAAASUVORK5CYII="
                    }
                  />
                }
              />
            ),
            action: (
              <>
                <Button
                  type="primary"
                  shape="circle"
                  onClick={() => handleEditClick(category, true)}
                  icon={<EditOutlined />}
                  size={"small"}
                />
                <Button
                  type="primary"
                  style={{ marginLeft: 5 }}
                  onClick={() => handleDeleteClick(category.id, true)}
                  shape="circle"
                  icon={<DeleteOutlined />}
                  size={"small"}
                />
              </>
            ),
          });
        }
      });

    return (
      <div style={{ marginBottom: "50px" }}>
        <CustomModal
          resetValues={resetValues}
          title={
            modalType === "edit" ? "Edit Category" : "Create a new Category"
          }
          setCategoryName={setCategoryName}
          categoryName={categoryName}
          categories={categories}
          isSubCategory={true}
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />

        <div style={{ float: "right" }}>
          <Button
            size="small"
            key="4"
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
              setShowSubCategory(true);
            }}
          >
            <FeatherIcon icon="plus" size={14} />
            SubCategory
          </Button>
        </div>
        {data.length > 0 ? (
          <Table
            scroll={{ x: true }}
            loading={isLoading}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        ) : (
          <center>
            <p>No SubCategory found.</p>
          </center>
        )}
      </div>
    );
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: categoriesFilterList,
      width: "50%",
      filterMultiple: true,
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ["descend", "ascend"],
    },
    { title: "Icon", dataIndex: "icon", key: "icon", width: "25%" },
    { title: "Action", dataIndex: "action", key: "action", width: "25%" },
  ];
  const data = [];
  categories &&
    categories.map((category) => {
      category.is_active === true &&
        data.push({
          key: category.id,
          category: category.name,
          icon: (
            <Avatar
              src={
                <Image
                  src={
                    "data:image/png;base64,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"
                  }
                />
              }
            />
          ),
          action: (
            <>
              <Button
                type="primary"
                shape="circle"
                onClick={() => handleEditClick(category, false)}
                icon={<EditOutlined />}
                size={"small"}
              />
              <Button
                style={{ marginLeft: 5 }}
                type="primary"
                onClick={() => handleDeleteClick(category.id, false)}
                shape="circle"
                icon={<DeleteOutlined />}
                size={"small"}
              />
            </>
          ),
        });
    });
  return (
    <>
      <Confirmation
        isModalVisible={showConfirmation}
        handleOk={deleteCategory}
        handleCancel={cancelDelete}
        title="Delete Category"
        message={"Do you want to delete ?"}
      />

      <Table
        className="components-table-demo-nested"
        tableLayout="fixed"
        columns={columns}
        expandedRowRender={expandedRow}
        dataSource={data}
        scroll={{ x: true }}
        loading={isLoading}
      />
    </>
  );
}

export default NestedTable;
