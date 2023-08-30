import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cards } from "../../components/cards/frame/cards-frame";
import errorNotification from "../../components/notification/errorNotification";

import { Main, BasicFormWrapper } from "../styled";
import { Form, Row, Col, Input, Button, Checkbox, Spin } from "antd";
import {
  saveBankInformation,
  getBankInformation,
  updateBankInformation,
} from "../../redux/tutor/actionCreator";
import "./index.css";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function BankDetails() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [bankDetails, setBankDetails] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [type, setType] = useState("");
  useEffect(() => {
    dispatch(
      getBankInformation(
        localStorage.getItem("currentUserInfo"),
        setBankDetails,
        setisLoading
      )
    );
  }, []);

  useEffect(() => {
    if (Object.keys(bankDetails).length > 0) {
      form.setFieldsValue({
        holdername: bankDetails.accountHolderName,
        bankname: bankDetails.bankName,
        accountnumber: bankDetails.accountNo,
        confaccountnumber: bankDetails.accountNo,
        branch: bankDetails.branchName,
        Ifsc: bankDetails.ifscCode,
        upi: bankDetails.upi,
        mmid: bankDetails.mmid,
      });
      setType("put");
    } else {
      setType("post");
    }
  }, [bankDetails]);
  const onFinish = (values) => {
    if (values.accountnumber === values.confaccountnumber) {
      let data = {
        accountHolderName: values.holdername,
        bankName: values.bankname,
        accountNo: values.accountnumber,
        branchName: values.branch,
        ifscCode: values.Ifsc,
        upi: values.upi,
        mmid: values.mmid,
      };
      if (Object.keys(bankDetails).length > 0) {
        dispatch(
          updateBankInformation(
            data,
            bankDetails.id,
            setBankDetails,
            setisLoading
          )
        );
      } else {
        dispatch(saveBankInformation(data, setBankDetails, setisLoading));
      }
      console.log("Success:", values);
    } else {
      errorNotification(
        "Please re-confirm your bank account number, it does not match"
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Main>
    
      <Cards title="Bank Account Information">
        {isLoading ? (
          <Col xs={24}>
            <div className="spin">
              <Spin />
            </div>
          </Col>
        ) : (
          <Form
            style={{ marginLeft: "20%", marginRight: "20%", marginTop: "2%" }}
            //   {...layout}
            form={form}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >










            <Row gutter={25}>
              <Col  sm={24} xs={24} md={12} lg={12} xxl={12}>
                <Form.Item
                  label="Account Holder's Name"
                  name="holdername"
                  rules={[
                    {
                      required: true,
                      message: "Please input your bank account holder name!",
                    },
                  ]}
                >
                  <Input placeholder="Sham" />
                </Form.Item>
              </Col>
              <Col  sm={24} xs={24} md={12} lg={12} xxl={12}>
                <Form.Item
                  label="Bank Name"
                  name="bankname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your bank name!",
                    },
                  ]}
                >
                  <Input placeholder="HDFC, ICICI, etc" />
                </Form.Item>
              </Col>
            </Row>




            <Row gutter={25}>
              <Col  sm={24} xs={24} md={12} lg={12} xxl={12}>
              <Form.Item
              label="Account No."
              name="accountnumber"
              rules={[
                {
                  required: true,
                  message: "Please input your account number!",
                },
              ]}
            >
              <Input.Password placeholder="XXXXXXXXXXXXXXXX" />
            </Form.Item>
              </Col>
              <Col sm={24} xs={24} md={12} lg={12} xxl={12}>
              <Form.Item
              label="Confirm Account No."
              name="confaccountnumber"
              rules={[
                {
                  required: true,
                  message: "Please Confirm account number account number!",
                },
              ]}
            >
              <Input placeholder="XXXXXXXXXXXXXXXX" />
            </Form.Item>
              </Col>
            </Row>




           
           




            <Row gutter={25}>
              <Col  sm={24} xs={24} md={12} lg={12} xxl={12}>
                <Form.Item
                  label="Branch"
                  name="branch"
                  rules={[
                    {
                      required: true,
                      message: "Please input your account branch!",
                    },
                  ]}
                >
                  <Input placeholder="Powai" />
                </Form.Item>
              </Col>
              <Col  sm={24} xs={24} md={12} lg={12} xxl={12}>
                <Form.Item
                  label="IFSC Code"
                  name="Ifsc"
                  rules={[
                    {
                      required: true,
                      message: "Please input your IFSC!",
                    },
                  ]}
                >
                  <Input placeholder="ICIC00023" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col  sm={24} xs={24} md={12} lg={12} xxl={12}>
                <Form.Item label="UPI" name="upi">
                  <Input placeholder="abc@ybl.com" />
                </Form.Item>
              </Col>
              <Col  sm={24} xs={24} md={12} lg={12} xxl={12}>
                <Form.Item
                  label="MMID"
                  name="mmid"
                  rules={[
                    {
                      required: true,
                      message: "Please input your MMID!",
                    },
                  ]}
                >
                  <Input placeholder="123434" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{ float: "right", }}>
              <Button type="primary"  htmlType="submit">
                Save Information
              </Button>
            </Form.Item>
          </Form>
        )}
      </Cards>
    </Main>
  );
}

export default BankDetails;
