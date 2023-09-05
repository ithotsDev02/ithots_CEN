import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import FeatherIcon from "feather-icons-react";
import { NavLin, useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import Heading from "../../../components/heading/heading";
import { Divider } from "antd";
import { Provider, useSelector } from "react-redux";
import CustomCollapse from "../../../components/collapse/index";
import { Tag } from "antd";
import moment from "moment";
import "./style.css";
import { Alert, Row, Col } from "antd";
// import { updateWishList } from '../../../redux/product/actionCreator';
import { Button } from "../../../components/buttons/buttons";
import { cartDelete } from "../../../redux/cart/actionCreator";
import { requestBatchCreation } from "../../../redux/course/actionCreator";
import { Form, Input, Radio } from "antd";
import { Rate } from "antd";
import axiosInstance from "../../../config/axoisconfig";
import errorNotification from "../../../components/notification/errorNotification";
import axios from "axios";
const { TextArea } = Input;
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const DetailsRight = ({ price, courseBatches, courseInfo, calledFrom, filteredTutor }) => {
  const cartData = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector((state) => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });
  const [formLayout, setFormLayout] = useState("horizontal");
  const formItemLayout =
    formLayout === "horizontal"
      ? {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 10,
        },
      }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
      : null;
  const [batches, setbatches] = useState([]);
  useEffect(() => {
    if (courseBatches && courseBatches.length > 0) {
      let tmp = [];
      courseBatches.map((batch) => {
        let days = filterDays(batch.batch_day);
        tmp.push({
          ...batch,
          start_date: moment(batch.start_date).format("Do MMM YYYY"),
          end_date: moment(batch.end_date).format("Do MMM YYYY"),
          start_time: moment(batch.start_time, "HH:mm").format("HH:mm A"),
          end_time: moment(batch.end_time, "HH:mm").format("HH:mm A"),
          days: days,
          enroll_last_date: moment(batch.enroll_last_date).format(
            "Do MMM YYYY"
          ),
          explanation: `Classes for this batch starts from ${batch.start_date
            } to ${batch.end_date} on every ${days.map((day) => day)} at ${batch.start_time
            } - ${batch.end_time}`,
        });
      });
      setbatches(tmp);
    }
  }, [courseBatches]);
  const filterDays = (days) => {
    let days_txt = [];
    days.map((day) => {
      if (day === 0) {
        days_txt.push(<Tag color="gold"> Sunday </Tag>);
      } else if (day === 1) {
        days_txt.push(<Tag color="lime"> Monday </Tag>);
      } else if (day === 2) {
        days_txt.push(<Tag color="green"> Tuesday </Tag>);
      } else if (day === 3) {
        days_txt.push(<Tag color="cyan"> Wednesday </Tag>);
      } else if (day === 4) {
        days_txt.push(<Tag color="blue"> Thursday </Tag>);
      } else if (day === 5) {
        days_txt.push(<Tag color="geekblue"> Friday </Tag>);
      } else if (day === 6) {
        days_txt.push(<Tag color="purple"> Saturday </Tag>);
      }
    });
    return days_txt;
  };
  const cartDeleted = (id) => {
    let tmp = [];

    tmp = cartData;
    tmp.splice(id, 1);

    const confirm = window.confirm("Are you sure to delete this course?", id);
    if (confirm) dispatch(cartDelete(tmp));
  };
  const [state, setState] = useState({
    quantity: 1,
  });
  const [value, setvalue] = useState(3);
  const [selectedBatch, setSelectedBatch] = useState(1);
  //   const { name, rate, price, oldPrice, description, category, brand, popular, id } = product;
  const { quantity } = state;

  const handleChange = (value) => {
    setvalue(value);
  };

  const incrementQuantity = (e) => {
    e.preventDefault();
    if (quantity !== 5)
      setState({
        ...state,
        quantity: quantity + 1,
      });
  };

  const decrementQuantity = (e) => {
    e.preventDefault();
    if (quantity !== 1)
      setState({
        ...state,
        quantity: quantity - 1,
      });
  };
  const requestBatch = (courseinfo) => {
    if (isLoggedIn) {
      dispatch(
        requestBatchCreation(
          courseinfo.id,
          localStorage.getItem("currentUserInfo"),
          courseinfo.created_by.id,
          courseinfo.created_by.full_name,
          courseinfo.created_by.email
        )
      );
    } else {
      errorNotification("Please Login to request for a batch");
    }
  };
  const purchaseCourse = () => {
    if (!isLoggedIn) {
      alert("Please Login to purchase this course");
    }
  };

  const onFinish = (values) => {
    try {
      const data = { ...values, studentId: parseInt(localStorage.currentUserInfo), facultyId: courseInfo.created_by.id, courseId: courseInfo.id }
      console.log('Success:', data);

      axiosInstance.post('https://api-v2.esculae.com/api/v1/course/testimonial', data)
        .then(function (response) {

        })
        .catch(function (error) {
          console.log("API", error);
        });

    } catch (err) {
      console.error(err);
    }
  };

  // // State variable to hold tutor-information
  // const [tutorInfo, setTutorInfo] = useState([]);
  // const [courseDetails, setCourseDetails] = useState(null);

  // // let { id } = useParams();

  // useEffect(()=>{
  //   axios.get("https://api-v2.esculae.com/api/v1/personal/faculty")
  //   .then((res)=>{
  //     const tutorData = res.data.data;

  //     setTutorInfo(tutorData);
    
  //   })
  //   .catch((err)=>{
  //     console.log("Error fetching Tutor info from API:",err);
  //   });
  //    // Fetch course details
  //   // Modify this part to fetch course details based on courseInfo.id
  //   axios.get(`https://api-v2.esculae.com/api/v1/course/course/${courseInfo.id}`)
  //     .then((res) => {
  //       const courseData = res.data; // Adjust the response structure as per your API
  //       setCourseDetails(courseData);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching Course info from API:", err);
  //     });
  // },[courseInfo.id])

  // // Match tutor and course based on their IDs
  // const matchedTutor = tutorInfo.find((tutor) => tutor.id === courseDetails?.tutorId);

