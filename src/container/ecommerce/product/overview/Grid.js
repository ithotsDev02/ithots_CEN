import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Pagination, Spin } from "antd";
import { useSelector } from "react-redux";
import ProductCards from "./ProductCards";
import Heading from "../../../../components/heading/heading";
import successNotification from "../../../../components/notification/successNotification";

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
} from "../../../../components/banners/Banners";
import { PaginationWrapper, NotFoundWrapper } from "../../Style";
import NotFound from "../../../pages/404";
import PaymentDetailModal from "./paymentDetailModal";
import PaymentModal from "../../overview/PaymentModal";
import axiosInstance from "../../../../config/axoisconfig";
import moment from "moment";
const Grid = ({
  isTutor,
  courseList,
  showModal,
  calledFrom,
  EnableDisableCourse,
  onHandlePageChange,
  totalPages,
  currentPage,
  isLoading,
  totalCourses,
  batchInfo,
  allInfo,
  paymentDetails,
  categories,
  dueCount,
  getInstallmentData,
  enrolledCourseIds,
}) => {
  const [courses, setCourses] = useState([]);
  const [isLoader, setisLoader] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isPaymentModalVisible, setisPaymentModalVisible] = useState(false);
  const [cardno, setcardno] = useState("");
  const [expiry, setexpiry] = useState("");
  const [name, setname] = useState("");
  const [cvv, setcvv] = useState("");
  // const []
  const [coursePaymentInfo, setcoursePaymentInfo] = useState({});
  useEffect(() => {
    const config = {};
    config.layout = {};
    config.checkout = "transparent";
    config.mode = "TEST";
    let response = CashFree.init(config);
    if (response.status !== "OK") {
      alert("Please try again in some time !!");
    }
  }, []);
  useEffect(() => {
    let courseInfo = [];
    courseList.map((course) => {
      if (enrolledCourseIds.includes(course.id) === false) {
        courseInfo.push(course);
      }
    });
    setCourses(courseInfo);
  }, []);

  const showallDues = () => {
    setisModalVisible(true);
  };
  const handleOk = () => {
    setisModalVisible(false);
  };
  const handleCancel = () => {
    setisModalVisible(false);
  };
  const checkout = (coursepaidfor, emi) => {
    setcoursePaymentInfo({ course: coursepaidfor, payment: emi });
    setisModalVisible(false);
    setisPaymentModalVisible(true);
  };

  const saveTxnDetails = (event) => {
    let id = coursePaymentInfo.payment.id;
    const coursesURL =
      "https://api.esculae.com/api/v1/course/transactions/" + id;
    axiosInstance
      .put(
        coursesURL,
        { status: "PAID_TO_ADMIN", transaction_number: event.response.orderId, transaction_date: moment() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        successNotification("Installment Paid Successfully");
        getInstallmentData();
      });
  };
  const handleCfResponse = (event) => {
    if (
      event.name == "PAYMENT_RESPONSE" &&
      event.response?.txStatus == "SUCCESS"
    ) {
      saveTxnDetails(event);
    } else if (
      event.name == "PAYMENT_RESPONSE" &&
      event.response?.txStatus == "CANCELLED"
    ) {
    } else if (
      event.name == "PAYMENT_RESPONSE" &&
      event.response?.txStatus == "FAILED"
    ) {
    } else if (event.name == "VALIDATION_ERROR") {
    }
  };
  const handlePayment = () => {
    //cashfree integration
    let randTxnID = Math.floor(100000 + Math.random() * 900000);
    const coursesURL =
      "https://api.esculae.com/api/v1/course/calculateSecretKey";
    axiosInstance
      .post(
        coursesURL,
        JSON.stringify({
          formObj: {
            orderId: randTxnID,
            orderAmount: coursePaymentInfo.payment.amount,
            customerName: localStorage.getItem("full_name") || "admin",
            customerEmail:
              localStorage.getItem("username") || "lokeshkumar824@gmail.com",
            customerPhone: "1234512345",
          },
          paymentType: "SEAMLESSBASIC",
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(
          "Payment response",
          resp.data.additionalFields.paymentToken
        );
        let dummyData = {
          appId: "617218098bb2206b248bc53b412716",
          card: {
            number: cardno || "4444333322221111",

            // number: "4444333322221111",
            holder: localStorage.getItem("full_name") || "admin",
            cvv: cvv || "123",
            expiryMonth: moment(expiry).format("MM") || "04",
            expiryYear: moment(expiry).format("YYYY") || "2023",
          },
          customerEmail:
            localStorage.getItem("username") || "lokeshkumar824@gmail.com",
          customerName: localStorage.getItem("full_name") || "admin",
          customerPhone: "1234512345",
          notifyUrl: "",
          orderAmount: coursePaymentInfo.payment.amount,
          orderCurrency: "INR",
          orderId: randTxnID,
          paymentOption: "card",
          paymentToken: resp.data.additionalFields.paymentToken,
        };
        setisPaymentModalVisible(false);
        CashFree.initPopup();
        CashFree.paySeamless(dummyData, (data) => {
          handleCfResponse(data);
        });
      })
      .catch((err) => {
        console.log("dsadasdasd", err);
      });
  };
  return (
    <Fragment>
      <PaymentModal
        isModalVisible={isPaymentModalVisible}
        setcardno={setcardno}
        setexpiry={setexpiry}
        setcvv={setcvv}
        setname={setname}
        handleok={handlePayment}
        handlecancel={handleCancel}
      />
      <PaymentDetailModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        paymentDetails={paymentDetails}
        checkout={checkout}
      />
      {calledFrom == "Student" && dueCount > 0 && (
        <Row>
          <Col xxl={24} xs={24}>
            <Banner2
              onClick={showallDues}
              paymentDetails={paymentDetails}
              dueCount={dueCount}
            />
          </Col>
        </Row>
      )}

      <Row
        style={{
          marginTop: "20px",
          marginLeft:
            isTutor || calledFrom == "admin" || calledFrom == "profilepage"
              ? // ||
              // calledFrom == "Student" ||
              // calledFrom == "studentAllCourses"
              "0%"
              : "10%",
          marginRight:
            isTutor || calledFrom == "admin" || calledFrom == "profilepage"
              ? // ||
              // calledFrom == "Student" ||
              // calledFrom == "studentAllCourses"
              "0%"
              : "10%",
        }}
        gutter={30}
      >
        {isLoading ? (
          <Col xs={24}>
            <div className="spin">
              <Spin />
            </div>
          </Col>
        ) : (
          <Fragment>
            {localStorage.getItem("USR_ROLE") === "tutor" ||
              localStorage.getItem("USR_ROLE") === "admin" ? (
              <>
                {courses && courses.length ? (
                  courses.map((course, idx) => {
                    return (
                      <Col
                        style={{ maxWidth: "350px" }}
                        xxl={
                          isTutor || calledFrom == "admin"
                            ? 8
                            : calledFrom == "profilepage" ||
                              calledFrom == "Student"
                              ? 8
                              : 6
                        }
                        xl={
                          isTutor || calledFrom == "admin"
                            ? 8
                            : calledFrom == "profilepage" ||
                              calledFrom == "Student"
                              ? 8
                              : 8
                        }
                        md={
                          isTutor || calledFrom == "admin"
                            ? 8
                            : calledFrom == "profilepage" ||
                              calledFrom == "Student"
                              ? 8
                              : 12
                        }
                        lg={
                          isTutor || calledFrom == "admin"
                            ? 8
                            : calledFrom == "profilepage" ||
                              calledFrom == "Student"
                              ? 8
                              : 8
                        }
                        sm={12}
                        xs={24}
                        key={course.id}
                      >
                        <ProductCards
                          isTutor={isTutor}
                          course={course}
                          batchInfo={batchInfo[idx]}
                          showModal={showModal}
                          categories={categories}
                          allInfo={"SAs"}
                          calledFrom={calledFrom}
                          EnableDisableCourse={EnableDisableCourse}
                        />
                      </Col>
                    );
                  })
                ) : (
                  <Col md={24}>
                    <NotFound />
                  </Col>
                )}
              </>
            ) : (
              <>
                {courses && courses.length ? (
                  courses.map((course, idx) => {
                    return (
                      course.is_active == true && (
                        <Col
                          style={{ maxWidth: "350px" }}
                          xxl={
                            isTutor || calledFrom == "admin"
                              ? 8
                              : calledFrom == "profilepage" ||
                                calledFrom == "Student"
                                ? 8
                                : 6
                          }
                          xl={
                            isTutor || calledFrom == "admin"
                              ? 8
                              : calledFrom == "profilepage" ||
                                calledFrom == "Student"
                                ? 8
                                : 8
                          }
                          md={
                            isTutor || calledFrom == "admin"
                              ? 8
                              : calledFrom == "profilepage" ||
                                calledFrom == "Student"
                                ? 8
                                : 12
                          }
                          lg={
                            isTutor || calledFrom == "admin"
                              ? 8
                              : calledFrom == "profilepage" ||
                                calledFrom == "Student"
                                ? 8
                                : 8
                          }
                          sm={12}
                          xs={24}
                          key={course.id}
                        >
                          <ProductCards
                            isTutor={isTutor}
                            course={course}
                            batchInfo={batchInfo[idx]}
                            showModal={showModal}
                            calledFrom={calledFrom}
                            categories={categories}
                            allInfo={allInfo}
                            paymentDetails={paymentDetails}
                            EnableDisableCourse={EnableDisableCourse}
                          />
                        </Col>
                      )
                    );
                  })
                ) : (
                  <Col md={24}>
                    <NotFound />
                  </Col>
                )}
              </>
            )}
          </Fragment>
        )}
        <Col xs={24} className="pb-30">
          <PaginationWrapper style={{ marginTop: 10 }}>
            {courses && courses.length ? (
              <Pagination
                onChange={onHandlePageChange}
                // showSizeChanger
                // onShowSizeChange={totalPages}
                pageSize={12}
                // defaultPageSize={2}
                // defaultCurrent={1}
                // total={totalPages}
                defaultCurrent={currentPage}
                total={totalCourses}
              />
            ) : null}
          </PaginationWrapper>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Grid;
