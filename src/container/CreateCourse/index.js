import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Upload, Select, Checkbox, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Radio } from "antd";
import axiosInstance from "../../config/axoisconfig";
import "./style.css";
import { BasicFormWrapper } from "../styled";
import { Button } from "../../components/buttons/buttons";
import Heading from "../../components/heading/heading";
import { Cards } from "../../components/cards/frame/cards-frame";
import { Main } from "../styled";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
  createNewCourse,
  resetCreationResponse,
} from "../../redux/tutor/actionCreator";
import { PageHeader } from "../../components/page-headers/page-headers";
import EditableTagGroup from "../../components/tags/index";
import { getCategories } from "../../redux/categories/actionCreator";
import { editCourse } from "../../redux/course/actionCreator";
import { useLocation } from "react-router-dom";
import { Steps } from "../../components/steps/steps";

import Batch from "./partials/batch";
import { CheckoutWrapper } from "../ecommerce/Style";
import errorNotification from "../../components/notification/errorNotification";
import { CustomCalender } from "../../components/calender/calender";
import DynamicList from "../../components/dynamicInput/index";
import RichTextEditor from "react-rte";
import {
  createBatch,
  getBatch,
  deleteBatch,
  editBatch,
} from "../../redux/course/actionCreator";
import { InputNumber } from "antd";
import getOverlappingDaysInIntervals from "date-fns/esm/fp/getOverlappingDaysInIntervals/index.js";
import { Fragment } from "react";
window.RichTextEditor = RichTextEditor;
// import localizer from "react-big-calendar/lib/localizers/globalize";
// import globalize from "globalize";
const { Option } = Select;
const { TextArea } = Input;
var newCreatedCourseId = "";
// const globalizeLocalizer = localizer(globalize);
export const ScheduleCourse = () => {
  if (
    document.getElementsByClassName("cbtn-next") &&
    document.getElementsByClassName("cbtn-next")[0]
  ) {
    document.getElementsByClassName("cbtn-next")[0].click();
  }
};