//  console.log("det"+courseInfo)

  return (
    
    <div className="batchInfo">
      
      <div>
        {" "}
        {calledFrom == "tutor" ? (

          <Button
            style={{
              float: "right",

            }}
            onClick={() =>
              history.push({
                pathname: `/tutor/createcourse`,
                state: {
                  isSchedule: true,
                  courseInfo: courseInfo,
                },
              })
            }
            type="primary"
          >
            Create New Batch{" "}
          </Button>

        ) : null}
        <React.Fragment>
          {calledFrom !== "Student" ? (
            <>
               <div className="tutor_info bdr mb-20">
                   <h2>Tutor Details</h2>
                   <div class="ant-row pb-10">
                      <div className="ant-col-lg-10 ant-col-xxl-8">Tutor Name :</div>
                      <div className="ant-col-lg-14 ant-col-xxl-16"><span className="f-bold">Stephen</span></div>
                   </div>
                   <div class="ant-row pb-10">
                      <div className="ant-col-lg-10 ant-col-xxl-8">phone number :</div>
                      <div className="ant-col-lg-14 ant-col-xxl-16"><span className="f-bold">9840585858</span></div>
                   </div>
                   <div class="ant-row pb-10">
                      <div className="ant-col-lg-10 ant-col-xxl-8">State :</div>
                      <div className="ant-col-lg-14 ant-col-xxl-16"><span className="f-bold">Tamilnadu</span></div>
                   </div>
                   <div class="ant-row pb-10">
                      <div className="ant-col-lg-10 ant-col-xxl-8">Country :</div>
                      <div className="ant-col-lg-14 ant-col-xxl-16"><span className="f-bold">India</span></div>
                   </div>
                   <div class="ant-row pb-10">
                      <div className="ant-col-lg-10 ant-col-xxl-8">Address :</div>
                      <div className="ant-col-lg-14 ant-col-xxl-16"><span className="f-bold">No 3, I st Main Road, Annanagar East, Chennai- 600084.</span></div>
                   </div>
                  
               </div>
               {console.log(courseInfo.created_by)}
               <br/>
            {/* Display matched tutor's details */}
        {/* {matchedTutor && (
          <div>
            <h2>Tutor Details:</h2>
            <p>Name: {matchedTutor.name}</p>
            <p>Email: {matchedTutor.email}</p>
            
          </div>
        )} */}
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  paddingTop: "10px",
                  marginBottom: "5px",
                  color: "#18113C"
                }}
              >
                {" "}
                Available Batches & Cost{" "}

              </span>
              <br />
              {batches.length > 0 ? (
                <CustomCollapse
                  batches={batches}
                  setSelectedBatch={setSelectedBatch}
                  selectedBatch={selectedBatch}
                  courseInfo={courseInfo}
                  cartDeleted={cartDeleted}
                  calledFrom={calledFrom}
                />
              ) : (
                <>
                  <Alert style={{ marginTop: "20px" }}
                    message="No Batches"
                    Alert
                    message="No Batches"
                    description="This course have not been scheduled by the tutor, Please wait for the schedule or you can contact the tutor for more info."
                    type="warning"
                    showIcon
                  />

                  <br />
                  {localStorage.getItem("USR_ROLE") !== "tutor" && (
                    <Button
                      style={{
                        float: "right",
                      }}
                      onClick={() => requestBatch(courseInfo)}
                      type="primary"
                    >
                      Request a batch
                    </Button>
                  )}
                </>
              )}
              <br />
            </>
          ) : (
            <>
              <h2 style={{ color: "#18113c", paddingBottom: "15px" }}>Please Provide Feedback here!! </h2>
              <Form
                {...formItemLayout}
                layout={formLayout}
                onFinish={onFinish}
                style={{ border: "solid 1px", borderColor: "#e0e0e0", borderRadius: "0px", backgroundColor: "#f4f5f7" }}
                initialValues={{
                  layout: formLayout,
                }}
              // onValuesChange={onFormLayoutChange}
              >
                <Form.Item label="Course Content" name="course">

                  <Rate
                    allowClear={true}
                    tooltips={desc}
                    onChange={handleChange}
                    value={value}
                  />

                </Form.Item>
                <Form.Item label="Tutor" name="faculty">

                  <Rate
                    allowClear={true}
                    tooltips={desc}
                    onChange={handleChange}
                    value={value}
                  />

                </Form.Item>
                <Form.Item label="Feedback" name="decription">
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                  <Button style={{ float: "right" }} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </React.Fragment>
      </div>
    </div>
  );
};

DetailsRight.propTypes = {
  product: PropTypes.object,
};

export default DetailsRight;
