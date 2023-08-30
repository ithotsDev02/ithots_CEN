import React, { useState } from 'react';
import { Row, Col, Table, Radio, Divider } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
// import UserListTable from '../pages/overview/UserTable';
// import ProjectLists from '../project/overview/List';
// import TaskList from '../project/overview/TaskList';
// import { TaskLists } from '../project/style';

const DataTables = () => {
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
  });
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const columnsSort = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const dataSort = [
    {
      key: '1',
      name: 'John Brown',
      email: "jhon@google.com",
      password: 'dsada324234nkj23ij4bx2xb4i3b4x14',
    },
    {
      key: '2',
      name: 'Jim Green',
       email: "Jim@google.com",
      password: 'dJimsada324234nkj23ij4bx2xb4i3b4x14',
    },
    {
      key: '3',
      name: 'Joe Black',
      email: "Joe@google.com",
      password: 'dsJiJoemada324234nkj23ij4bx2xb4i3b4x14',
    },
    {
      key: '4',
      name: 'Jim Red',
      email: "Red@google.com",
      password: 'dsJiJosdademada324234nkj23ij4bx2xb4i3b4x14',
    },
    {
      key: '5',
      name: 'Jim Blue',
          email: "Blue@google.com",
      password: 'dsJiJoemadsdasda324234nkj23ij4bx2xb4i3b4x14',
    },
    {
      key: '6',
      name: 'Jim Silver',
         email: "Silver@google.com",
      password: 'dsJiJodasdemada324234nkj23ij4bx2xb4i3b4x14',
    },
    {
      key: '7',
      name: 'Jim White',
          email: "White@google.com",
      password: 'dsJiJoemada324234nkj23ij4bx2xb4i3b4x14',
    },
    {
      key: '8',
      name: 'Jim Orange',
         email: "Orange@google.com",
      password: 'dsJiJoemada32adasdsad4234nkj23ij4bx2xb4i3b4x14',
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  return (
    <>
        <Row >
          <Col xs={24}>
            <Cards title="List of Admins">
              <Table
                className="table-responsive"
                pagination={{
                  defaultPageSize: 3,
                  total: dataSort.length,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
                columns={columnsSort}
                dataSource={dataSort}
                onChange={onChange}
              />
            </Cards>
          </Col>
        
        </Row>
    </>
  );
};

export default DataTables;
