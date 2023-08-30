import React, { useEffect, useState, lazy, Suspense } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import { Row, Col, Radio, Spin, Icon, Skeleton, Layout } from "antd";

import { Switch, NavLink, Route, useRouteMatch } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import Flex from "../../../components/flex/index";
import moment from "moment";
import { PageHeader } from "../../../components/page-headers/page-headers";
import { Main } from "../../styled";
import { AutoComplete } from "../../../components/autoComplete/autoComplete";
import Jumbotron from "../../../components/jumbotron/index";
import { TopToolBox } from "../Style";
// import { sorting } from '../../../redux/product/actionCreator';
import { Button } from "../../../components/buttons/buttons";
import { disable } from "../../../redux/course/actionCreator";
import { ShareButtonPageHeader } from "../../../components/buttons/share-button/share-button";
import { ExportButtonPageHeader } from "../../../components/buttons/export-button/export-button";
import { CalendarButtonPageHeader } from "../../../components/buttons/calendar-button/calendar-button";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { getAllCourses } from "../../../redux/tutor/actionCreator";
import axiosInstance from "../../../config/axoisconfig";
import "./index.css";

import Testimonials from "../Testimonials";
import Support from "../Support";
import BecomeTutor from "../../homebanners/BecomeTutor";
// import HomeTestimonials from '../../pages/'
import {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner5,
  Banner6,
  Banner7,
  BannerCarousel,
  BannerLong,
  BannerCard,
  BannerCard2,
  BannerCta,
  BannerCta2,
  HomepageWelcome,
} from "../../../components/banners/Banners";
const Filters = lazy(() => import("./overview/Filters"));
const Grid = lazy(() => import("./overview/Grid"));
const List = lazy(() => import("./overview/List"));
const { Header, Footer, Sider, Content } = Layout;
const GlobalStyle = createGlobalStyle`
  body{
    >div {
      > .ant-message {
        left: auto;
        right: 20px;
        top: 20px;
        width: auto;
      }
    }
  } 
  
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
`;
const ContentWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
`;
const SearchIcon = styled(Icon)`
  font-size: 24px;
  color: #8895a3;
  padding: 1px;
