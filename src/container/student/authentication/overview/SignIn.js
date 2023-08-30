import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Form, Input, Button, Modal, Spin, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from "@ant-design/icons";
import { AuthWrapper } from "./style";
import { resetPassword } from "../../../../redux/student/actionCreator";
import { login } from "../../../../redux/authentication/actionCreator";
import { Checkbox } from "../../../../components/checkbox/checkbox";
import Heading from "../../../../components/heading/heading";

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [isLocLoading, setisLocLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });
  const initUser = { email: "", password: "" };

  const [user, setUser] = useState(initUser);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (email !== "") {
      dispatch(resetPassword({ email: email }, setisLocLoading));
      setIsModalVisible(false);
      setemail("");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setemail("");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = () => {
    dispatch(login(user, "student"));
    // history.push('/student');
    window.reload();
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };
  const handleForgotSubmit = (values) => {
    console.log("forgot a", email);
  };
  return (
    <AuthWrapper>
      {isLocLoading === true ? (
        <Row>
          <Col xs={24}>
            <div className="spin">
              <Spin />
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <div className="auth-contents">
            <Form
              name="login"
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
            >
               <Heading as="h3" className="gurqool-headling">
            Sign in as <span className="gurqool-red">Student</span>
          </Heading>
              <Form.Item
                name="username"
                rules={[
                  {
                    message: "Please input your username or Email!",
                    required: true,
                  },
                ]}
                initialValue=""
                label="Username or Email Address"
              >
                <Input
                  placeholder="Username"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="password"
                initialValue=""
                rules={[
                  {
                    message: "Please input your Password!",
                    required: true,
                  },
                ]}
                label="Password"
              >
                <Input.Password
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Form.Item>
              <div className="auth-form-action">
                <Checkbox onChange={onChange}>Keep me logged in</Checkbox>
                <Button
                  onClick={showModal}
                  className="forgot-pass-link"
                  type="link"
                >
                  Forgot password?
                </Button>
                {/* <NavLink to="#"></NavLink> */}
              </div>
              <Form.Item>
                <Button
                style={{ background: "#ec5252", border:"0" }}
                  className="btn-signin"
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </Button>
                <div style={{paddingTop: "40px", fontSize: "17px", fontWeight: 500}}>New to GurQool? Click here to <span><a style={{color: "#cc5252"}} href="/auth/student/signup
">Register as Student</a> </span></div>

              </Form.Item>

            </Form>
          </div>
          <Modal
            title="Reset Password"
            visible={isModalVisible}
            onOk={handleOk}
            destroyOnClose={true}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                htmlType="submit"
                type="primary"
                onClick={handleOk}
              >
                Reset
              </Button>,
            ]}
          >
            <Form name="login" onFinish={handleForgotSubmit} layout="vertical">
              {" "}
              <Form.Item
                name="username"
                rules={[
                  {
                    message: "Please input your Email!",
                    required: true,
                  },
                ]}
                initialValue=""
                label="Email Address"
              >
                <Input
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </AuthWrapper>
  );
};

export default SignIn;
