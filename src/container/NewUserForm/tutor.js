import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Input, Upload, Select } from "antd";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import countryData from "../../utility/countryStateData.json";
import { Radio } from "antd";
import { BasicFormWrapper } from "../styled";
import { Button } from "../../components/buttons/buttons";
import Heading from "../../components/heading/heading";
import { Cards } from "../../components/cards/frame/cards-frame";
import { Main } from "../styled";
import { PageHeader } from "../../components/page-headers/page-headers";
import { DatePicker } from "antd";
import MultiSelect from "../../components/multiSelect/index";
import { createNewStudent } from "../../redux/student/actionCreator";
import { createNewTutorProfile } from "../../redux/tutor/actionCreator";
import moment from "moment";
import axiosInstance from "../../config/axoisconfig";
const { Option } = Select;
const { TextArea } = Input;
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./style.css";

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
  BannerCta3,
} from "../../components/banners/Banners";

const RegistrationForm = ({ type }) => {
  const currentUserId = localStorage.getItem("currentUserInfo");
  const [form] = Form.useForm();
  const [Employment, setEmployment] = useState("");
  const [country, setcountry] = useState("");
  const [states, setstates] = useState("");
  const [selectedcountry, setselectedcountry] = useState("");
  const [selectedstate, setselectedstate] = useState("");
  const [child, setChild] = useState([]);
  const [loading, setloading] = useState(false);
  const [coverImage, setcoverImage] = useState("");
  const [DOB, setDOB] = useState("");
  const [imageUrl, setimageUrl] = useState();
  const [isImageselected, setisImageselected] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);
  const [imgurl, setimgurl] = useState("");
  const [prevprofileurl, setprevprofileurl] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [tutorinfo, settutorinfo] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "tutor") {
      let url =
        "https://api.esculae.com/api/v1/personal/faculty/" + currentUserId ||
        0;
      axiosInstance
        .get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          settutorinfo(resp.data);
          setprevprofileurl(resp.data.image);
          let usrImage = "";
          if (resp.data.image && resp.data.image !== undefined) {
            usrImage = "https://api.esculae.com/" + resp.data.image;
          }
          setimgurl(usrImage);
          setDOB(moment(resp.data.dob));
          console.log("dasdasfgads", resp.data);
          form.setFieldsValue({
            fullname: resp.data.full_name,
            displayname: resp.data.display_name,
            email: resp.data.email,
            phone: resp.data.mobile,
            whatsappphone: resp.data.whatsapp,
            address: resp.data.address,
            city: resp.data.city,
            country: resp.data.country,
            pin: resp.data.pincode,
            experience: resp.data.relavant_experiance,
            gender: resp.data.gender,
            about: resp.data.about,
            qualification: resp.data.qualification,
            dob:
              resp.data.dob !== null &&
              resp.data.dob !== "" &&
              resp.data.dob !== undefined
                ? moment(resp.data.dob)
                : "",
            // selectedCategoryIds.length > 0 &&
            certifications: resp.data.certification,
            employer: resp.data.employment_details,
            //  employmentType:resp.data.,
            // coverImage
            //     email: resp.data.email,
          });
          console.log("the info is", resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "student") {
      let url =
        "https://api.esculae.com/api/v1/personal/student/" + currentUserId ||
        0;
      axiosInstance
        .get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          settutorinfo(resp.data);
          setprevprofileurl(resp.data.image);
          let usrImage = "";
          if (resp.data.image && resp.data.image !== undefined) {
            usrImage = "https://api.esculae.com/" + resp.data.image;
          }
          setimgurl(usrImage);
          setDOB(moment(resp.data.dob || ""));
          form.setFieldsValue({
            fullname: resp.data.full_name,
            displayname: resp.data.display_name,
            email: resp.data.email,
            phone: resp.data.mobile,
            whatsappphone: resp.data.whatsapp,
            address: resp.data.address,
            city: resp.data.city,
            country: resp.data.country,
            pin: resp.data.pincode,
            experience: resp.data.relavant_experiance,
            gender: resp.data.gender,
            about: resp.data.about,
            qualification: resp.data.qualification,
            dob:
              resp.data.dob !== "" &&
              resp.data.dob !== undefined &&
              resp.data.dob !== null
                ? moment(resp.data.dob)
                : "",
            // selectedCategoryIds.length > 0 &&
            certifications: resp.data.certification,
            employer: resp.data.employment_details,
            //  employmentType:resp.data.,
            // coverImage
            //     email: resp.data.email,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    if (tutorinfo) {
      if (tutorinfo && tutorinfo.image && tutorinfo.image != undefined) {
        toDataURL("https://api.esculae.com/" + tutorinfo?.image).then(
          (dataUrl) => {
            var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
            console.log("after image fiel;", fileData);
            setcoverImage(fileData);
          }
        );
      }
    }
  }, [tutorinfo]);
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: "image/jpeg" });
  }
  useEffect(() => {
    let categories = [];
    let url = "https://api.esculae.com/api/v1/course/category";
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    let states = countryData.countries.filter(
      (country) => country.country === selectedcountry
    );
    setstates(states[0] || []);
  }, [selectedcountry]);
  const handleChange = (value) => {
    setSelectedCategoryIds(value);
  };
  const handleSubmit = (values) => {
    if (type === "tutor") {
      let formData = new FormData();
      formData.append("full_name", values.fullname || "");
      formData.append("display_name", values.displayname || "");
      formData.append("email", values.email || "");
      formData.append("mobile", values.phone || "");
      formData.append("whatsapp", values.whatsappphone || "");
      formData.append("address", values.address || "");
      formData.append("city", values.city || "");
      formData.append("country", values.country || "");
      formData.append("pincode", values.pin || "");
      formData.append("gender", values.gender || "");
      formData.append("about", values.about || "");
      formData.append("qualification", values.qualification || "");
      formData.append("certification", values.certifications || "");
      // formData.append("dob", DOB.format("MM/DD/YYYY") || "") || "";
      formData.append("relavant_experiance", values.experience || "");
      formData.append("current_status", true);
      formData.append("employment_details", values.employer || "");
      formData.append("image", coverImage || "");
      formData.append("region_id", 1);
      dispatch(createNewTutorProfile(formData, currentUserId || 0));
    } else if (type === "student") {
      let formData = new FormData();
      formData.append("full_name", values.fullname || "");
      formData.append("display_name", values.displayname || "");
      formData.append("email", values.email || "");
      formData.append("mobile", values.phone || "");
      formData.append("whatsapp", values.whatsappphone || "");
      formData.append("address", values.address || "");
      formData.append("city", values.city || "");
      formData.append("country", values.country || "");
      formData.append("pincode", values.pin || "");
      formData.append("gender", values.gender || "");
      formData.append("about", values.about || "");
      formData.append("qualification", values.qualification || "");
      // formData.append(
      //   "dob",
      //   DOB !== undefined && DOB !== null && DOB !== ""
      //     ? DOB.format("MM/DD/YYYY")
      //     : ""
      // );
      formData.append("ProfessionalId", 1);
      formData.append("image", coverImage || "");
      formData.append("region_id", 1);
      dispatch(createNewStudent(formData, currentUserId || 0));
      // } else {
      //   alert("Please fill all the fields");
      // }
    }
  };
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
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      if (!file) {
        console.log("No file");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }
    });
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
  const handleImgChange = async (info) => {
    if (info.fileList?.length > 0) {
      const isJpgOrPng =
        info.file.type === "image/jpeg" || info.file.type === "image/png";
      const isLt2M = info.file.size / 1024 / 1024 < 2;

      if (!isJpgOrPng) {
        errorNotification("You can only upload JPG/PNG file!");
      } else if (!isLt2M) {
        errorNotification("Image must smaller than 2MB!");
      } else {
        if (info.file) {
          setimgurl(await toBase64(info.file));
        }
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
    }
  };

  return (
    <Fragment>
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards title="Personal Information">
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
                        <br />
                        <Row gutter="25">
                          <Col sm={24} xs={24} md={10} lg={10} xxl={10}>
                            <Form.Item
                              label="Profile Photo"
                              name="profilePhoto"
                              required
                            >
                              <Upload
                                name="coverImage"
                                listType="picture"
                                className="avatar-uploader"
                                showUploadList={true}
                                maxCount={1}
                                onRemove={() => setimgurl("")}
                                // disabled={imageUrl}
                                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={() => false}
                                // beforeUpload={beforeUpload}
                                onChange={handleImgChange}
                              >
                                {
                                  <div className="container">
                                    <img
                                      className="image"
                                      src={
                                        imgurl !== ""
                                          ? imgurl
                                          : require("../../static/img/avatar/profileImage.png")
                                      }
                                      style={{ borderRadius: "50%" }}
                                      alt="No Image"
                                      height="150px"
                                      width="150px"
                                    />
                                    <div class="middle">
                                      <div class="text">Change Photo</div>
                                    </div>
                                  </div>
                                }
                              </Upload>
                            </Form.Item>
                          </Col>
                          <Col sm={24} xs={24} md={14} lg={14} xxl={14}>
                            <Form.Item label="Full Name" name="fullname">
                              <Input placeholder="Your Name" />
                            </Form.Item>
                            <Form.Item label="Display Name" name="displayname">
                              <Input placeholder="Enter the name you want to get displayed" />
                            </Form.Item>
                          </Col>

                          {/* <input type="file" onChange={fileChangedHandler1}></input> */}
                        </Row>

                        <Form.Item
                          label="Email Address"
                          name="email"
                          rules={[
                            {
                              message: "Please input your email!",
                              type: "email",
                            },
                          ]}
                        >
                          <Input
                            disabled={true}
                            placeholder="name@example.com"
                          />
                        </Form.Item>

                        <Row gutter={25}>
                          <Col sm={24} xs={24} md={12} lg={12} xxl={12}>
                            <Form.Item
                              name="whatsappphone"
                              label="Mobile / Whatsapp Number"
                              rules={[
                                {
                                  message: "Please enter whatsapp number",
                                  required: true,
                                },
                              ]}
                            >
                              <Input placeholder="+91 3242133213" />
                            </Form.Item>
                          </Col>{" "}
                          <Col sm={24} xs={24} md={12} lg={12} xxl={12}>
                            <Form.Item
                              name="phone"
                              label="Phone Number"
                              rules={[{ message: "Please enter phone number" }]}
                            >
                              <Input placeholder="+91 3243243213" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <br />

                        <Form.Item name="address" label="Address">
                          <Input placeholder="No. 3 XYZ Nagar" />
                        </Form.Item>
                        <Row gutter={25}>
                          <Col sm={24} xs={24} md={12} lg={12} xxl={12}>
                            <Form.Item
                              name="country"
                              initialValue=""
                              label="Country"
                            >
                              <Select
                                placeholder="India"
                                onChange={(value) => setselectedcountry(value)}
                                style={{ width: "100%" }}
                              >
                                {countryData.countries.map((country) => (
                                  <Option value={country.country}>
                                    {country.country}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col sm={24} xs={24} md={12} lg={12} xxl={12}>
                            <Form.Item initialValue="" name="city" label="City">
                              <Select style={{ width: "100%" }}>
                                {states?.states?.map((st) => (
                                  <Option value={st}>{st}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        <br />

                        <Row gutter={25}>
                          <Col sm={24} xs={24} md={12} lg={12} xxl={12}>
                            <Form.Item
                              name="pin"
                              label="PinCode"
                              rules={[{ message: "Please enter pin code" }]}
                            >
                              <Input placeholder="412 324" />
                            </Form.Item>
                          </Col>
                          <Col sm={24} xs={24} md={12} lg={12} xxl={12}>
                            <Form.Item
                              name="qualification"
                              label="Qualification"
                            >
                              <Input placeholder="BA, MA, B.Tech" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <br />

                        <Form.Item initialValue="" name="gender" label="Gender">
                          <Select style={{ width: "100%" }}>
                            <Option value="">Please Select</Option>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item initialValue="" name="about" label="About">
                          <TextArea rows={4} />
                        </Form.Item>

                        {type == "tutor" && (
                          <Form.Item
                            initialValue=""
                            name="certifications"
                            label="Certifications"
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                        )}
                        {/* {type == "tutor" && (
                          <Form.Item
                            initialValue=""
                            name="categories"
                            label="Add Categories"
                          >
                            {" "}
                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Select a Category"
                              onChange={
                                (value) => setSelectedCategoryIds(value)
                                // setSelectedCategory(value)
                              }
                            >
                              {categories?.data?.map((item) => (
                                <Option value={item.id}>{item.name}</Option>
                              ))}
                            </Select>
                         
                          </Form.Item>
                        )} */}
                        {type == "tutor" && (
                          <Form.Item
                            initialValue=""
                            name="experience"
                            label="Relevent Experiences"
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                        )}
                        {/*   <Form.Item
                          // initialValue={moment()}
                          name="dob"
                          label="Date Of Birth"
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            value={moment()}
                            onChange={(date) => setDOB(date)}
                          />
                     </Form.Item>*/}

                        {/*  {type == "tutor" && (
                          <Form.Item
                            initialValue=""
                            name="professional"
                            label="Professional Experience"
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                      )}*/}
                        {type === "tutor" && (
                          <>
                            {/* <Form.Item
                              name="employmentType"
                              label="Employement Status"
                            >
                              <Radio.Group
                                name="radiogroup"
                                value={Employment}
                                onChange={(e) => setEmployment(e.target.value)}
                              >
                                <Radio value={"employed"}>Employed</Radio>
                                <Radio value={"selfemployed"}>
                                  Self Employed
                                </Radio>
                              </Radio.Group>
                            </Form.Item> */}
                            {/* {Employment != "" ? (
                              Employment === "employed" ? ( */}
                            <Form.Item
                              name="employer"
                              label="Employement Detail"
                            >
                              <Input placeholder="Google" />
                            </Form.Item>
                            {/* ) : (
                                <Form.Item
                                  initialValue=""
                                  name="selfemployement"
                                  label="Self Employed Details"
                                >
                                  <TextArea rows={4} />
                                </Form.Item> */}
                            {/* )
                            ) : null} */}
                          </>
                        )}

                        <Form.Item>
                          <div className="add-user-bottom text-right">
                            {/*  <Button
                              className="ant-btn ant-btn-light"
                              onClick={() => {
                                return form.resetFields();
                              }}
                            >
                              Reset
                            </Button>*/}
                            <Button
                              style={{ marginLeft: "5%" }}
                              htmlType="submit"
                              type="primary"
                            >
                              {/* <Link to="work">Create </Link> */}
                              Save
                            </Button>
                          </div>
                        </Form.Item>
                      </Form>
                    </BasicFormWrapper>
                  </div>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </Fragment>
  );
};

export default RegistrationForm;
