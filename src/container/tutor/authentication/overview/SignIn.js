import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from "@ant-design/icons";
import { AuthWrapper } from "./style";
import { login } from "../../../../redux/authentication/actionCreator";
import { Checkbox } from "../../../../components/checkbox/checkbox";
import Heading from "../../../../components/heading/heading";

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });
  const initUser = { email: "", password: "" };

  const [user, setUser] = useState(initUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = () => {
    dispatch(login(user, "tutor"));
    // history.push('/tutor');
    window.reload();
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
          <Heading as="h3" className="gurqool-headling">
            Sign in as <span className="gurqool-red">Tutor</span>
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
            <NavLink className="forgot-pass-link" to="#">
              Forgot password?
            </NavLink>
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

            <div style={{paddingTop: "40px", fontSize: "17px", fontWeight: 500}}>New to GurQool? Click here to <span><a style={{color: "#cc5252"}} href="/auth/tutor/signup">Register as Tutor</a> </span></div>
          </Form.Item>
          
        </Form>
        
      </div>
      
    </AuthWrapper>
  );
};

export default SignIn;
