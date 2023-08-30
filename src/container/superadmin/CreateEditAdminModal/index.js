import React, { useEffect} from 'react';
import { Modal } from 'antd';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Button, Checkbox } from 'antd';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const CustomModal = ({
  selectedUserFirstname,
  selectedUserLastname,
  selectedUserPhonenumber,
  modalType,
  isModalVisible,
  handleOk,
  handleCancel,
  title,
  Firstname,
  Lastname,
  phone,
  email,
  password,
  setFirstname,
  setLastname,
  setPhone,
  setEmail,
  setPassword,
  resetValues,
}) => {
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      afterClose={resetValues}
      destroyOnClose={true}
    >
      <Space direction="vertical">
        <Form
      {...layout}
      name="basic"
        >
           <Form.Item
            label="First Name"
            name="firstame"
            initialValue={ Firstname && Firstname}
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input  value="Firstname" onChange={e => setFirstname(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
            initialValue={Lastname && Lastname}
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
             <Input value ={Lastname} onChange={ e => setLastname(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            initialValue={email}
            rules={[{ required: true, message: 'Please input email!' }]}
          >
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label="Phone No"
            name="phone"
            initialValue={phone}
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input type="number" value={phone} onChange={e => setPhone(e.target.value)}/>
            </Form.Item>
              {/* <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
          placeholder="Enter password"
          allowClear={true}
              bordered={true}
              value={password}
              onChange={e => setPassword(e.target.value)}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
      </Form.Item> */}

    </Form>
      
    
  </Space>
      
      </Modal>
  );
};
export default CustomModal