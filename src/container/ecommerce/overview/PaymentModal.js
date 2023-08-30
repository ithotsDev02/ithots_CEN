import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Tooltip, Space, Typography } from "antd";
import { Form, Input, Select } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
function PaymentModal({
  isModalVisible,
  setcardno,
  setexpiry,
  setcvv,
  setname,
  handleok,
  handlecancel,
}) {
  //   const handleOk = () => {
  //     setIsModalVisible(false);
  //   };

  //   const handleCancel = () => {
  //     setIsModalVisible(false);
  //   };
  function onChange(date, dateString) {
    console.log(moment(date).format("MM"), dateString);
    setexpiry(date);
  }

  return (
    <>
      <Modal
        destroyOnClose={true}
        // onCancel={handlecancel}
        closable={false}
        title="Make Payment"
        visible={isModalVisible}
        footer={[
          <Button key="back" onClick={handlecancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleok}>
            Make Payment
          </Button>,
        ]}
      >
        <div>
          <Form
            name="complex-form"
            // onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="Card Number">
              <Space>
                <Form.Item
                  name="cardno"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Card Number is required",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="4444-3333-2222-1111"
                    onChange={(e) => setcardno(e.target.value)}
                  />
                </Form.Item>
                <Tooltip title="Useful information">
                  <Typography.Link href="#API">Need Help?</Typography.Link>
                </Tooltip>
              </Space>
            </Form.Item>
            <Form.Item
              label="Card Expiry"
              name="month"
              rules={[{ required: true, message: "Expiry is required" }]}
            >
              <DatePicker onChange={onChange} picker="month" />
            </Form.Item>
            <Form.Item label="CVV" name="cvv" rules={[{ required: true }]}>
              <Input
                onChange={(e) => setcvv(e.target.value)}
                placeholder="232"
              />
            </Form.Item>{" "}
            <Form.Item
              label="Card holder name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => setname(e.target.value)}
                placeholder="Sham"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default PaymentModal;
