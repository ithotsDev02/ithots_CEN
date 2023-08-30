import React, { useState, useEffect } from 'react';
import { Row, Col, Table} from 'antd';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Button } from '../../../components/buttons/buttons';
import { Button, Radio } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined} from '@ant-design/icons';
import Confirmation from '../ConfirmationBox/index'


const DataTables = ({
  handleEditClick,
  handleDeleteClick,
  showConfirmation,
  cancelDelete,
  deleteUser,
  admins,
  isLoading,
}) => {
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
  });
  const [tblData, settblData] = useState([])
  const [cols, setCols] = useState([])
  useEffect(() => {
    let dataSource = []
    admins&&admins.map(admin => {
      let tmp = {
      key: admin.id,
      name: admin.first_name+' '+admin.last_name,
      email: admin.email,
      password: admin.password,
      phonenumber:admin.mobile,
        editremove: <>
          <Button type="primary" shape="circle" onClick={() => handleEditClick(admin)} icon={<EditOutlined />} size={'small'} />
          <Button style={{marginLeft:'5px'}} type="primary" onClick={() => handleDeleteClick(admin.id)} shape="circle" icon={<DeleteOutlined />} size={'small'} />
        </>
      }
      dataSource.push(tmp);
    })
    let filterObj = []
    admins && admins.map(admin => {
      let tmp = {
          text: admin.first_name+' '+admin.last_name,
          value: admin.first_name+' '+admin.last_name,
      }  
      filterObj.push(tmp)
        })
      let data =[{
        title: 'Name',
        dataIndex: 'name',
        filters: filterObj,
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
      },
       {
      title: 'Email',
      dataIndex: 'email',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.email - b.email,
    },{
      title: 'Password',
      dataIndex: 'password',
     
    },
       {
      title: 'PhoneNo',
      dataIndex: 'phonenumber',
     
    }, {
      title: 'Actions',
      dataIndex: 'editremove',
      
    }
      ]
    setCols(data)
    settblData(dataSource)
  },[admins])
  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }
  return (
    <>
        <Row >
        <Col xs={24}>
          <Confirmation isModalVisible={showConfirmation}
            handleOk={ deleteUser } handleCancel = { cancelDelete} title="Delete User" message={ "Do you want to delete this user ?"}/>
            <Cards title="List of Admins">
              <Table
                className="table-responsive"
                loading={isLoading}
                pagination={{
                  defaultPageSize: 10,
                  total: tblData.length,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
                columns={cols}
                dataSource={tblData}
                onChange={onChange}
              />
            </Cards>
          </Col>
        
        </Row>
    </>
  );
};

export default DataTables;
