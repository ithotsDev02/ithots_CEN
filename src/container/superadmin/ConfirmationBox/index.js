import React from 'react';
import {  Modal } from 'antd';
import {  Space } from 'antd';

const Confirmation = ({
    isModalVisible,
    handleOk,
  handleCancel,
  title,
 message,
    
}) => {
  return (
      <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Space direction="vertical">
              <p>{ message}</p>
      
    
  </Space>
      
      </Modal>
  );
};
export default Confirmation