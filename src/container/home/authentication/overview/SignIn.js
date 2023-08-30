import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";

import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from "@ant-design/icons";
import { AuthWrapper } from "./style";
import { login, signup } from "../../../../redux/authentication/actionCreator";
import { Checkbox } from "../../../../components/checkbox/checkbox";
import Heading from "../../../../components/heading/heading";
import { Divider, Row, Col } from "antd";
const SignIn = ({ type }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });
  const initUser = { firstname: "", lastname: "", email: "", password: "" };

  const [user, setUser] = useState(initUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = () => {
    let data = {
      full_name: user.firstname + " " + user.lastname,
      email: user.email,
      password: user.password,
      ProfessionalId: 1,
    };
    dispatch(signup(data, type == "student" ? "/student" : "/faculty"));
    // history.push("/home");
    // window.reload();
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form
          name="login"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Heading as="h3">
            <span className="color-secondary"  style={{ color: "#4967a3", border:"0" }}>
              Sign Up as {type === "tutor" ? "Tutor" : "Student"}
            </span>
            {/* for{" "}
            <span className="color-secondary">BODHE Application</span> */}
          </Heading>
          <Row>
            <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}>
              <Form.Item
                name="firstname"
                rules={[
                  {
                    message: "Please input your first name",
                    required: true,
                  },
                ]}
                initialValue=""
                label="First Name"
              >
                <Input
                  placeholder="FirstName"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col md={1} lg={1} xl={1} xxl={1}></Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}>
              <Form.Item
                name="lastname"
                rules={[
                  {
                    message: "Please input your last name",
                    required: true,
                  },
                ]}
                initialValue=""
                label="Last Name"
              >
                <Input
                  placeholder="LastName"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="email"
            rules={[
              {
                message: "Please input your email address",
                required: true,
              },
            ]}
            initialValue=""
            label="Email"
          >
            <Input
              placeholder="Email"
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
          <Form.Item>
            <Button
            style={{ background: "#ec5252", border:"0" }}
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </Form.Item>
          <p  style={{ color: "#888888", border:"0" }}>Already have an account? {type === "tutor" ? <a style={{ color: "#0f7c90", border:"0", fontWeight: 600 }} href="/auth/tutor">Login</a>  : <a style={{ color: "#0f7c90", border:"0", fontWeight: 600 }} href="/auth/student">Login</a> } </p>
        {/*  <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img
                  src={require("../../../../static/img/google.png")}
                  alt=""
                />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul>*/}
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