const CreateCourse = ({ type, state }) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const location = useLocation();
  const [loading, setloading] = useState(false);
  const isLoading = useSelector((state) => state.tutors?.loading);
  const isBatchLoading = useSelector((state) => state.course?.loading);
  const createdCourseId = useSelector(
    (state) => state.tutors?.createdResponse?.data?.id
  );
  const [imageUrl, setimageUrl] = useState();
  const dispatch = useDispatch();
  const [selectedcategory, setSelectedCategory] = useState("");
  const [selectedsubcategory, setselectedsubcategory] = useState("");
  const [creatingCourse, setcreatingCourse] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [tncaccepted, settncaccepted] = useState(true);
  const [coverImage, setcoverImage] = useState("");
  const [previewCoverImage, setPreviewCoverImage] = useState("");
  const [filteredSubCat, setfilteredSubCat] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentWizard, setcurrentWizard] = useState(1);
  const [batchInfo, setbatchInfo] = useState([]);
  const [initWizNo, setinitWizNo] = useState(0);
  const [age, setage] = useState("");
  const [keyPoints, setkeyPoints] = useState([
    {
      index: Math.random(),
      name: "",
    },
  ]);
  const [isEditmode, setIsEditmode] = useState(false);
  const [isSchedulemode, setisSchedulemode] = useState(false);
  const [editorvalue, seteditorvalue] = useState(
    RichTextEditor.createEmptyValue()
  );
  const [allBatches, setallBatches] = useState([]);
  const [finalObj, setfinalObj] = useState({});
  const [courseDetail, setCourseDetail] = useState({});
  const [EventTitle, setEventTitle] = useState("");

  const [days, setdays] = useState("");
  const [isCreationCourse, setisCreationCourse] = useState(false);
  const [isCourseCreated, setisCourseCreated] = useState(false);
  const [editCourseid, seteditCourseid] = useState("");
  const [canCreateNewBatch, setcanCreateNewBatch] = useState(true);
  const [clickedEvent, setclickedEvent] = useState("");
  const [isEventEditMode, setisEventEditMode] = useState(false);
  const [currentBatchInfo, setcurrentBatchInfo] = useState({});
  const [updateEvent, setupdateEvent] = useState(false);
  const [visible, setVisible] = useState(false);
  //date and time for course creation and edit
  const [eventStartEndDate, seteventStartEndDate] = useState("");
  const [eventTimeSlot, seteventTimeSlot] = useState("");

  //state variable for editing the schedule from calender
  const [batch_type, setbatch_type] = useState("value1");
  const [batch_day, setbatch_day] = useState([]);
  const [end_date, setend_date] = useState("");
  const [end_time, setend_time] = useState("");
  const [enroll_last_date, setenroll_last_date] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [start_date, setstart_date] = useState("");
  const [start_time, setstart_time] = useState("");
  const [title, settitle] = useState("");
  const [duration, setduration] = useState("");
  const [monthprice, setmonthprice] = useState("");
  const [attendees, setattendees] = useState(1);

  useEffect(() => {
    if (currentWizard === 1) {
      setisCreationCourse(true);
    }

    let categories = [];
    let subcategories = [];
    const categoryURL = "https://api-v2.esculae.com/api/v1/course/category";
    const subCategoryURL =
      "https://api-v2.esculae.com/api/v1/course/sub-category";
    Promise.all([
      axiosInstance.get(categoryURL),
      axiosInstance.get(subCategoryURL),
    ])
      .then((responses) => {
        categories = responses[0].data;
        subcategories = responses[1].data;
        setCategories(categories);
        setsubcategories(subcategories);
      })
      .catch((errors) => {
        console.log("Error in getting api response", errors);
      });
    return () => {
      // dispatch(resetCreationResponse());
    };
  }, []);
  useEffect(() => {
    setEventTitle(batchInfo.name || "");
  }, [batchInfo]);
  useEffect(() => {
    if (clickedEvent !== "") {
      getBatchInfo(clickedEvent.id);
    }
  }, [clickedEvent]);
  useEffect(() => {
    if (Object.keys(currentBatchInfo).length > 0) {
      setisEventEditMode(true);
      setVisible(true);
      setbatch_type(currentBatchInfo.batch_type);
      setbatch_day(currentBatchInfo.batch_day);
      setend_date(currentBatchInfo.end_date);
      setend_time(currentBatchInfo.end_time);
      setenroll_last_date(currentBatchInfo.enroll_last_date);
      setname(currentBatchInfo.name);
      setprice(currentBatchInfo.total_price);
      setstart_date(currentBatchInfo.start_date);
      setstart_time(currentBatchInfo.start_time);
      settitle(currentBatchInfo.title);
      setmonthprice(currentBatchInfo.price);
      setduration(currentBatchInfo.total_duration);
    }
  }, [currentBatchInfo]);
  const makeid = (length) => {
    var result = [];
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  };

  const updateBatch = () => {
    if (
      title !== "" &&
      batch_day.length > 0 &&
      start_date !== "" &&
      start_time !== "" &&
      enroll_last_date !== "" &&
      name !== "" &&
      price !== ""
    ) {
      let startDate = "";
      let endDate = "";
      let sTime = "";
      let eTime = "";
      if (eventStartEndDate === "") {
        //no update made by useer
        startDate = currentBatchInfo.start_date;
        endDate = currentBatchInfo.end_date;
      } else {
        //user changed date, manipualte the date accordingly
        startDate = eventStartEndDate[0].format("MM/DD/YYYY");
        endDate = eventStartEndDate[1].format("MM/DD/YYYY");
      }
      if (eventTimeSlot === "") {
        sTime = currentBatchInfo.start_time;
        eTime = currentBatchInfo.end_time;
      } else {
        sTime = eventTimeSlot[0].format("HH:mm");
        eTime = eventTimeSlot[1].format("HH:mm");
      }
      let data = {
        CourseId: currentBatchInfo.CourseId,
        name: name,
        title: title,
        sub_title: null,
        batch_type: batch_type,
        enroll_last_date: moment(enroll_last_date).format("MM/DD/YYYY"),
        price: monthprice,
        start_date: startDate,
        end_date: endDate,
        batch_day: batch_day,
        total_price: price,
        total_duration: duration,
        start_time: sTime,
        end_time: eTime,
      };
      dispatch(editBatch(currentBatchInfo.id, data));
    }
  };
  const handleRTEChange = (htmlVal) => {
    seteditorvalue(htmlVal);
  };
  const next = () => {
    if (currentWizard === 1) {
      console.log(currentWizard);
      setcanCreateNewBatch(true);
    }
    setcurrentWizard(currentWizard + 1);
    // onCurrentChange(current, PlaceOrder);
    // setState({
    //   ...state,
    //   status: 'process',
    //   current: current + 1,
    // });
  };
  const prev = () => {
    setcurrentWizard(currentWizard - 1);

    // onCurrentChange(current, PlaceOrder);
    // setState({
    //   ...state,
    //   status: 'process',
    //   current: current - 1,
    // });
  };

  const done = (e, createNewBatchData) => {
    e.preventDefault();
    if (
      (createdCourseId || editCourseid) &&
      (Object.keys(batchInfo).length > 0 ||
        Object.keys(createNewBatchData).length > 0) &&
      EventTitle != "" &&
      eventStartEndDate != "" &&
      days &&
      eventTimeSlot != ""
    ) {
      let batchDetail = {};
      if (Object.keys(batchInfo).length > 0) {
        batchDetail = batchInfo;
      } else {
        batchDetail = createNewBatchData;
      }
      let meetingId = makeid(8);
      let data = {
        CourseId: isSchedulemode === true ? editCourseid : createdCourseId,
        name: batchDetail.name,
        title: EventTitle,
        sub_title: null,
        batch_type: batchDetail.type === "Individual" ? "value1" : "value2",
        enroll_last_date: moment(batchDetail.lastdate).format("MM/DD/YYYY"),
        price: batchDetail.batchpricepermonth,
        start_date: eventStartEndDate[0].format("MM/DD/YYYY"),
        end_date: eventStartEndDate[1].format("MM/DD/YYYY"),
        batch_day: days,
        start_time: eventTimeSlot[0].format("HH:mm"),
        end_time: eventTimeSlot[1].format("HH:mm"),
        total_price: batchDetail.price,
        total_duration: batchDetail.duration,
        meeting_room: meetingId,
        participants_size: attendees,
      };
      dispatch(createBatch(data));
    }
  };
  const getBatchInfo = (eventId) => {
    if (eventId !== "") {
      let url = "https://api-v2.esculae.com/api/v1/course/batch/" + eventId;
      axiosInstance
        .get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          setcurrentBatchInfo(resp.data);
        })
        .catch((err) => {
          errorNotification("Error in getting the batch information");
        });
    }
  };
  const isFinished = () => {};
  const getObj = (val) => {
    var temp = [];
    val &&
      val.map((pts) => {
        temp.push({
          index: Math.random(),
          name: pts,
        });
      });
    setkeyPoints(temp);
  };
  const onSelect = () => {
    alert("Selected a date from calender");
  };
  const getBatches = () => {
    let url = "https://api-v2.esculae.com/api/v1/course/batch";
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setallBatches(resp.data);
      })
      .catch((err) => {
        console.log("Error in getting batches", err);
      });
  };

  useEffect(() => {
    setIsEditmode(location?.state?.isEdit || false);
    console.log(
      "the data is",
      RichTextEditor.createValueFromString(
        location?.state?.courseInfo?.details_description,
        "html"
      )
    );
    setCourseDetail(location?.state?.courseInfo || {});
    setisSchedulemode(location?.state?.isSchedule || false);
    if (location?.state?.isSchedule) {
      getBatches();
      seteditCourseid(location?.state?.courseInfo?.id);
      // dispatch(getBatch());
      if (
        document.getElementsByClassName("cbtn-next") &&
        document.getElementsByClassName("cbtn-next")[0]
      ) {
        document.getElementsByClassName("cbtn-next")[0].click();
      }
    }
    setinitWizNo(location?.state?.isSchedule === true ? 1 : 0);
    getObj(location?.state?.courseInfo?.key_points);
    //  seteditorvalue(location?.state?.courseInfo?.details_description)
    form.setFieldsValue({
      detailedDescription: RichTextEditor.createValueFromString(
        location?.state?.courseInfo?.details_description,
        "html"
      ),
    });
    seteditorvalue(
      RichTextEditor.createValueFromString(
        location?.state?.courseInfo?.details_description,
        "html"
      )
    );
    setSelectedCategory(parseInt(location?.state?.courseInfo?.category || 0));
    categorySelected(parseInt(location?.state?.courseInfo?.category || 0));
    setselectedsubcategory(
      parseInt(location?.state?.courseInfo?.sub_category || 0)
    );
    setage(parseInt(location?.state?.courseInfo?.age_limit));
    setTags(location?.state?.courseInfo?.tags);
    let a = createFile(
      "https://api-v2.esculae.com/" + location?.state?.courseInfo?.image
    );
    toDataURL(
      "https://api-v2.esculae.com/" + location?.state?.courseInfo?.image
    ).then((dataUrl) => {
      var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
      setcoverImage(fileData);
    });
    setPreviewCoverImage({
      uid: "-1",
      name: "preview.png",
      status: "done",
      url:
        "https://api-v2.esculae.com/" + location?.state?.courseInfo?.image || "",
      thumbUrl:
        "https://api-v2.esculae.com/" + location?.state?.courseInfo?.image || "",
    });
    console.log("sadasvrdsdc", location?.state?.courseInfo);
  }, [location, subcategories]);
  async function createFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };
    let file = new File([data], "preview.jpg", metadata);
    return file;
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      // message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const handleChange = (info) => {
    const isJpgOrPng =
      info.file.type === "image/jpeg" || info.file.type === "image/png";
    const isLt2M = info.file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng) {
      errorNotification("You can only upload JPG/PNG file!");
    } else if (!isLt2M) {
      errorNotification("Image must smaller than 2MB!");
    } else {
      setcoverImage(info.file);
      if (info.file.status === "uploading") {
        setloading(true);
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, (imageUrl) => {
          setloading(false);
          setimageUrl(imageUrl);
        });
      }
    }
  };
  const categorySelected = (cat) => {
    let tmp = [];
    console.log("cat ius", cat, subcategories);
    setSelectedCategory(cat);
    subcategories?.data?.map((item) => {
      if (item.CategoryId === cat && item.is_active === true) {
        tmp.push(item);
      }
    });
    console.log(" ", tmp);
    setfilteredSubCat(tmp);
  };
  const handleAgeChange = (age) => {
    setage(age);
  };
  const redirectToDashboard = () => {
    history.push("/tutor");
  };
  const handleSubmit = () => {
    let courseTitle = form.getFieldValue("courseTitle");
    let courseLevel = form.getFieldValue("courseLevel");
    // let shortDescription = form.getFieldValue("shortDescription");
    let SpecialDescription = form.getFieldValue("SpecialDescription");
    let courseLanguage = form.getFieldValue("courseLanguage");
    if (tncaccepted === true) {
      // console.log(
      //   `the saving info ${courseTitle} - ${selectedcategory} - ${selectedsubcategory} - ${courseLevel} - ${editorvalue} - ${tags} - ${SpecialDescription} - ${age} - ${coverImage}`
      // );
      if (
        courseTitle &&
        selectedcategory &&
        selectedsubcategory &&
        courseLevel &&
        editorvalue.toString("html") !== "<p><br></p>" &&
        tags &&
        SpecialDescription &&
        // &&
        // age
        courseLanguage &&
        coverImage
      ) {
        let keypt = [];
        let userData = {
          userId: localStorage.getItem("currentUserInfo") || 0,
        };
        keyPoints.map((point) => {
          if (point.name !== "") {
          }
          keypt.push(point.name);
        });
        let formData = new FormData();
        formData.append("title", courseTitle);
        formData.append("category", selectedcategory);
        formData.append("sub_category", selectedsubcategory);
        formData.append("course_level", courseLevel);
        formData.append("short_description", "shortDescription");
        formData.append("image", coverImage);
        formData.append("userData", userData);
        keypt.forEach((item) => formData.append("key_points[]", item));
        formData.append("details_description", editorvalue.toString("html"));
        tags.forEach((item) => {
          formData.append("tags[]", item);
        });
        formData.append(
          "created_by",
          localStorage.getItem("currentUserInfo") || 0
        );
        formData.append("special_description", SpecialDescription);
        formData.append("duration", duration);
        formData.append("age_limit", age);
        formData.append("language", courseLanguage);
        formData.append("is_active", true);
        formData.append("region_id", 1);
        if (isEditmode === false) {
          setcreatingCourse(true);

          dispatch(createNewCourse(formData, redirectToDashboard));
        } else {
          dispatch(editCourse(location?.state?.courseInfo?.id, formData));
        }
      } else {
        errorNotification("Please fill all the fields to create a course");
      }
    } else {
      errorNotification("Please accept terms and conditions to proceed");
    }
  };
  const removeBatch = () => {
    dispatch(deleteBatch(clickedEvent.id));
  };
  return (
    <Fragment>
      {isEditmode === false ? (
        <PageHeader
          ghost
          title="Create New Course"
          buttons={[<div key="6" className="page-header-actions"></div>]}
        />
      ) : (
        <></>
      )}
      {isEditmode === false ? (
        <Main style={{ marginTop: "-90px" }}>
          <Row gutter={15}>
            <Col md={24}>
              <Cards headless>
                <CheckoutWrapper>
                  <Steps
                    isswitch
                    current={0}
                    status={"process"}
                    steps={[
                      {
                        title: "Course Details",
                        content: isLoading ? (
                          <Col xs={24}>
                            <div className="spin">
                              <Spin />
                            </div>
                          </Col>
                        ) : (
                          <BasicFormWrapper className="basic-form-inner">
                            <div className="atbd-form-checkout">
                              <Row justify="center">
                                <Col sm={22} xs={24}>
                                  <div className="create-account-form">
                                    <Heading as="h4">
                                      Please Fill your Course Information
                                    </Heading>

                                    <Form
                                      style={{ width: "100%" }}
                                      form={form}
                                      name="info"
                                      onFinish={handleSubmit}
                                    >
                                      <>
                                        <Form.Item
                                          label="Give a Title"
                                          name="courseTitle"
                                          required
                                        >
                                          <Input placeholder="Course title" />
                                        </Form.Item>
                                        <Row>
                                          <Col
                                            lg={11}
                                            md={11}
                                            sm={24}
                                            xs={24}
                                            xxl={11}
                                            xl={11}
                                          >
                                            <Form.Item
                                              label="Select a Category"
                                              name="selectCategory"
                                              required
                                            >
                                              <Select
                                                placeholder="Select a Category"
                                                onChange={
                                                  (value) =>
                                                    categorySelected(value)
                                                  // setSelectedCategory(value)
                                                }
                                              >
                                                {categories?.data?.map(
                                                  (item) => (
                                                    <Option value={item.id}>
                                                      {item.name}
                                                    </Option>
                                                  )
                                                )}
                                              </Select>
                                            </Form.Item>
                                          </Col>
                                          <Col
                                            lg={1}
                                            md={1}
                                            xxl={1}
                                            xl={1}
                                          ></Col>
                                          <Col
                                            // style={{ marginLeft: "10px" }}
                                            lg={12}
                                            md={12}
                                            sm={24}
                                            xs={24}
                                            xxl={12}
                                            xl={12}
                                          >
                                            <Form.Item
                                              label="Select a Sub Category"
                                              name="selectsubCategory"
                                              required
                                            >
                                              <Select
                                                placeholder="Select a Sub Category"
                                                onChange={(value) =>
                                                  setselectedsubcategory(value)
                                                }
                                              >
                                                {filteredSubCat.map((item) => (
                                                  <Option value={item.id}>
                                                    {item.name}
                                                  </Option>
                                                ))}
                                              </Select>
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                        <br />
                                        <Form.Item
                                          label="Course Level"
                                          name="courseLevel"
                                          required
                                        >
                                          <Radio.Group value={1}>
                                            <Radio value={1}>Beginner</Radio>
                                            <Radio value={2}>
                                              Intermediate
                                            </Radio>
                                            <Radio value={3}>Advanced</Radio>
                                          </Radio.Group>
                                        </Form.Item>
                                        {/* <Form.Item
                                          label="Short Description"
                                          name="shortDescription"
                                          required
                                        >
                                          <TextArea
                                            placeholder="Short Description"
                                            rows={3}
                                          />
                                        </Form.Item> */}
                                        <Form.Item
                                          label="Add Cover Image"
                                          name="coverImage"
                                          required
                                        >
                                          {/* <input type="file" onChange={fileChangedHandler1}></input> */}
                                          <Upload
                                            name="coverImage"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={true}
                                            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={() => false}
                                            // beforeUpload={beforeUpload}
                                            onChange={handleChange}
                                          >
                                            {imageUrl ? (
                                              <img
                                                src={imageUrl}
                                                alt="avatar"
                                                style={{ width: "100%" }}
                                              />
                                            ) : (
                                              uploadButton
                                            )}
                                          </Upload>
                                        </Form.Item>
                                        <Form.Item
                                          label="Detailed Description"
                                          name="detailedDescription"
                                          initialValue={editorvalue}
                                          required
                                        >
                                          <RichTextEditor
                                            placeholder="Type here"
                                            value={editorvalue}
                                            onChange={handleRTEChange}
                                          />
                                        </Form.Item>
                                        <Row>
                                          <Col
                                            lg={11}
                                            md={11}
                                            sm={24}
                                            xs={24}
                                            xxl={11}
                                            xl={11}
                                          >
                                            <Form.Item
                                              label="Age Limit"
                                              name="ageLimit"
                                              required
                                            >
                                              {/* <InputNumber
                                                    type="number"
                                                    placeholder="Please provide age limit"
                                                    min={1}
                                                    max={100}
                                                  /> */}
                                              <Select
                                                style={{ width: 120 }}
                                                onChange={handleAgeChange}
                                                placeholder="Please provide age limit"
                                              >
                                                <Option value={4}>4+</Option>
                                                <Option value={8}>8+</Option>
                                                <Option value={12}>12+</Option>
                                                <Option value={16}>16+</Option>
                                                <Option value={18}>
                                                  18+
                                                </Option>{" "}
                                                <Option value={22}>22+</Option>{" "}
                                                <Option value={24}>24+</Option>
                                              </Select>
                                            </Form.Item>
                                          </Col>
                                          <Col
                                            lg={1}
                                            md={1}
                                            xxl={1}
                                            xl={1}
                                          ></Col>
                                          <Col
                                            lg={12}
                                            md={12}
                                            sm={24}
                                            xs={24}
                                            xxl={12}
                                            xl={12}
                                          >
                                            <Form.Item
                                              label="Course Language"
                                              name="courseLanguage"
                                              required
                                            >
                                              <Input placeholder="course language" />
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                        <br />
                                        <Form.Item
                                          label="What you will learn"
                                          name="learnWhat"
                                          required
                                        >
                                          <DynamicList
                                            setkeyPoints={setkeyPoints}
                                            keyPoints={keyPoints}
                                          />
                                          {/*  */}
                                        </Form.Item>
                                        <Form.Item
                                          label="Enter Course Related Keyword"
                                          name="courseReleatedKeyword"
                                          required
                                        >
                                          <EditableTagGroup
                                            tag={tags}
                                            setTags={setTags}
                                          />
                                        </Form.Item>
                                        <Form.Item
                                          label="Special Description"
                                          name="SpecialDescription"
                                          required
                                        >
                                          <TextArea
                                            placeholder="Special Description"
                                            rows={3}
                                          />
                                        </Form.Item>
                                        <Form.Item required>
                                          <div
                                            style={{
                                              display: "grid",
                                              placeItems: "center",
                                              paddingBottom: "40px",
                                            }}
                                          >
                                            <Form.Item
                                              required
                                              name="acceptTerms"
                                            >
                                              <Checkbox
                                                value={tncaccepted}
                                                required
                                                onChange={(value) =>
                                                  settncaccepted(
                                                    value.target.checked
                                                  )
                                                }
                                              >
                                                Accept Terms and Conditions
                                              </Checkbox>
                                            </Form.Item>
                                            <Button
                                              htmlType="submit"
                                              type="primary"
                                            >
                                              Create Course
                                            </Button>
                                          </div>
                                        </Form.Item>
                                      </>
                                    </Form>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </BasicFormWrapper>
                        ),
                      },
                      {
                        title: "Batch Details",

                        content: isBatchLoading ? (
                          <Col xs={24}>
                            <div className="spin">
                              <Spin />
                            </div>
                          </Col>
                        ) : (
                          <Batch
                            form={form}
                            isEventEditMode={isEventEditMode}
                            allBatches={allBatches}
                            batchInfo={batchInfo}
                            setbatchInfo={setbatchInfo}
                            settitle={settitle}
                            setEventTitle={setEventTitle}
                            seteventStartEndDate={seteventStartEndDate}
                            setbatch_day={setbatch_day}
                            setdays={setdays}
                            seteventTimeSlot={seteventTimeSlot}
                            setcanCreateNewBatch={setcanCreateNewBatch}
                            canCreateNewBatch={canCreateNewBatch}
                            createBatch={done}
                            setattendees={setattendees}
                            attendees={setattendees}
                            createdCourseId={
                              isSchedulemode
                                ? courseDetail?.id
                                : createdCourseId
                            }
                          />
                        ),
                      },
                      // {
                      //   title: "Schedule Course",
                      //   content: isBatchLoading ? (
                      //     <Col xs={24}>
                      //       <div className="spin">
                      //         <Spin />
                      //       </div>
                      //     </Col>
                      //   ) : (
                      //     <Fragment>
                      //       <BasicFormWrapper className="basic-form-inner">
                      //         <div className="atbd-form-checkout">
                      //           <Row justify="center">
                      //             <Col sm={22} xs={24}>
                      //               <div className="create-account-form">
                      //                 <Heading as="h4">
                      //                   3. Schedule your course
                      //                 </Heading>
                      //               </div>
                      //             </Col>
                      //           </Row>
                      //         </div>
                      //         <Row>
                      //           <CustomCalender
                      //             onSelect={onSelect}
                      //             EventTitle={EventTitle}
                      //             setEventTitle={setEventTitle}
                      //             eventStartEndDate={eventStartEndDate}
                      //             seteventStartEndDate={seteventStartEndDate}
                      //             currentBatchInfo={currentBatchInfo}
                      //             isEventEditMode={isEventEditMode}
                      //             visible={visible}
                      //             setVisible={setVisible}
                      //             allBatches={allBatches}
                      //             setclickedEvent={setclickedEvent}
                      //             duration={duration}
                      //             setduration={setduration}
                      //             setmonthprice={setmonthprice}
                      //             monthprice={monthprice}
                      //             days={days}
                      //             getBatchInfo={getBatchInfo}
                      //             setdays={setdays}
                      //             eventTimeSlot={eventTimeSlot}
                      //             seteventTimeSlot={seteventTimeSlot}
                      //             batch_type={batch_type}
                      //             batch_day={batch_day}
                      //             end_date={end_date}
                      //             end_time={end_time}
                      //             enroll_last_date={enroll_last_date}
                      //             name={name}
                      //             price={price}
                      //             start_date={start_date}
                      //             start_time={start_time}
                      //             title={title}
                      //             setbatch_type={setbatch_type}
                      //             setbatch_day={setbatch_day}
                      //             setend_date={setend_date}
                      //             setend_time={setend_time}
                      //             setenroll_last_date={setenroll_last_date}
                      //             setname={setname}
                      //             setprice={setprice}
                      //             setstart_date={setstart_date}
                      //             setstart_time={setstart_time}
                      //             settitle={settitle}
                      //             setisEventEditMode={setisEventEditMode}
                      //             deleteBatch={removeBatch}
                      //             editBatch={updateBatch}
                      //           />
                      //         </Row>
                      //       </BasicFormWrapper>
                      //     </Fragment>
                      //   ),
                      // },
                    ]}
                    onNext={next}
                    onPrev={prev}
                    onDone={(e) => done(e)}
                    isSchedulemode={isSchedulemode}
                    // current={curr}
                  />
                </CheckoutWrapper>
              </Cards>
            </Col>
          </Row>
        </Main>
      ) : (
        <Row style={{ marginLeft: "50px", marginRight: "50px" }}>
          <Col lg={24} xs={24}>
            <Cards headless>
              <Row justify="center">
                <Col xl={10} md={16} xs={24}>
                  <div className="user-info-form">
                    <BasicFormWrapper>
                      <Form
                        style={{ width: "100%" }}
                        form={form}
                        name="info"
                        onFinish={handleSubmit}
                      >
                        <div style={{ display: "grid", placeItems: "center" }}>
                          <br />
                          <Heading className="form-title" as="h4">
                            Update the course details
                          </Heading>
                          <br />
                        </div>
                        <>
                          <Form.Item
                            label="Give a Title"
                            name="courseTitle"
                            initialValue={courseDetail?.title || ""}
                          >
                            <Input placeholder="Course title" />
                          </Form.Item>
                          <Row>
                            <Col
                              lg={11}
                              sm={24}
                              xs={24}
                              md={11}
                              xxl={11}
                              xl={11}
                            >
                              <Form.Item
                                label="Select a Category"
                                name="selectCategory"
                                initialValue={parseInt(
                                  courseDetail?.category || 0
                                )}
                              >
                                <Select
                                  placeholder="Select a Category"
                                  onChange={
                                    (value) => categorySelected(value)
                                    // setSelectedCategory(value)
                                  }
                                >
                                  {categories?.data?.map((item) => (
                                    <Option value={item.id}>{item.name}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col
                              lg={1}
                              md={1}
                              sm={1}
                              xs={1}
                              xxl={1}
                              xl={1}
                            ></Col>

                            <Col
                              lg={12}
                              md={12}
                              sm={24}
                              xs={24}
                              xxl={12}
                              xl={12}
                            >
                              {console.log("edit fisldf", filteredSubCat)}
                              <Form.Item
                                label="Select a Sub Category"
                                name="selectsubCategory"
                                initialValue={parseInt(
                                  courseDetail?.sub_category || 0
                                )}
                              >
                                <Select
                                  placeholder="Select a Sub Category"
                                  onChange={(value) =>
                                    setselectedsubcategory(value)
                                  }
                                >
                                  {filteredSubCat.map((item) => (
                                    <Option value={item.id}>{item.name}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                          <br />
                          <Form.Item
                            label="Course Level"
                            name="courseLevel"
                            initialValue={parseInt(
                              courseDetail?.course_level || 0
                            )}
                          >
                            <Radio.Group value={1}>
                              <Radio value={1}>Beginner</Radio>
                              <Radio value={2}>Intermediate</Radio>
                              <Radio value={3}>Advanced</Radio>
                            </Radio.Group>
                          </Form.Item>

                          {/* <Form.Item
                            label="Short Description"
                            name="shortDescription"
                            initialValue={courseDetail?.short_description || ""}
                          >
                            <TextArea
                              placeholder="Short Description"
                              rows={3}
                            />
                          </Form.Item> */}
                          <Form.Item label="Add Cover Image" name="coverImage">
                            <Upload
                              name="coverImage"
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={true}
                              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              beforeUpload={() => false}
                              // beforeUpload={beforeUpload}
                              onChange={handleChange}
                              defaultFileList={[previewCoverImage]}
                              // name="coverImage"
                              // listType="picture-card"
                              // className="avatar-uploader"
                              // showUploadList={false}
                              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              // beforeUpload={beforeUpload}
                              // onChange={handleChange}
                            >
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt="avatar"
                                  style={{ width: "100%" }}
                                />
                              ) : (
                                uploadButton
                              )}
                            </Upload>
                          </Form.Item>
                          {console.log(
                            "the value sent for editing is",
                            editorvalue
                          )}
                          <Form.Item
                            label="Detailed Description"
                            name="detailedDescription"
                            initialValue={editorvalue || ""}
                            required
                          >
                            <RichTextEditor
                              placeholder="Type here"
                              value={editorvalue}
                              format={"html"}
                              onChange={handleRTEChange}
                            />
                            {/* <TextArea
                                  placeholder="Detailed Description"
                                  rows={5}
                                /> */}
                          </Form.Item>
                          <Row>
                            <Col
                              lg={11}
                              sm={24}
                              xs={24}
                              md={11}
                              xxl={11}
                              xl={11}
                            >
                              <Form.Item
                                label="Age Limit"
                                name="ageLimit"
                                required
                                initialValue={parseInt(
                                  courseDetail?.age_limit || 0
                                )}
                              >
                                <Select
                                  style={{ width: 120 }}
                                  onChange={handleAgeChange}
                                  placeholder="Please provide age limit"
                                >
                                  <Option value={4}>4+</Option>
                                  <Option value={8}>8+</Option>
                                  <Option value={12}>12+</Option>
                                  <Option value={16}>16+</Option>
                                  <Option value={18}>18+</Option>{" "}
                                  <Option value={22}>22+</Option>{" "}
                                  <Option value={24}>24+</Option>
                                </Select>
                                {/* <InputNumber
                                      type="number"
                                      placeholder="Please provide age limit"
                                      min={1}
                                      max={100}
                                    /> */}
                              </Form.Item>
                            </Col>
                            <Col
                              lg={1}
                              md={1}
                              sm={1}
                              xs={1}
                              xxl={1}
                              xl={1}
                            ></Col>
                            <Col
                              lg={12}
                              md={12}
                              sm={24}
                              xs={24}
                              xxl={12}
                              xl={12}
                            >
                              <Form.Item
                                label="Course Language"
                                name="courseLanguage"
                                required
                                initialValue={courseDetail?.language || ""}
                              >
                                <Input placeholder="course language" />
                              </Form.Item>
                            </Col>
                          </Row>
                          <br />

                          <Form.Item
                            label="What you will learn"
                            name="learnWhat"
                          >
                            <DynamicList
                              setkeyPoints={setkeyPoints}
                              keyPoints={keyPoints}
                            />
                            {/* <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gridGap: "20px",
                                  }}
                                >
                                  <Input
                                    // defaultValue={courseDetail?.key_points[0]||''}
                                    value={techname1}
                                    onChange={(e) =>
                                      settechname1(e.target.value)
                                    }
                                    placeholder="Skill Name 1"
                                  />
                                  <Input
                                    // defaultValue={courseDetail?.key_points[1]||''}
                                    value={techname2}
                                    onChange={(e) =>
                                      settechname2(e.target.value)
                                    }
                                    placeholder="Skill Name 2"
                                  />
                                  <Input
                                    // defaultValue={courseDetail?.key_points[2]||''}
                                    value={techname3}
                                    onChange={(e) =>
                                      settechname3(e.target.value)
                                    }
                                    placeholder="Skill Name 3"
                                  />
                                  <Input
                                    // defaultValue={courseDetail?.key_points[3]||''}
                                    value={techname4}
                                    onChange={(e) =>
                                      settechname4(e.target.value)
                                    }
                                    placeholder="Skill Name 4"
                                  />
                                  <Input
                                    // defaultValue={courseDetail?.key_points[4]||''}
                                    value={techname5}
                                    onChange={(e) =>
                                      settechname5(e.target.value)
                                    }
                                    placeholder="Skill Name 5"
                                  />
                                  <Input
                                    // defaultValue={courseDetail?.key_points[5]||''}
                                    value={techname6}
                                    onChange={(e) =>
                                      settechname6(e.target.value)
                                    }
                                    placeholder="Skill Name 6"
                                  />
                                </div> */}
                          </Form.Item>
                          <Form.Item
                            label="Enter Course Related Keyword"
                            name="courseReleatedKeyword"
                          >
                            <EditableTagGroup tag={tags} setTags={setTags} />
                            {/* <TextArea
                              placeholder="Enter Course Keyword"
                              rows={2}
                            /> */}
                          </Form.Item>
                          <Form.Item
                            label="Special Description"
                            name="SpecialDescription"
                            initialValue={
                              courseDetail?.special_description || ""
                            }
                          >
                            <TextArea
                              placeholder="Special Description"
                              rows={3}
                            />
                          </Form.Item>
                          <Form.Item>
                            <div
                              style={{
                                display: "grid",
                                placeItems: "center",
                                paddingBottom: "40px",
                              }}
                            >
                              <Form.Item required name="acceptTerms">
                                <Checkbox
                                  value={tncaccepted}
                                  required
                                  onChange={(value) =>
                                    settncaccepted(value.target.checked)
                                  }
                                >
                                  Accept Terms and Conditions
                                </Checkbox>
                              </Form.Item>
                              <Button
                                disabled={tncaccepted ? false : true}
                                htmlType="submit"
                                type="primary"
                              >
                                Update Course
                              </Button>
                            </div>
                          </Form.Item>
                        </>
                      </Form>
                    </BasicFormWrapper>
                  </div>
                </Col>
                <Col span={3} />
              </Row>
            </Cards>
            {/* </div> */}
          </Col>
        </Row>
      )}
      {/* )} */}
    </Fragment>
  );
};

export default CreateCourse;
