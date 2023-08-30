import React, { useState } from "react";
import { Table, Tag, Space } from "antd";

const CustomTable = ({ columns, data, loading }) => {
  console.log("fsdf", columns, data);
  return (
    <Table
      scroll={{ x: true }}
      columns={columns}
      loading={loading}
      dataSource={data}
    />
  );
};

export default CustomTable;
