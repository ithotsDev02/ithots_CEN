import React, { useState, useEffect, lazy, Suspense } from "react";
import { Row, Col, Skeleton } from "antd";
import FeatherIcon from "feather-icons-react";
import { useParams } from "react-router-dom";

import { NavLink, Switch, Route, useRouteMatch } from "react-router-dom";
import { SettingWrapper } from "./overview/style";
import { PageHeader } from "../../../components/page-headers/page-headers";
import { Main } from "../../styled";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { Button } from "../../../components/buttons/buttons";
import { ShareButtonPageHeader } from "../../../components/buttons/share-button/share-button";
import { ExportButtonPageHeader } from "../../../components/buttons/export-button/export-button";
import { CalendarButtonPageHeader } from "../../../components/buttons/calendar-button/calendar-button";
import axiosInstance from "../../../config/axoisconfig";
axiosInstance.defaults.headers.common["xaccesstoken"] = `${localStorage.getItem(
  "token"
) || ""}`;
const AllCourses = lazy(() => import("../../ecommerce/product/Products"));

const UserCards = lazy(() => import("../../Usercard/index"));
// const CoverSection = lazy(() => import("../overview/CoverSection"));
const UserBio = lazy(() => import("./overview/UserBio"));
// const Overview = lazy(() => import("./overview/Overview"));
// const Timeline = lazy(() => import("./overview/Timeline"));
// const Activity = lazy(() => import("./overview/Activity"));

const TutorProfile = () => {
  const { path } = useRouteMatch();
  const [isLoading, setisLoading] = useState(false);
  const [tutorinfo, setTutorInfo] = useState(false);
  let { id } = useParams();
  console.log("the id is", id);
  useEffect(() => {
    setisLoading(true);
    const coursesURL = "https://api-v2.esculae.com/api/v1/personal/faculty/" + id;
    axiosInstance
      .get(coursesURL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setTutorInfo(resp.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{ marginTop: "-5%" }}>
      <PageHeader
        ghost
        title="Tutor Profile"
        // buttons={[
        //   <div key="1" className="page-header-actions">
        //     <CalendarButtonPageHeader />
        //     <ExportButtonPageHeader />
        //     <ShareButtonPageHeader />
        //     <Button size="small" type="primary">
        //       <FeatherIcon icon="plus" size={14} />
        //       Add New
        //     </Button>
        //   </div>,
        // ]}
      />

      <Main>
        <Row gutter={25}>
          <Col xxl={6} lg={8} md={10} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton
                    loading={isLoading}
                    avatar
                    active
                    paragraph={{ rows: 3 }}
                  />
                </Cards>
              }
            >
              <UserCards
                user={{
                  name: tutorinfo.full_name,
                  designation: tutorinfo.qualification,
                  img: tutorinfo.image,
                }}
              />
            </Suspense>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton
                    loading={isLoading}
                    active
                    paragraph={{ rows: 10 }}
                  />
                </Cards>
              }
            >
              <UserBio tutorinfo={tutorinfo} />
            </Suspense>
          </Col>
          <Col xxl={18} lg={16} md={14} xs={24}>
            <SettingWrapper>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton loading={isLoading} active />
                  </Cards>
                }
              >
                <div style={{ borderRadius: "10px" }} className="coverWrapper">
                  {/* <CoverSection /> */}
                  <nav className="profileTab-menu">
                    <ul>
                      <li>
                        <NavLink to={`#`}>Courses</NavLink>
                      </li>
                      {/* <li>
                        <NavLink to={`${path}/timeline`}>Timeline</NavLink>
                      </li> */}
                      {/* <li>
                        <NavLink to={`${path}/activity`}>Activity</NavLink>
                      </li> */}
                    </ul>
                  </nav>
                </div>
              </Suspense>
              <Switch>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton
                        loading={isLoading}
                        active
                        paragraph={{ rows: 10 }}
                      />
                    </Cards>
                  }
                >
                  <br />
                  <AllCourses
                    facultyId={id}
                    calledFrom={"profilepage"}
                    showSearch={false}
                  />
                  {/* <Route exact path={`${path}/overview`} component={Overview} /> */}
                  {/* <Route path={`${path}/timeline`} component={Timeline} />
                  <Route path={`${path}/activity`} component={Activity} /> */}
                </Suspense>
              </Switch>
            </SettingWrapper>
          </Col>
        </Row>
      </Main>
    </div>
  );
};

TutorProfile.propTypes = {
  // match: propTypes.object,
};

export default TutorProfile;
