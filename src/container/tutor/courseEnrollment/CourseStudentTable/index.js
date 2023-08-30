import React from "react";
import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FigureCart, ProductTable } from "../../../ecommerce/Style";

function CourseStudentTable({ courses, courseColumns, expandedRow }) {
  return (
    <Table
      className="components-table-demo-nested"
      tableLayout="fixed"
      scroll={{ x: true }}
      columns={courseColumns}
      expandedRowRender={expandedRow}
      dataSource={courses}
    />
  );
}

export default CourseStudentTable;
