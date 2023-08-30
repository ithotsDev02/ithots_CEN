import React, { useEffect, useState } from "react";
import { Collapse, Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CaretRightOutlined } from "@ant-design/icons";
import { SettingOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import FeatherIcon from "feather-icons-react";
import { Table } from "antd";
import { Tag, Divider } from "antd";
import { Alert, Space } from "antd";
import { Link, useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import errorNotification from "../notification/errorNotification";

import "./style.css";
import { cartUpdateQuantity } from "../../redux/cart/actionCreator";
const { Panel } = Collapse;

function CustomCollapse({
  batches,
  setSelectedBatch,
  selectedBatch,
  courseInfo,
  cartDeleted,
  calledFrom,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [priceData, setpirceData] = useState([]);
  const cartData = useSelector((state) => state.cart.data);
  const [alreadyInCart, setalreadyInCart] = useState(false);
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector((state) => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });
  const { path } = useRouteMatch();
  const purchaseCourse = (courseInfo, batchPrice, batch, enrollType) => {
    let data = [
      ...cartData,
      {
        courseInfo: courseInfo,
        selectedBatchPrice: batchPrice,
        batch: batch,
        enrollType,
      },
    ];
    dispatch(cartUpdateQuantity(data));
  };
  useEffect(() => {
    let data = cartData;
    data.map((item) => {
      if (item.courseInfo.id == courseInfo.id) {
        setalreadyInCart(true);
        return;
      } else {
        setalreadyInCart(false);
      }
    });
  }, [cartData]);
  useEffect(() => {
    if (batches) {
      let data = [];
      batches.map((batch, idx) => {
        data.push({
          key: idx,
          onetime: batch.total_price,
          monthly: batch.price,
        });
      });
      setpirceData(data);
    }
  }, [batches]);
  const gotocart = () => {
    let paths = localStorage.getItem("USR_ROLE") || "";
    window.location = `/${paths === "student" ? "student" : "home"}/cart`;
  };
  const joinMeeting = (meetingId) => {
    let accessToken = localStorage.getItem("token") || "";

    window
      .open(
        "https://class.gurqool.live/?roomId=" +
          meetingId +
          "&accessToken=" +
          accessToken,
        "_blank"
      )
      .focus();
  };
  const genExtra = (id) => <Checkbox onChange={() => setSelectedBatch(id)} />;
  const columns = [
    {
      title: "OneTime",
      dataIndex: "onetime",
      key: "onetime",
    },
    {
      title: "Monthly",
      dataIndex: "monthly",
      key: "monthly",
    },
  ];
  return (
    <>
      {console.log("the data in batches is", batches)}
      <Collapse
        bordered={true}
        defaultActiveKey={["0"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        {batches.map(
          (batch, idx) => (
            // {
            //   batch.participants_size ?
            <Panel
              header={
                <span style={{ fontSize: 16, color: "#0f7c90" }}>
                  <b>{batch.title}</b>
                </span>
              }
              key={idx}
              className="site-collapse-custom-panel"
            >
              <ul>
                <li>
                  Batch Type :{" "}
                  <b>
                    {batch.batch_type === "value1" ? "Individual" : "Group"}
                  </b>
                </li>
                <li>
                  Classes from <b>{batch.start_date}</b> to{" "}
                  <b>{batch.end_date}</b>
                </li>
                <li>Days :&nbsp; {batch.days.map((day) => day)} </li>
                <li>
                  Timing :&nbsp;
                  <b>
                    {batch.start_time} - {batch.end_time}
                  </b>
                </li>
                <li>
                  Last Date to enroll :&nbsp;<b>{batch.start_date}</b>
                </li>
                <li>
                  Seats Available :&nbsp;<b>{batch.participants_size}</b>
                </li>
                {console.log("the data passed is", batch)}
                {calledFrom == "tutor" ? (
                  <Button
                    onClick={() => joinMeeting(batch.meeting_room)}
                    className="btn-buy"
                    size="default"
                    type="primary"
                  >
                    Join Meeting
                  </Button>
                ) : (
                  batch.participants_size > 0 && (
                    <>
                      {alreadyInCart === true ? (
                        <Alert
                          message="In Cart"
                          description="This course is already in your cart, If you wish to change batch please remove from the cart else please proceed for payment"
                          type="info"
                          action={
                            <Space direction="vertical">
                              <Button
                                onClick={gotocart}
                                size="small"
                                type="primary"
                              >
                                Go to Cart
                              </Button>
                              <Button
                                onClick={() => cartDeleted(idx)}
                                size="small"
                                danger
                                type="ghost"
                              >
                                Remove
                              </Button>
                            </Space>
                          }
                          // closable
                        />
                      ) : (
                        <div>
                          <Divider
                            style={{
                              fontSize: 20,
                              fontWeight: 600,
                              color: "#0f7c90",
                            }}
                          >
                            Price Details
                          </Divider>
                          <Row stye={{ padding: "5px" }}>
                            {batch.total_price != 0 && (
                              <Col
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  padding: "10px",
                                }}
                                sm={12}
                                lg={12}
                                xxl={12}
                                md={12}
                              >
                                <Tag color="default">OneTime</Tag>
                              </Col>
                            )}
                            {batch.price != 0 && (
                              <Col
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  padding: "10px",
                                }}
                                sm={12}
                                lg={12}
                                xxl={12}
                                md={12}
                              >
                                <Tag color="default">Monthly</Tag>
                              </Col>
                            )}
                          </Row>
                          <Row stye={{ padding: "5px" }}>
                            {batch.total_price != 0 && (
                              <Col
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                sm={12}
                                lg={12}
                                xxl={12}
                                md={12}
                              >
                                <span style={{ fontSize: 26, fontWeight: 600 }}>
                                  &#x20B9; {batch.total_price || 1550}
                                </span>
                              </Col>
                            )}
                            {batch.price != 0 && (
                              <Col
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                sm={12}
                                lg={12}
                                xxl={12}
                                md={12}
                              >
                                <span style={{ fontSize: 26, fontWeight: 600 }}>
                                  &#x20B9; {batch.price || 1550}
                                </span>
                              </Col>
                            )}
                          </Row>

                          <Row>
                            {batch.total_price != 0 && (
                              <Col
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  padding: "10px",
                                }}
                                sm={12}
                                lg={12}
                                xxl={12}
                                md={12}
                              >
                                <Button
                                  // oncClick={() => addCourseToCard()}
                                  onClick={() =>
                                    purchaseCourse(
                                      courseInfo,
                                      batch.total_price,
                                      batch,
                                      "ONE_TIME"
                                    )
                                  }
                                  style={{ background: "#ec5252", border: "0" }}
                                  // block
                                  className="btn-buy"
                                  size="large"
                                  type="primary"
                                >
                                  Buy Now
                                </Button>
                              </Col>
                            )}
                            {batch.price != 0 && (
                              <Col
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  padding: "10px",
                                }}
                                sm={12}
                                lg={12}
                                xxl={12}
                                md={12}
                              >
                                <Button
                                  onClick={() =>
                                    purchaseCourse(
                                      courseInfo,
                                      batch.price,
                                      batch,
                                      "MONTHLY"
                                    )
                                  }
                                  style={{ background: "#ec5252", border: "0" }}
                                  // block
                                  className="btn-buy"
                                  size="large"
                                  type="primary"
                                >
                                  Buy Now
                                </Button>
                              </Col>
                            )}
                          </Row>
                        </div>
                      )}
                    </>
                  )
                )}

                {/* <Col> </Col> */}
              </ul>

              {/* {batch.explanation} */}
            </Panel>
          )
          // : (
          //   <Panel
          //     header={
          //       <span style={{ fontSize: 16, color: "#0f7c90" }}>
          //         <b>No Active Batches</b>
          //       </span>
          //     }
          //     key={0}
          //     className="site-collapse-custom-panel"
          //   >
          //     <Alert
          //       message="Batch Full"
          //       Alert
          //       message="Full"
          //       description="Batches are full for this course. Please wait for new batches."
          //       type="warning"
          //       showIcon
          //     />
          //   </Panel>
          // );
        )}
      </Collapse>
      <p style={{color: "#cc5252", paddingTop: 20}}>* All Price Inclusive of Tax </p>

    </>
  );
}
0;
export default CustomCollapse;
