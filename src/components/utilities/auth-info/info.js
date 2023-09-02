import React, { useState, useEffect } from "react";
import { Avatar, Button, Popover, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FeatherIcon from "feather-icons-react";
import { InfoWraper, NavAuth, UserDropDwon } from "./auth-info-style";
import Message from "./message";
import Notification from "./notification";
import Settings from "./settings";
import Support from "./support";
// import { Popover } from "../../popup/popup";
import { Dropdown } from "../../dropdown/dropdown";
import { logOut } from "../../../redux/authentication/actionCreator";
import Heading from "../../heading/heading";
import { Fragment } from "react";
import { readNotificationList } from "../../../redux/notification/actionCreator";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import PaymentNotificationBox from "./paymentNotifications";
const AuthInfo = () => {
  const USER_ROLE = localStorage.getItem("USR_ROLE");
  const [loginPopVisible, setLoginPopVisible] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector((state) => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });
  const { path } = useRouteMatch();

  const cartInfo = useSelector((state) => state.cart.data);
  const notifications = useSelector((state) => state.notification);
  const [userImg, setuserImg] = useState(localStorage.getItem("userImage"));
  const [noti, setnoti] = useState([]);
  const [state, setState] = useState({
    flag: "english",
    username: localStorage.getItem("username"),
    userImage: localStorage.getItem("userImage"),
  });
  const { flag, username } = state;
  useEffect(() => {
    if (notifications && notifications.data && notifications.data.length > 0) {
      setnoti(notifications.data);
    }
  }, [notifications]);
  useEffect(() => {
    setuserImg(state.userImage);
  }, [state]);
  const SignOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };
  useEffect(() => {
    if (
      localStorage.getItem("USR_ROLE") !== undefined &&
      localStorage.getItem("USR_ROLE") !== "" &&
      localStorage.getItem("USR_ROLE") !== null &&
      localStorage.getItem("USR_ROLE") !== "tutor"
    ) {
      dispatch(readNotificationList());
    }
    // if (readNotificationList) {
    // }
  }, []);
  const hide = () => {
    setLoginPopVisible(true);
  };

  const handleVisibleChange = (visible) => {
    setLoginPopVisible(visible);
  };
  const notification = [
    {
      key: 1,
      name: "Payment Remainder for course - Python for data science",
      batch: "Monrning Batch",
      time: "10:00 AM to 04:00 PM",
      paymentlink: "www.google.in",
    },
    {
      key: 2,
      name: "Payment Remainder for course - Python for data science",
      batch: "Monrning Batch",
      time: "10:00 AM to 04:00 PM",
      paymentlink: "www.google.in",
    },
    {
      key: 3,
      name: "Payment Remainder for course - Python for data science",
      batch: "Monrning Batch",
      time: "10:00 AM to 04:00 PM",
      paymentlink: "www.google.in",
    },
  ];
  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <img
            height="53px"
            width="53px"
            src={
              userImg !== ""
                ? "https://api-v2.esculae.com/" + userImg
                : require("../../../static/img/avatar/chat-auth.png")
            }
            alt=""
          />
          <figcaption>
            <Heading as="h5">{username}</Heading>
            <p>
              Logged In as :{" "}
              {(localStorage.getItem("USR_ROLE") !== "" &&
                localStorage.getItem("USR_ROLE") &&
                localStorage.getItem("USR_ROLE").toUpperCase()) ||
                ""}
            </p>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          {/* <li>
            <Link to="#">
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li> */}
          {USER_ROLE === "student" && (
            <>
              <li onClick={() => history.push(`${path}`)}>
                <Link to="#" style={{color: "#000000"}}>
                  <FeatherIcon icon="book" /> Enrolled Courses
                </Link>
              </li>
              <li onClick={() => history.push(`${path}/newStudent`)}>
                <Link to="#"style={{color: "#000000"}}>
                  <FeatherIcon icon="user-plus" /> Profile
                </Link>
              </li>
              <li onClick={() => history.push(`${path}/transactions`)}>
                <Link to="#"style={{color: "#000000"}}>
                  <FeatherIcon icon="credit-card" /> Transactions
                </Link>
              </li>
            </>
          )}
          {/* <li>
            <Link to="#">
              <FeatherIcon icon="settings" /> Settings
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="dollar-sign" /> Billing
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="users" /> Activity
            </Link>
          </li> */}
          <li>
            <Link to="#">
              <FeatherIcon icon="bell" /> Help
            </Link>
          </li>
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );
  const tutorLogin = () => {};
  const onFlagChangeHandle = (value) => {
    setState({
      ...state,
      flag: value,
    });
  };

  const country = (
    <NavAuth>
      <Link onClick={() => onFlagChangeHandle("english")} to="#">
        <img src={require("../../../static/img/flag/english.png")} alt="" />
        <span>English</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle("germany")} to="#">
        <img src={require("../../../static/img/flag/germany.png")} alt="" />
        <span>Germany</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle("spain")} to="#">
        <img src={require("../../../static/img/flag/spain.png")} alt="" />
        <span>Spain</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle("turky")} to="#">
        <img src={require("../../../static/img/flag/turky.png")} alt="" />
        <span>Turky</span>
      </Link>
    </NavAuth>
  );

  return (
    <InfoWraper>
      {/* <Message />
      <Notification />

      // <Settings />
      <Support /> */}
      {/* <div className="nav-author">
        <Dropdown placement="bottomRight" content={country} trigger="click">
          <Link to="#" className="head-example">
            <img src={require(`../../../static/img/flag/${flag}.png`)} alt="" />
          </Link>
        </Dropdown>
      </div> */}
      {USER_ROLE !== "tutor" && <Notification cartInfo={cartInfo} />}
      {isLoggedIn && <PaymentNotificationBox notification={noti} />}
      {!isLoggedIn && (
        <Fragment>
          <div className="nav-author" style={{ marginLeft: "5%" }}>
         {/*   <Popover
              content={
                <>
                  <Row>
                    <Col>
                      <Button
                        onClick={() => (window.location = "/auth/student")}
                        type="text"
                      >
                        Student
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        onClick={() => (window.location = "/auth/tutor")}
                        type="text"
                      >
                        Tutor
                      </Button>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col>
                      <Button
                        onClick={() => (window.location = "/auth/admin")}
                        type="text"
                      >
                        Admin
                      </Button>
                    </Col>
                  </Row>
                </>
              }*/} 
           {/*   </Fragment>
              title="Login As"
              trigger="click"
              visible={loginPopVisible}
              onVisibleChange={handleVisibleChange}
            >
              <Button type="dashed">Login</Button>
            </Popover>*/}

            {/* <a href="/auth/student">Login</a> */}
          </div>
          <div className="nav-author" style={{ marginLeft: "5%" }}>
            <Button  style={{ background: "#3174ad", border: "#f5aa22", color: "#ffffff" }} onClick={() => (window.location = "/auth/student")}>
              Student
            </Button>
          </div>

          <div className="nav-author" style={{ marginLeft: "5%" }}>
            <Button
              style={{ background: "#f5aa22", border: "#f5aa22" }}
              type="primary"
              danger
              onClick={() => (window.location = "/auth/tutor")}
            >
              Tutor
            </Button>
          </div>
        </Fragment>
      )}

      {isLoggedIn && (
        <div className="nav-author">
          <Popover placement="bottomRight" content={userContent} action="click">
            <Link to="#" className="head-example">
              <Avatar
                src={
                  state.userImage !== ""
                    ? "https://api-v2.esculae.com/" + state.userImage
                    : "https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"
                }
              />
            </Link>
          </Popover>
        </div>
      )}
    </InfoWraper>
  );
};

export default AuthInfo;
