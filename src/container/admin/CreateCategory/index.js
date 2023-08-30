import React from 'react';
import { Modal } from 'antd';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Button, Checkbox } from 'antd';
import { Select } from 'antd';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
function handleChange(value) {
  console.log(`selected ${value}`);
}
const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'error',
  },
];
const CustomModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  title,
  isSubCategory,
  resetValues,
  setCategoryName,
  setIcons,
  categoryName,
  icons,
  subCategoryName,
  setSubCategoryName,
  categories,

}) => {
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      afterClose={resetValues}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}

    >
      <Space direction="vertical">
           <Form
              labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
        size={'large'}
      name="basic"
        >
           <Form.Item
        label="Category Name"
        name="categoryname"
        rules={[{ required: true, message: 'Please input category name!' }]}
          >
            <Input defaultValue={categoryName} size={'medium'} onChange={(e) => setCategoryName(e.target.value)} value={categoryName}
             />
      </Form.Item>
          {/* {
            isSubCategory && (
                <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select category!' }]}
          >
                <Select style={{ width: 120 }} value={subCategoryName} onChange={(value) => setSubCategoryName(value)}>
                  {
                    categories && categories.map(category => (
                      <Option value={category.id}>{category.name}</Option>
                    ))
                  }
     
    </Select>
            </Form.Item>
            )
            } */}
            
            
          <Form.Item  label="Upload Logo"
        name="logo">
           
    <Upload
           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            className="upload-list-inline"
              defaultFileList={[...fileList]}
    >
      <Button icon={<UploadOutlined />}>Select</Button>
    </Upload>
          </Form.Item> 
            

    </Form>
  </Space>
      
      </Modal>
  );
};
export default CustomModal