`;

const Product = ({
  isTutor = false,
  isStudent,
  courseList = [],
  showModal,
  calledFrom,
  facultyId,
  showSearch,
}) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [courses, setcourses] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [findValue, setFindValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedView, setSelectedView] = useState("selection");
  const [searchDropDown, setSearchDropDown] = useState(false);
  const [findDropDown, setFindDropDown] = useState(false);
  const [searchResultsData, setSearchResults] = useState([]);
  const [facultyList, setfacultyList] = useState([]);
  const [locationResults, setLocationResults] = useState({});
  const [keySelected, setSelectedKey] = useState();
  const [isFiltering, setIsFiltering] = useState(false);
  const [isFinding, setIsFinding] = useState(false);
  const [fullCoursedetails, setfullCoursedetails] = useState([]);
  const [paymentDetails, setpaymentDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [totalCourses, settotalCourses] = useState(1);
  const [dueCount, setDueCount] = useState(0);
  const [shouldUpdateCourse, setShouldUpdateCourse] = useState(false);
  const [searchKey, setsearchKey] = useState("");
  const [searchLoading, setsearchLoading] = useState(false);
  const [batchInfo, setBatchInfo] = useState([]);
  const [enrolledCourseIds, setenrolledCourseId] = useState([]);
  const [allInfo, setallInfo] = useState([]);
  const [categories, setCategories] = useState([]);
  const current_usr_role = localStorage.getItem("USR_ROLE");
  const current_route = window.location.pathname;
  const EnableDisableCourse = (stateSelected, courseSelected) => {
    // let updatedData = courseSelected;
    // updatedData.is_active = stateSelected;
    let updatedData = { is_active: stateSelected };
    dispatch(disable(courseSelected.id, updatedData, setShouldUpdateCourse));
  };
  useEffect(() => {
    if (
      current_usr_role !== undefined &&
      current_usr_role !== "" &&
      current_usr_role !== "" &&
      current_usr_role === "student"
    ) {
      getInstallmentData();
    }
  }, []);

  useEffect(() => {
    const categoryURL = "https://api.esculae.com/api/v1/course/category";
    Promise.all([axiosInstance.get(categoryURL)])
      .then((responses) => {
        setCategories(responses[0].data);
      })
      .catch((errors) => {
        console.log("Error in getting api response", errors);
      });
  }, []);

  useEffect(() => {
    var coursesURL = "";
    setIsLoading(true);
    if (calledFrom === "profilepage") {
      coursesURL =
        "https://api.esculae.com/api/v1/course/course-faculty/" + facultyId;
    } else if (isTutor === true) {
      coursesURL = "https://api.esculae.com/api/v1/course/course-faculty";
    } else if (isStudent === true) {
      coursesURL =
        "https://api.esculae.com/api/v1/personal/student-enroll-course";
    } else {
      if (window.location.search && window.location.search != "") {
        if (
          window.location.search.indexOf("category") > -1 &&
          window.location.search.indexOf("subcategory") > -1
        ) {
          let subCat = window.location.search.split("&")[1].split("=")[1];
          let cat = window.location.search
            .split("&")[0]
            .split("?")[1]
            .split("=")[1];
          coursesURL = `https://api.esculae.com/api/v1/course/course?page=${currentPage}&filter=[{"field":"category","value":${cat !=="" ? cat: "\"\""}},{"field":"sub_category","value":${subCat !=="" ? subCat : "\"\""}}]&size=12&sort={"field": "updatedAt", "order": "DESC"}`;
        } else if (window.location.search.indexOf("search") > -1) {
          let searchValue = window.location.search.split("=")[1];
          coursesURL = `https://api.esculae.com/api/v1/course/course?page=${currentPage}&size=12&filter=[{"field": "title", "value": "${searchValue}"}]`;
        }
      } else {
        coursesURL = `https://api.esculae.com/api/v1/course/course?page=${currentPage}&size=12&sort={"field": "updatedAt", "order": "DESC"}`;
      }
    }

    axiosInstance
      .get(coursesURL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        if (calledFrom === "profilepage") {
          setcourses(resp.data.data);
          settotalPages(1);
          settotalCourses(resp.data.data.length);
        } else if (isTutor === true) {
          setcourses(resp.data.data);
          settotalPages(1);
          settotalCourses(resp.data.data.length);
        } else if (isStudent === true) {
          let courseInfo = [];
          let batch = [];
          let type = [];
          resp.data &&
            resp.data.data.map((course) => {
              courseInfo.push(course.course_from_enroll_course);
              batch.push(course.batch_from_enroll_course);
              type.push(course);
            });
          setallInfo(type);
          setcourses(courseInfo);
          setBatchInfo(batch);
          settotalPages(1);
          settotalCourses(courseInfo.length);
        } else {
          setcourses(resp.data.data.items);
          settotalPages(resp.data.data.totalPages);
          settotalCourses(resp.data.data.totalItems);
        }

        setIsLoading(false);
        setShouldUpdateCourse(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [currentPage, shouldUpdateCourse]);
  useEffect(() => {
    setsearchLoading(true);
    let coursesURL = `https://api.esculae.com/api/v1/course/course?filter=[{"field": "title", "value": "${searchKey}"}]&page=1&size=${totalCourses}`;
    axiosInstance
      .get(coursesURL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setSearchResults(resp.data.data.items);
        setsearchLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setsearchLoading(false);
      });
  }, [searchKey]);
  useEffect(() => {
    var faculty = "";
    setIsLoading(true);
    // dispatch(getAllCourses());
    faculty = "https://api.esculae.com/api/v1/personal/faculty";
    axiosInstance
      .get(faculty, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setfacultyList(resp.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  const getInstallmentData = () => {
    var faculty = "";
    setIsLoading(true);
    // dispatch(getAllCourses());
    faculty =
      "https://api.esculae.com/api/v1/personal/student-enroll-course-payment-list";
    axiosInstance
      .get(faculty, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setpaymentDetails(resp.data?.data);
        let cnt = resp.data?.data.length;

        setDueCount(cnt);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (calledFrom === "studentAllCourses") {
      var coursesURL = "";
      setIsLoading(true);
      coursesURL =
        "https://api.esculae.com/api/v1/personal/student-enroll-course";
      axiosInstance
        .get(coursesURL, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          let courseIds = [];
          resp.data.data.map((ids) => courseIds.push(ids.CourseId));
          setenrolledCourseId(courseIds);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, []);

  const findFaculty = (id) => {
    return facultyList.find((fac) => fac.id == id);
  };
  useEffect(() => {
    if (courses && courses.length > 0 && facultyList.length > 0) {
      setIsLoading(true);
      let tmpCourses = [];
      courses.map((item) => {
        let filteredTutor = findFaculty(item.created_by);
        tmpCourses.push({
          id: item.id,
          title: item.title,
          category: item.category,
          sub_category: item.sub_category,
          course_level: item.course_level,
          short_description: item.short_description,
          image: item.image,
          key_points: item.key_points,
          tags: item.tags,
          details_description: item.details_description,
          keywords: item.keywords,
          special_description: item.special_description,
          duration: item.duration,
          age_limit: item.age_limit,
          language: item.language,
          is_active: item.is_active,
          region_id: 1,
          created_by: filteredTutor,
        });
      });
      setfullCoursedetails(tmpCourses);
      setIsLoading(false);
    }
  }, [courses, facultyList]);
  const handleCloseDropDown = () => {
    setFindDropDown(false);
    setSearchDropDown(false);
  };
  const handleDropDown = (event, view) => {
    event.stopPropagation();
    if (view === "search") {
      setSearchDropDown(!searchDropDown);
      setFindDropDown(false);
      setSelectedView("selection");
    } else {
      setFindDropDown(!findDropDown);
      setSearchDropDown(false);
      setFilterValue("");
    }
  };
  const closePopup = () => {
    if (searchDropDown && selectedView !== "selection") {
      setSearchDropDown(false);
    }
    if (findDropDown) {
      setFindDropDown(false);
    }
  };
  const handleFilterOnSearch = (e) => {
    if (e.target.value !== "") {
      setSearchDropDown(true);
      setFindDropDown(false);
      setSelectedView("text");
      handleSearch(e.target.value);
    } else {
      setSelectedView("");
      setSearchResults([]);
      setSearchDropDown(false);
      setFindDropDown(false);
    }
    !isLoading && setFilterValue(e.target.value.replace(/ +/g, " "));
  };
  const handleSearch = async (searchKey) => {
    try {
      setsearchKey(searchKey);
    } catch (error) {
      setIsFiltering(false);
    }
  };
  const handleFindOnSearch = (e) => {
    if (e.target.value !== "") {
      alert("the search is now clicked");
      setFindDropDown(true);
      setSearchDropDown(false);
      setSelectedView("text");
      handleSearchCityZip(e.target.value);
    } else {
      setSelectedView("text");
      setFindDropDown(false);
      setSearchDropDown(false);
      setLocationResults({});
    }
    !isLoading && setFindValue(e.target.value.replace(/ +/g, " "));
  };
  const handleSearchCityZip = async (searchKey) => {
    try {
      setIsFinding(true);
      // let { data, status } = await request.get(
      //   `address/search?searchKey=${searchKey}`
      // );
      // if (status >= 200 && status < 300) {
      //   setLocationResults(data);
      //   setIsFinding(false);
      // }
    } catch (error) {
      // message.error("Somthing went wrong please try again");
      setIsFinding(false);
    }
  };
  const getLocationData = (key, value) => {
    setFindValue(value);
    setSelectedKey(key);
    setFindDropDown(false);
    setLocationResults({});
  };
  const handleVerticalSearch = () => {
    let searchTxt = document.getElementById("agentSearch").value;
    if (searchTxt) {
      window.location = `/home?search=${searchTxt}`;
    }
    // if ((!isLoading && filterValue) || (!isLoading && findValue)) {
    //   setIsLoading(true);
    //   console.log("filter values", findValue);

    //   let queryObject = {};
    //   if (keySelected) queryObject[keySelected] = findValue;
    //   if (filterValue) queryObject.name = filterValue;
    //   // router.push({ pathname: "/results", query: queryObject });
    // } else {
    //   // message.error("Please enter a search keyword");
    //   document.getElementById("agentSearch").focus();
    // }
  };
  const handleFilterKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      if (!isLoading && filterValue !== "") {
        setIsLoading(true);
        // router.push({
        //   pathname: "/results",
        //   query: { name: filterValue },
        // });
      }
    }
  };
  const clickOnBody = (e) => {
    let customDropDown = document.getElementById("customDropDown");
    if (
      customDropDown !== e.target &&
      customDropDown &&
      !customDropDown.contains(e.target)
    ) {
      handleCloseDropDown();
    }
  };
  const onHandlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Row>
        {showSearch === true ? (
          <Jumbotron
            setIsLoading={setIsLoading}
            isLoading={searchLoading}
            title="Search for the best companies and professionals"
            bgimg={require("../../../static/img/home/bg.jpg")}
            // bgimg={require("../../../static/img/home/search-background.jpg")}
            // bgimg={`${url}/swis_img/search-background.jpg`}
            filterText={<SearchIcon type="search"></SearchIcon>}
            filterPlaceholder="Search your favourite course..."
            searchDropDown={searchDropDown}
            findDropDown={findDropDown}
            filterValue={filterValue}
            closePopup={closePopup}
            findValue={findValue}
            handleViewDropDown={(event, view) => handleDropDown(event, view)}
            filterOnSearch={handleFilterOnSearch}
            findSearch={handleFindOnSearch}
            findText={<SearchIcon type="environment"></SearchIcon>}
            findPlaceholder="City, State or ZIP"
            onSearch={handleVerticalSearch}
            handleFilterKeyPress={handleFilterKeyPress}
            view={selectedView}
            searchResults={searchResultsData || []}
            locationResults={locationResults || []}
            getLocationData={(key, value) => getLocationData(key, value)}
            isFiltering={isFiltering}
            isFinding={isFinding}
            handleCloseDropDown={handleCloseDropDown}
            page={"landingPage"}
            searchInputId={"agentSearch"}
            findInputId={"locationSearch"}
          />
        ) : null}
      </Row>

      {current_route === "/home" && <HomepageWelcome />}

      <br />
      <>
        <Main>
          {isLoading ? (
            <Row>
              <Col xs={24}>
                <div className="spin">
                  <Spin />
                </div>
              </Col>
            </Row>
          ) : (
            <>
              <Row style={{ display: "flex" }} gutter={30}>
                <Col
                  className="product-content-col"
                  xxl={24}
                  lg={24}
                  md={24}
                  xs={24}
                >
                  {/* <div className="headerInfo">
                    <div className="heading">
                      The world's largest selection of courses
                    </div>
                    <div className="subHeading">
                      Take the next step in your career with a world class
                      learning experience.
                    </div>
                  </div> */}
                  <Switch>
                    <Suspense
                      fallback={
                        <div className="spin d-flex align-center-v">
                          <Spin />
                        </div>
                      }
                    >
                      <Route
                        exact
                        path={path}
                        component={() => (
                          <>
                            {/* <span className="pageSubHeading">
                              Popular Courses
                            </span> */}
                            <Grid
                              isTutor={isTutor}
                              categories={categories}
                              paymentDetails={paymentDetails}
                              dueCount={dueCount}
                              isLoading={isLoading}
                              courseList={fullCoursedetails}
                              onHandlePageChange={onHandlePageChange}
                              totalPages={totalPages}
                              currentPage={currentPage}
                              showModal={showModal}
                              calledFrom={calledFrom}
                              enrolledCourseIds={enrolledCourseIds}
                              EnableDisableCourse={EnableDisableCourse}
                              totalCourses={totalCourses}
                              batchInfo={batchInfo}
                              allInfo={allInfo}
                              getInstallmentData={getInstallmentData}
                            />
                          </>
                        )}
                      />
                      <Route exact path={`${path}/grid`} component={Grid} />
                      <Route exact path={`${path}/list`} component={List} />
                    </Suspense>
                  </Switch>
                </Col>
              </Row>
              {/* <Row gutter={25}>
              <Col span={24}>
                <Banner1 />
              </Col>
            </Row> */}

              {/* <Row gutter={25}>
              <Col>
                <h1>SHAM</h1>
                <Testimonials />
              </Col>
            </Row> */}
            </>
          )}
        </Main>

        {/*{window.innerWidth > 991 && (
          <>
            {" "}
            {current_route === "/home" && (
              <Row style={{ height: "400px" }}>
                <Col sm={24} lg={14} md={14} xxl={14}>
                  <img
                    style={{ maxHeight: "400px" }}
                    width="100%"
                    src="https://media.istockphoto.com/photos/man-smiling-working-using-computer-laptop-picture-id1167772588?k=6&m=1167772588&s=170667a&w=0&h=3hHPJVgZE3hJXYS-SjNJ2p_VEnRZPvMRqLYWtBI4y5A="
                    alt="No Preview"
                  />
                </Col>
                <Col
                  style={{ maxHeight: "400px" }}
                  className="featuresDiv"
                  sm={24}
                  lg={10}
                  md={10}
                  xxl={10}
                >
                  <div>
                    <div className="headingSec">
                      {" "}
                      <div className="rightHeading">
                        {" "}
                        <Row>
                          <Col
                            span={24}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <FeatherIcon
                              icon="unlock"
                              size={35}
                              style={{ marginTop: "2px" }}
                              // color={popular ? '#FF4D4F' : '#9299B8'}
                              // fill={popular ? '#FF4D4F' : 'none'}
                            />
                            <span className="innerText">EASY TO ACCESS</span>
                          </Col>
                        </Row>
                      </div>
                      <div className="rightSubHeading">
                        <span className="innerText">
                          Just few steps to access the course
                        </span>
                      </div>
                    </div>
                    <br />
                    <div className="headingSec">
                      <div className="rightHeading">
                        {" "}
                        <Row>
                          <Col
                            style={{ display: "flex", alignItems: "center" }}
                            span={24}
                          >
                            <FeatherIcon
                              icon="check"
                              size={35}
                              // color={popular ? '#FF4D4F' : '#9299B8'}
                              // fill={popular ? '#FF4D4F' : 'none'}
                            />
                            <span className="innerText">JUST FEW CLICKS</span>
                          </Col>
                        </Row>
                      </div>
                      <div className="rightSubHeading">
                        <span className="innerText">
                          Just few steps to access the course
                        </span>
                      </div>
                    </div>
                    <br />
                    <div className="headingSec">
                      <div className="rightHeading">
                        <Row>
                          <Col
                            style={{ display: "flex", alignItems: "center" }}
                            span={24}
                          >
                            <FeatherIcon
                              icon="book-open"
                              size={35}
                              // color={popular ? '#FF4D4F' : '#9299B8'}
                              // fill={popular ? '#FF4D4F' : 'none'}
                            />
                            <span className="innerText">
                              THOUSANDS OF COURSES
                            </span>
                          </Col>
                        </Row>
                      </div>
                      <div className="rightSubHeading">
                        <span className="innerText">
                          Just few steps to access the course
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            {current_route === "/home" && (
              <Row style={{ height: "400px" }}>
                <Col
                  style={{
                    maxHeight: "400px",
                  }}
                  className="tutor"
                  sm={24}
                  lg={14}
                  md={14}
                  xxl={14}
                >
                  <div>
                    <div className="headingSec">
                      {" "}
                      <div className="rightHeading">
                        {" "}
                        <Row>
                          <Col
                            span={24}
                            style={{
                              display: "flex",
                              // alignItems: "center",
                              // justifyContent: "center",
                            }}
                          >
                            <span className="tutor-innerText">
                              Would like to become a Tutor?
                            </span>
                          </Col>
                        </Row>
                      </div>
                      <div
                        style={{ textAlign: "left" }}
                        className="rightSubHeading"
                      >
                        <span className="innerText">
                          Become a tutor and teach lesson to thousands of
                          students
                        </span>
                      </div>
                      <Row>
                        <Col>
                          <span>
                            <Button
                              style={{ background: "green" }}
                              className="tutorBtn"
                              type="primary"
                              size="large"
                              danger
                              onClick={() =>
                                (window.location = "/auth/tutor/signup")
                              }
                            >
                              Become a Tutor
                            </Button>
                          </span>
                        </Col>
                      </Row>
                    </div>

                    <br />
                  </div>
                </Col>
                {/*<Col sm={24} lg={10} md={10} xxl={10}>
                  <img
                    style={{ height: "400px" }}
                    width="100%"
                    src="https://media.istockphoto.com/photos/confidence-level-boss-picture-id675956064?k=6&m=675956064&s=612x612&w=0&h=GQwqjxcyGna24dW1IOTd7V0gdML3c1xfw6gHoZbbBOA="
                    alt="No Preview"
                  />
                            </Col>--comment here
             </Row>
            )}
          </>
        )}*/}
        {/* {current_route === "/home" && <Banner4 />} */}

        {/* {current_route === "/home" && <Support />} */}
       
        {current_route === "/home" && <BecomeTutor />}
        {current_route === "/home" && <Testimonials />}
       

        {/* {current_route === "/home" && <Banner4 />} */}

        {/* <Row gutter={25}>
          <Col span={24}>
            <Banner4 />
          </Col>
        </Row> */}
      </>
    </>
  );
};

export default Product;
