import React from "react";
import { Badge } from "antd";
import FeatherIcon from "feather-icons-react";
import { Link, Redirect, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { AtbdTopDropdwon } from "./auth-info-style";
import { Popover } from "../../popup/popup";
import Heading from "../../heading/heading";
import { Button } from "../../buttons/buttons";
import { useHistory } from "react-router-dom";

const NotificationBox = ({ notification }) => {
  const { path } = useRouteMatch();
  const history = useHistory();

  const { rtl } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "#F1F2F6",
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
    return <div className="hello" style={thumbStyle} />;
  };

  const renderView = ({ style, ...props }) => {
    const customStyle = {
      marginRight: rtl && "auto",
      [rtl ? "marginLeft" : "marginRight"]: "-17px",
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  renderThumb.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  renderView.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  const content = (
    <AtbdTopDropdwon className="atbd-top-dropdwon">
      <Heading as="h5" className="atbd-top-dropdwon__title">
        <span className="title-text">Notifications</span>
        <Badge
          className="badge-success"
          count={notification && notification.length}
        />
      </Heading>
      <Scrollbars
        autoHeight
        autoHide
        renderThumbVertical={renderThumb}
        renderView={renderView}
        renderTrackVertical={renderTrackVertical}
      >
        <ul className="atbd-top-dropdwon__nav notification-list">
          {notification &&
            notification.map((course) => (
              <>
              <li>
                {/* <Link params={{ calledFrom: "tutor" }} to={`${path}/coursedetail/${course.CourseId}`}> */}
                <div className="atbd-top-dropdwon__content notifications">
                  <div className="notification-icon bg-primary">
                    <FeatherIcon icon="book" />
                  </div>
                  <div className="notification-content d-flex">
                    <div className="notification-text">
                      <Heading as="h5" >
                        <span style={{cursor:'pointer'}} onClick={() => {
                          localStorage.setItem("NotificationSelection",course.id)
                          history.push({
                            pathname: `${path}/coursedetail/${course.CourseId}`,
                            state: {
                              calledFrom: "tutor",
                            },
                          })}
                          
                          }>{course.course_from_request_batch.title}</span>
                      </Heading>
                      <p>New Batch Requested for the above course</p>
                      {/* <p>Batch - {course?.batch}</p>
                      <p>Time - {course?.time}</p> */}
                     
                      {/* <p>Price - &#x20b9;{course?.selectedBatchPrice}</p> */}
                    </div>
                    <div className="notification-status">
                      <Badge dot />
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </li>
              <br/>
              </>
            ))}
          {/* <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-primary">
                  <FeatherIcon icon="hard-drive" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>
                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-primary">
                  <FeatherIcon icon="hard-drive" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>
                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="atbd-top-dropdwon__content notifications">
                <div className="notification-icon bg-secondary">
                  <FeatherIcon icon="share" />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li> */}
        </ul>
      </Scrollbars>
      {/* <Link className="btn-seeAll" to={`${path}/cart`}>
        Payments Pending
      </Link> */}
    </AtbdTopDropdwon>
  );

  return (
    <div
      className="notification"
      style={{ marginLeft: "15px", marginRight: "5px" }}
    >
      <Popover placement="bottomLeft" content={content} action="click">
        {notification && notification.length > 0 ? (
          <Badge dot offset={[-8, -5]}>
            {/* <Link to="#" className="head-example"> */}
            <FeatherIcon icon="bell" size={20} />
            {/* </Link> */}
          </Badge>
        ) : (
          // <Link to="#" className="head-example">
          <FeatherIcon icon="bell" size={20} />
          // </Link>
        )}
      </Popover>
    </div>
  );
};

export default NotificationBox;
