import React, { lazy, Suspense } from "react";
import { Row, Col, Skeleton } from "antd";
import FeatherIcon from "feather-icons-react";
import { CardBarChart2, EChartCard } from "../dashboard/style";
import { Cards } from "../../components/cards/frame/cards-frame";
import Heading from "../../components/heading/heading";

const CourseStat = (props) => {
  return (
    <>
      <Row gutter={30}>
        <Col xxl={8} md={8} sm={8} xs={24}>
          <Cards headless>
            <EChartCard>
              <div className="card-chunk">
                <CardBarChart2>
                  <Heading as="h1">{props.courseCount} 4</Heading>
                  <span>Courses Created</span>
                 <p>
                    <span className="growth-upward">
                      <FeatherIcon icon="arrow-up" /> 25%
                    </span>
                    <span>Since last week</span>
                </p>
                </CardBarChart2>
              </div>
              <div className="icon-box box-success">
                <img
                  style={{
                    height: "50px",
                    marginBottom: "50px",
                    marginLeft: "70px",
                  }}
                  src={require("../../static/img/icon/paint.svg")}
                  alt=""
                />
              </div>
            </EChartCard>
          </Cards>
        </Col>
        <Col xxl={8} md={8} sm={8} xs={24}>
          <Cards headless>
            <EChartCard>
              <div className="card-chunk">
                <CardBarChart2>
                  <Heading as="h1">28,947</Heading>
                  <span>Active Courses</span>
                  <p>
                    <span className="growth-downward">
                      <FeatherIcon icon="arrow-down" /> 25%
                    </span>
                    <span>Since last week</span>
                  </p>
                </CardBarChart2>
              </div>
              <div className="icon-box box-success">
                <img
                  style={{
                    height: "50px",
                    marginBottom: "50px",
                    marginLeft: "70px",
                  }}
                  src={require("../../static/img/icon/theme.svg")}
                  alt=""
                />
              </div>
            </EChartCard>
          </Cards>
        </Col>
        <Col xxl={8} md={8} sm={8} xs={24}>
          <Cards headless>
            <EChartCard>
              <div className="card-chunk">
                <CardBarChart2>
                  <Heading as="h1">3,241</Heading>
                  <span>Students Enrolled</span>
                  <p>
                    <span className="growth-upward">
                      <FeatherIcon icon="arrow-up" /> 25%
                    </span>
                    <span>Since last week</span>
                  </p>
                </CardBarChart2>
              </div>
              <div className="icon-box box-warning">
                <img
                  style={{
                    height: "50px",
                    marginBottom: "50px",
                    marginLeft: "40px",
                  }}
                  src={require("../../static/img/icon/New Customer.svg")}
                  alt=""
                />
              </div>
            </EChartCard>
          </Cards>
        </Col>
        <Col xxl={8} md={8} sm={8} xs={24}>
          <Cards headless>
            <EChartCard>
              <div className="card-chunk">
                <CardBarChart2>
                  <Heading as="h1">45.2k</Heading>
                  <span>Pending Payments</span>
                  <p>
                    <span className="growth-upward">
                      <FeatherIcon icon="arrow-up" /> 25%
                    </span>
                    <span>Since last week</span>
                  </p>
                </CardBarChart2>
              </div>
              <div className="icon-box box-success">
                <img
                  style={{
                    height: "50px",
                    marginBottom: "50px",
                    marginLeft: "70px",
                  }}
                  src={require("../../static/img/icon/155-credit-card.svg")}
                  alt=""
                />
              </div>
            </EChartCard>
          </Cards>
        </Col>
        <Col xxl={8} md={8} sm={8} xs={24}>
          <Cards headless>
            <EChartCard>
              <div className="card-chunk">
                <CardBarChart2>
                  <Heading as="h1">45.2k</Heading>
                  <span>Recieved Payments</span>
                  <p>
                    <span className="growth-upward">
                      <FeatherIcon icon="arrow-up" /> 25%
                    </span>
                    <span>Since last week</span>
                  </p>
                </CardBarChart2>
              </div>
              <div className="icon-box box-success">
                <img
                  style={{
                    height: "50px",
                    marginBottom: "50px",
                    marginLeft: "70px",
                  }}
                  src={require("../../static/img/icon/Profit.svg")}
                  alt=""
                />
              </div>
              {/* <div className="card-chunk">
                  <img src={require('../../static/img/icon/New Customer.svg')} alt="" />
                </div> */}
            </EChartCard>
          </Cards>
        </Col>
        <Col xxl={8} md={8} sm={8} xs={24}>
          <Cards headless>
            <EChartCard>
              <div className="card-chunk">
                <CardBarChart2>
                  <Heading as="h1">45</Heading>
                  <span>Pending Replies</span>
                  <p>
                    <span className="growth-upward">
                      <FeatherIcon icon="arrow-up" /> 25%
                    </span>
                    <span>Since last week</span>
                  </p>
                </CardBarChart2>
              </div>
              <div className="icon-box box-success">
                <img
                  style={{
                    height: "50px",
                    marginBottom: "50px",
                    marginLeft: "50px",
                  }}
                  src={require("../../static/img/icon/NotOpen.svg")}
                  alt=""
                />
              </div>
            </EChartCard>
          </Cards>
        </Col>
      </Row>
    </>
  );
};

export default CourseStat;
