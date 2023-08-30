/* eslint-disable no-shadow */
import React, { Component } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Skeleton,
  Space,
  Input,
  Divider,
} from "antd";
import FeatherIcon from "feather-icons-react";
import { NavLink, Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import propTypes from "prop-types";
import MenueItems from "./MenueItems";
import TopMenu from "./TopMenu";
import {
  Div,
  SmallScreenAuthInfo,
  SmallScreenSearch,
  TopMenuSearch,
} from "./style";
import { Menu } from "antd";
import {
  SendOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import HeaderSearch from "../components/header-search/header-search";
import AuthInfo from "../components/utilities/auth-info/info";
import axiosInstance from "../config/axoisconfig";
const { darkTheme } = require("../config/theme/themeVariables");
import "./style.css";
const { SubMenu } = Menu;

const { Header, Footer, Sider, Content } = Layout;
// const { darkMode } = config;

const ThemeLayout = (WrappedComponent, type) => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        hdrBGcolor:
          window.location.pathname == "/home" ? "transparent" : "#1B63A9",
        hide: true,
        searchHide: true,
        // activeSearch: true,
        isLoading: false,
        categories: [],
        subcategories: [],
        headcatlist: [],
        menuList: [],
      };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      let categories = [];
      let subcategories = [];
      const categoryURL = "https://api.esculae.com/api/v1/course/category";
      const subCategoryURL =
        "https://api.esculae.com/api/v1/course/sub-category";
      this.setState({ isLoading: true });
      Promise.all([
        axiosInstance.get(categoryURL),
        axiosInstance.get(subCategoryURL),
      ])
        .then((responses) => {
          categories = responses[0].data;
          subcategories = responses[1].data;
          this.setState({
            categories: categories,
            subcategories: subcategories,
          });
          let list = [];
          categories.data.map((category, idx) => {
            list.push({
              category,
              subCategories: [],
            });
            subcategories.data.map((subcategory) => {
              if (
                subcategory.CategoryId === category.id &&
                subcategory.is_active &&
                category.is_active
              ) {
                list[idx].subCategories &&
                  list[idx].subCategories.push({
                    subcategory,
                  });
              }
            });
          });
          this.setState({ menuList: list, isLoading: false });
        })
        .catch((errors) => {
          this.setState({ isLoading: false });

          console.log("Error in getting api response", errors);
        });
      // window.addEventListener("scroll", this.listenScrollEvent);
      // window.addEventListener("resize", this.updateDimensions);
      // this.updateDimensions();
    }
    listenScrollEvent = (e) => {
      if (window.scrollY > 10) {
        document.getElementById("Hdr").style.background = "#1B63A9";
      } else {
        document.getElementById("Hdr").style.background = "transparent";
      }
    };

    componentWillUnmount() {
      window.removeEventListener("scroll", this.listenScrollEvent);
      // window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
      this.setState({
        collapsed: window.innerWidth <= 1200 && true,
      });
    }
    filterByCategory(category, subCategory) {
      window.location = `/home?category=${category}&subcategory=${subCategory}`;
      // alert(`Selected Category and Sub Cat ${category} and ${subCategory}`);
    }
    render() {
      const { collapsed, hide, searchHide, activeSearch } = this.state;
      const { ChangeLayoutMode, rtl, topMenu, isLoggedIn } = this.props;
      const left = !rtl ? "left" : "right";
      const darkMode = ChangeLayoutMode;
      const toggleCollapsed = () => {
        this.setState({
          collapsed: !collapsed,
        });
      };

      const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 990) {
          this.setState({
            collapsed: !collapsed,
          });
        }
      };

      const onShowHide = () => {
        this.setState({
          hide: !hide,
          searchHide: true,
        });
      };

      const toggleSearch = () => {
        this.setState({
          activeSearch: !activeSearch,
        });
      };

      const handleSearchHide = (e) => {
        e.preventDefault();
        this.setState({
          searchHide: !searchHide,
          hide: true,
        });
      };

      const footerStyle = {
        padding: "20px 30px 18px",
        color: "rgba(0, 0, 0, 0.65)",
        fontSize: "16px",
        fontWeight: "600",
        background: "rgba(255, 255, 255, .90)",
        width: "100%",
        boxShadow: "0 -5px 10px rgba(146,153,184, 0.05)",
      };

      const SideBarStyle = {
        margin: "63px 0 0 0",
        padding: "15px 15px 55px 15px",
        overflowY: "auto",
        height: "100vh",
        position: "fixed",
        [left]: 0,
        zIndex: 998,
      };

      const renderView = ({ style, ...props }) => {
        const customStyle = {
          marginRight: "auto",
          [rtl ? "marginLeft" : "marginRight"]: "-17px",
        };
        return <div {...props} style={{ ...style, ...customStyle }} />;
      };

      const renderThumbVertical = ({ style, ...props }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? "#ffffff16" : "#F1F2F6",
          [left]: "2px",
        };
        return <div style={{ ...style, ...thumbStyle }} props={props} />;
      };

      const renderTrackVertical = () => {
        const thumbStyle = {
          position: "absolute",
          width: "6px",
          transition: "opacity 200ms ease 0s",
          opacity: 0,
          [rtl ? "left" : "right"]: "2px",
          bottom: "2px",
          top: "2px",
          borderRadius: "3px",
        };
        return <div style={thumbStyle} />;
      };

      const renderThumbHorizontal = ({ style, ...props }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? "#ffffff16" : "#F1F2F6",
        };
        return <div style={{ ...style, ...thumbStyle }} props={props} />;
      };
      const usr_role = localStorage.getItem("USR_ROLE");

      return (
        <Div darkMode={darkMode}>
          <Layout className="layout">
            <Header
              // className="cstHdr"
              // id="Hdr"
              style={{
                // background: this.state.hdrBGcolor,
                position: "fixed",
                width: "100%",
                top: 0,
                [!rtl ? "left" : "right"]: 0,
              }}
            >
              <Row>
                <Col
                  lg={!topMenu ? 4 : 3}
                  sm={6}
                  xs={12}
                  className="align-center-v navbar-brand"
                >
                  {/* {isLoggedIn && !topMenu ? (
                    <Button type="link" onClick={toggleCollapsed}>
                      <img
                        src={require(`../static/img/icon/${
                          collapsed ? "right.svg" : "left.svg"
                        }`)}
                        alt="menu"
                      />
                    </Button>
                  ) : null} */}
                  <a
                    className={
                      topMenu && window.innerWidth > 991
                        ? "striking-logo top-menu"
                        : "striking-logo"
                    }
                    href={
                      usr_role === "student"
                        ? "/home"
                        : usr_role === "tutor"
                        ? "/tutor"
                        : usr_role === "admin"
                        ? "/admin"
                        : usr_role === "sadmin"
                        ? "/sadmin"
                        : "/home"
                    }
                  >
                    <img
                      src={
                        !darkMode
                          ? require(`../static/img/newLogo123.png`)
                          : require(`../static/img/newLogo123.png`)
                      }
                      alt=""
                    />
                  </a>
                </Col>

                <Col lg={!topMenu ? 14 : 15} md={8} sm={0} xs={0}>
                  {topMenu && window.innerWidth > 991 ? (
                    <TopMenu />
                  ) : (
                    <>
                    <TopMenuSearch>
                      <div className=" d-flex">
                        {/* <Link
                          className={`${
                            activeSearch
                              ? "search-toggle active"
                              : "search-toggle"
                          }`}
                          onClick={() => {
                            toggleSearch();
                          }}
                          to="#"
                        >
                          <FeatherIcon icon="search" />
                          <FeatherIcon icon="x" />
                        </Link> */}
                        <div
                          className="topMenu-search-form"
                        >
                          <form action="">
                            <span className="search-icon">
                              <FeatherIcon icon="search" />
                            </span>
                            <input type="text" name="search" placeholder="Search for anything"/>
                          </form>
                        </div>
                      </div>
                    </TopMenuSearch>
                    </>
                    // <HeaderSearch rtl={rtl} darkMode={darkMode} />
                  )}
                </Col>

                <Col lg={6} md={10} sm={0} xs={0}>
                  {topMenu && window.innerWidth > 991 ? (
                    <></>
                    // <TopMenuSearch>
                    //   <div className="top-right-wrap d-flex">
                    //     <Link
                    //       className={`${
                    //         activeSearch
                    //           ? "search-toggle active"
                    //           : "search-toggle"
                    //       }`}
                    //       onClick={() => {
                    //         toggleSearch();
                    //       }}
                    //       to="#"
                    //     >
                    //       <FeatherIcon icon="search" />
                    //       <FeatherIcon icon="x" />
                    //     </Link>
                    //     <div
                    //       className={`${
                    //         activeSearch
                    //           ? "topMenu-search-form show"
                    //           : "topMenu-search-form"
                    //       }`}
                    //     >
                    //       <form action="">
                    //         <span className="search-icon">
                    //           <FeatherIcon icon="search" />
                    //         </span>
                    //         <input type="text" name="search" />
                    //       </form>
                    //     </div>
                    //     <AuthInfo />
                    //   </div>
                    // </TopMenuSearch>
                  ) : (
                    // <AuthInfo />
                     <AuthInfo />
                  )}

                  {/* <div>test</div> */}
                </Col>

                <Col md={0} sm={18} xs={12}>
                  <>
                    <div className="mobile-action">
                      {/* <Link
                        className="btn-search"
                        onClick={handleSearchHide}
                        to="#"
                      >
                        {searchHide ? (
                          <FeatherIcon icon="search" />
                        ) : (
                          <FeatherIcon icon="x" />
                        )}
                      </Link> */}
                      <Link className="btn-auth" onClick={onShowHide} to="#">
                        <FeatherIcon icon="more-vertical" />
                      </Link>
                    </div>
                  </>
                </Col>
              </Row>
              <Layout style={{ marginLeft: "-20px", marginRight: "-30px" }}>
                {(!isLoggedIn && window.innerWidth > 991) ||
                (usr_role == "student" && window.innerWidth > 991) ? (
                  <>
                    {this.state.isLoading === true ? (
                      // <Row
                      //   style={{
                      //     clear: "both",
                      //     marginRight: "-30px",
                      //     marginTop: "-2px",
                      //     marginLeft: "-15px",
                      //     borderTop: "solid 1px #e4dddd",
                      //     borderBottom: "solid 1px #e4dddd",
                      //   }}
                      // >
                      <>
                        <Skeleton.Input
                          style={{ marginLeft: "-20px", marginRight: "20px" }}
                          active={true}
                          size={"large"}
                        />
                      </>
                    ) : (
                      // </Row>
                      <>
                        {this.state.menuList.length > 0 && (
                          <>
                            <Row
                              style={{
                                clear: "both",
                                // marginRight: "15px",
                                marginTop: "-2px",
                                marginLeft: "10px",
                                borderTop: "solid 1px #e4dddd",
                                borderBottom: "solid 1px #e4dddd",
                              }}
                            >
                              <Menu
                                onClick={this.handleClick}
                                style={{
                                  width: "100%",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                }}
                                mode="horizontal"
                              >
                                {this.state.menuList.length > 0 &&
                                  this.state.menuList.map((cat) =>
                                    cat.subCategories.length <= 0 ? (
                                      <>
                                        <Menu.Item
                                          onClick={() =>
                                            this.filterByCategory(
                                              cat.category.id,
                                              null
                                            )
                                          }
                                          key={cat.category.id}
                                        >
                                          {cat.category.name}
                                        </Menu.Item>
                                      </>
                                    ) : (
                                      <>
                                        <SubMenu
                                          key={cat.category.id}
                                          title={cat.category.name}
                                          // onClick={() =>
                                          //   this.filterByCategory(
                                          //     cat.category.id,
                                          //     ""
                                          //   )
                                          // }
                                        >
                                          {cat.subCategories.map((subcat) => (
                                            <>
                                              <Menu.Item
                                                onClick={() =>
                                                  this.filterByCategory(
                                                    cat.category.id,
                                                    subcat.subcategory.id
                                                  )
                                                }
                                                key={subcat.subcategory.id}
                                              >
                                                {subcat.subcategory.name}
                                              </Menu.Item>
                                            </>
                                          ))}
                                        </SubMenu>
                                      </>
                                    )
                                  )}
                              </Menu>
                            </Row>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  ""
                )}
              </Layout>
            </Header>
            <div className="header-more">
              <Row>
                <Col md={0} sm={24} xs={24}>
                  <div className="small-screen-headerRight">
                    <SmallScreenSearch hide={searchHide} darkMode={darkMode}>
                      {/* <HeaderSearch rtl={rtl} /> */}
                      <></>
                    </SmallScreenSearch>
                    <SmallScreenAuthInfo hide={hide} darkMode={darkMode}>
                      <AuthInfo rtl={rtl} />
                    </SmallScreenAuthInfo>
                  </div>
                </Col>
              </Row>
            </div>
            <Layout>
              {isLoggedIn &&
              (!topMenu || window.innerWidth <= 991) &&
              (usr_role !== "student" || window.innerWidth <= 991) ? (
                <ThemeProvider theme={darkTheme}>
                  <Sider
                    width={280}
                    style={SideBarStyle}
                    collapsed={collapsed}
                    theme={!darkMode ? "light" : "dark"}
                  >
                    <Scrollbars
                      className="custom-scrollbar"
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}
                      renderThumbHorizontal={renderThumbHorizontal}
                      renderThumbVertical={renderThumbVertical}
                      renderView={renderView}
                      renderTrackVertical={renderTrackVertical}
                    >
                      <p className="sidebar-nav-title">MAIN MENU</p>
                      <MenueItems
                        topMenu={topMenu}
                        isLoggedIn={isLoggedIn}
                        categoriesList={this.state.menuList}
                        rtl={rtl}
                        toggleCollapsed={toggleCollapsedMobile}
                        darkMode={darkMode}
                        type={type || ""}
                      />
                    </Scrollbars>
                  </Sider>
                </ThemeProvider>
              ) : null}
              <Layout
                className={
                  isLoggedIn && usr_role !== "student" ? "atbd-main-layout" : ""
                }
              >
                <Content
                  style={{
                    paddingTop:
                      // (!isLoggedIn && window.innerWidth <= 991) ||
                      // (usr_role == "student" && window.innerWidth <= 991)
                      (!isLoggedIn && window.innerWidth > 991) ||
                      (usr_role == "student" && window.innerWidth > 991)
                        ? "100px"
                        : "",
                  }}
                >
                  <WrappedComponent {...this.props} />
                  <Footer className="site-footer">
                    <div
                      style={{
                        maxWidth: "1180px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      class="container"
                    >
                      <Row gutter={25}>
                        <Col sm={24} md={12}>
                          <h6>About</h6>
                          <p style={{ textAlign: "justify"}}>
                            Gurqool is an initiative to help the students in
                            learning new skills and keep them update to date
                            with industry standards in various skills. Gurqool
                            focuses on providing the most. We will help students
                            build up concepts in different skills such as Dance,
                            Singing, Drawing, IT, Testing, Development, etc.
                          </p>
                        </Col>
                        <Col xs={12} md={6}>
                          <h6 style={{ textAlign: "center" }}>
                            Receive Our News Letter
                          </h6>
                          <ul class="footer-links">
                            <li>
                              <Input
                                style={{ padding: "0px !important" }}
                                placeholder="Email Here.."
                                addonAfter={<SendOutlined />}
                              />
                            </li>
                          </ul>
                          <ul class="social-icons">
                            <li>
                              <a class="facebook" href="#">
                                <i class="fa fa-facebook"></i>
                              </a>
                            </li>
                            <li>
                              <a class="twitter" href="#">
                                <i class="fa fa-twitter"></i>
                              </a>
                            </li>
                            <li>
                              <a class="dribbble" href="#">
                                <i class="fa fa-dribbble"></i>
                              </a>
                            </li>
                            <li>
                              <a class="linkedin" href="#">
                                <i class="fa fa-linkedin"></i>
                              </a>
                            </li>
                          </ul>
                        </Col>
                        <Col xs={12} md={6}>
                          <h6>Quick Links</h6>
                          <ul class="footer-links">
                            <li>
                              <a href="#">About Us</a>
                            </li>
                            <li>
                              <a href="#">Contact Us</a>
                            </li>
                            <li>
                              <a href="#">Terms</a>
                            </li>
                            <li>
                              <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                              <a href="#">FAQ</a>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                      <hr />
                      {/* <Divider /> */}
                    </div>
                    <div
                      style={{
                        maxWidth: "1180px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      class="container"
                    >
                      <Row>
                        <Col md={16} sm={12} xs={24}>
                          <p class="copyright-text">
                            Copyright &copy; 2021 All Rights Reserved by &nbsp;
                            <a href="https://lokesh-online.web.app">Gurqool</a>.
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Footer>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      ChangeLayoutMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  };

  LayoutComponent.propTypes = {
    ChangeLayoutMode: propTypes.bool,
    rtl: propTypes.bool,
    topMenu: propTypes.bool,
    changeRtl: propTypes.func,
    changeLayout: propTypes.func,
    changeMenuMode: propTypes.func,
  };

  return connect(mapStateToProps)(LayoutComponent);
};
export default ThemeLayout;
