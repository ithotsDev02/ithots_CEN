import React, { lazy, Suspense, useState, useEffect } from "react";
import { Row, Col, Skeleton, Spin } from "antd";
import FeatherIcon from "feather-icons-react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageHeader } from "../../components/page-headers/page-headers";
import { Main } from "../styled";
import { Cards } from "../../components/cards/frame/cards-frame";
import { Button } from "../../components/buttons/buttons";
import { ShareButtonPageHeader } from "../../components/buttons/share-button/share-button";
import { ExportButtonPageHeader } from "../../components/buttons/export-button/export-button";
import { CalendarButtonPageHeader } from "../../components/buttons/calendar-button/calendar-button";
import { createTransaction } from "../../redux/course/actionCreator";
import { emptyCart } from "../../redux/cart/actionCreator";
const PaymentSuccess = lazy(() => import("./overview/PaymentSuccess"));
import errorNotification from "../../components/notification/errorNotification";
import axiosInstance from "../../config/axoisconfig";

// import { cartGetData } from '../../redux/cart/actionCreator';
import moment from "moment";

// const Checkout = lazy(() => import("./overview/CheckOut"));
const CartTable = lazy(() => import("./overview/CartTable"));
const Ordersummary = lazy(() => import("./overview/Ordersummary"));

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector((state) => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });
  const cartData = useSelector((state) => state.cart.data);
  const isLoading = useSelector((state) => state.course.loading);
  const studentId = localStorage.getItem("currentUserInfo") || 0;
  const [totalcost, settotalcost] = useState(0);
  const [gst, setgst] = useState(0);
  const [platformcharges, setplatformcharges] = useState(0);
  const [subtotal, setsubtotal] = useState(0);
  const urlParams = new URLSearchParams(window.location.search);
  const paymentdone = urlParams.get("payment") || false;
  const txnid = urlParams.get("transactionId") || "";
  const price = urlParams.get("price") || "";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardno, setcardno] = useState(false);
  const [expiry, setexpiry] = useState(false);
  const [cvv, setcvv] = useState(false);
  const [name, setname] = useState(false);
  const [canCheckout, setcanCheckout] = useState(true);
  const [errmsg, setErrmsg] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [locLoading, setLocLoading] = useState(false);
  useEffect(() => {
    setLocLoading(true);
    var coursesURL =
      "https://api-v2.esculae.com/api/v1/personal/student-enroll-course";
    axiosInstance
      .get(coursesURL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setEnrolledCourses(resp);
        resp?.data?.data.map((course) => {
          cartData.map((data, id) => {
            if (course.CourseId === data.courseInfo.id) {
              setErrmsg(
                `Course Name - ${data.courseInfo.title} is already purchased, and can not be purchased again.`
              );
              setcanCheckout(false);
              setLocLoading(false);

              return;
            }
          });
        });
        setLocLoading(false);

        // console.log("the response is", resp);
      })
      .catch((err) => {
        setLocLoading(false);

        console.log(err);
      });
  }, [cartData]);

  // handleok,
  // handlecancel,
  const saveTxnDetails = (event) => {
    cartData.map((course) => {
      let data = {
        student_id: studentId,
        course_name: course.courseInfo.title,
        student_name: localStorage.getItem("full_name"),
        transaction_date: moment(),
        amount: parseInt(totalcost),
        transaction_number: event.response.orderId,
        gst: parseInt(gst),
        platform_charges: parseInt(platformcharges),
        course_id: course.courseInfo.id,
        //batch and course related info
        title: course.courseInfo.title,
        category: course.courseInfo.category,
        sub_category: course.courseInfo.sub_category,
        course_level: course.courseInfo.course_level,
        duration: course.batch.total_duration,
        language: course.courseInfo.language,
        region_id: 1,
        faculty_id: course.courseInfo.created_by.id,
        faculty_name: course.courseInfo.created_by.full_name,
        name: course.batch.title,
        batch_type: course.batch.type,
        enroll_last_date: moment(),
        price: course.selectedBatchPrice,
        start_date: moment(course.batch.start_date, "DD MMM YYYY").format(
          "MM/DD/YYYY"
        ),
        end_date: moment(course.batch.end_date, "DD MMM YYYY").format(
          "MM/DD/YYYY"
        ),
        enrollType: course.enrollType,
        sub_title: "",
        batch_day: [0, 3],
        batch_id: course.batch.id,
        start_time: moment(course.batch.start_time, "hh:mm A").format("HH:MM"),
        end_time: moment(course.batch.end_time, "hh:mm A").format("HH:MM"),
      };
      dispatch(
        createTransaction(
          course.courseInfo.id || 0,
          data,
          course.batch.id,
          course.enrollType,
          course.courseInfo.created_by.id
        )
      );
    });
  };
  const handleCfResponse = (event) => {
    if (
      event.name == "PAYMENT_RESPONSE" &&
      event.response.txStatus == "SUCCESS"
    ) {
      saveTxnDetails(event);
    } else if (
      event.name == "PAYMENT_RESPONSE" &&
      event.response.txStatus == "CANCELLED"
    ) {
    } else if (
      event.name == "PAYMENT_RESPONSE" &&
      event.response.txStatus == "FAILED"
    ) {
    } else if (event.name == "VALIDATION_ERROR") {
    }
  };
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

  var pc = () => {
    let data = {};
    data.paymentOption = "card";
    data.card = {};
    data.card.number = "4444333322221111";
    data.card.expiryMonth = "07";
    data.card.expiryYear = "23";
    data.card.cvv = "123";
    CashFree.paySeamless(data, postPaymentCallback());
    return false;
  };
  const postPaymentCallback = (event) => {
    console.log(event);
    // if (event.name == "PAYMENT_RESPONSE" && event.status == "SUCCESS") {
    // } else if (
    //   event.name == "PAYMENT_RESPONSE" &&
    //   event.status == "CANCELLED"
    // ) {
    // } else if (event.name == "PAYMENT_RESPONSE" && event.status == "FAILED") {
    // } else if (event.name == "VALIDATION_ERROR") {
    // }
  };

  const payCard = () => {
    CashFree.initPopup(); // This is required for the popup to work even in case of callback.
    axiosInstance
      .get("https://reqres.in/api/users?page=2") // This is an open endpoint.
      .then((response) => {
        console.log(response);
        pc();
      });
  };
  const payBank = (data) => {
    CashFree.initPopup();
    data.paymentOption = "nb";
    data.nb = {};
    data.nb.code = "3002";

    CashFree.paySeamless(data, postPaymentCallback);
    return false;
  };
  const payWallet = (data) => {
    data.paymentOption = "wallet";
    data.wallet = {};
    data.wallet.code = 4001;

    CashFree.paySeamless(data, postPaymentCallback);
    return false;
  };
  const payUpi = (data) => {
    data.paymentOption = "upi";
    data.upi = {};
    data.upi.vpa = 3244;

    CashFree.paySeamless(data, postPaymentCallback);
    return false;
  };
  const checkout = () => {
    if (canCheckout === true) {
      if (isLoggedIn) {
        setIsModalVisible(true);
      } else {
        errorNotification("Please login to purchase this course");
      }
    } else {
      errorNotification(errmsg);
    }
  };
  const checkifEnrolled = (courseId) => {
    console.log("sham", enrolledCourses);
    enrolledCourses.map((course) => {
      console.log("the id sent are", course.CourseId, "asdasd", courseId);
      if (course.CourseId === courseId) {
        return true;
      }
    });
    return false;
  };
  const handlePayment = () => {
    //cashfree integration
    let randTxnID = Math.floor(100000 + Math.random() * 900000);
    const coursesURL =
      "https://api-v2.esculae.com/api/v1/course/calculateSecretKey";
    axiosInstance
      .post(
        coursesURL,
        JSON.stringify({
          formObj: {
            orderId: randTxnID,
            orderAmount: totalcost,
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
          orderAmount: totalcost,
          orderCurrency: "INR",
          orderId: randTxnID,
          paymentOption: "card",
          paymentToken: resp.data.additionalFields.paymentToken,
        };
        setIsModalVisible(false);

        CashFree.initPopup();
        CashFree.paySeamless(dummyData, (data) => {
          handleCfResponse(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePaymentcancel = () => {
    setIsModalVisible(false);
  };
  const { path, isExact } = useRouteMatch();
  const [state, setState] = useState({
    coupon: 0,
    promo: 0,
    current: 0,
  });
  useEffect(() => {
    let subtotal = 0;
    let gst = 0;
    let platformcharges = 0;
    let total = 0;
    cartData.map((item) => {
      subtotal =
        subtotal +
        (item.selectedBatchPrice -
          (2 / item.selectedBatchPrice) * 100 -
          (18 / item.selectedBatchPrice) * 100);
      gst = gst + (18 / item.selectedBatchPrice) * 100;
      platformcharges = platformcharges + (2 / item.selectedBatchPrice) * 100;
      total = total + item.selectedBatchPrice;
    });
    settotalcost(total);
    setgst(gst);
    setplatformcharges(platformcharges);
    setsubtotal(subtotal);
  }, [cartData]);
  // useEffect(() => {
  //   if (cartGetData) {
  //     dispatch(cartGetData());
  //   }
  // }, [dispatch]);

  // let subtotal = 0;

  // if (cartData !== null) {
  //   cartData.map((data) => {
  //     const { quantity, price } = data;
  //     subtotal += parseInt(quantity, 10) * parseInt(price, 10);
  //     return subtotal;
  //   });
  // }

  const onHandleCurrent = (current) => {
    setState({
      ...state,
      current,
    });
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Row>
          <Col xs={24}>
            <div className="spin">
              <Spin />
            </div>
          </Col>
        </Row>
      ) : (
        !paymentdone && (
          <div style={{ marginTop: "-4%" }}>
            <PageHeader
              ghost
              title="Your cart"
          
            />
            <Main>
              <div className={isExact ? "cartWraper" : "checkoutWraper"}>
                <Row gutter={15}>
                  <Col md={24}>
                    <Cards headless>
                      <Row gutter={30}>
                        <Col xxl={17} xs={24}>
                          <Switch>
                            <Suspense
                              fallback={
                                <Cards headless>
                                  <Skeleton paragraph={{ rows: 10 }} active />
                                </Cards>
                              }
                            >
                              {/* <Route
                          path={`${path}/checkout`}
                          render={() => (
                            <Checkout onCurrentChange={onHandleCurrent} />
                          )}
                        /> */}
                              <Route
                                exact
                                path={path}
                                component={() => (
                                  <CartTable cartData={cartData} />
                                )}
                              />
                            </Suspense>
                          </Switch>
                        </Col>
                        <Col xxl={7} xs={24}>
                          <Suspense
                            fallback={
                              <Cards headless>
                                <Skeleton paragraph={{ rows: 10 }} active />
                              </Cards>
                            }
                          >
                            {locLoading ? (
                              <Cards headless>
                                <Skeleton paragraph={{ rows: 10 }} active />
                              </Cards>
                            ) : (
                              <Ordersummary
                                totalcost={totalcost}
                                canCheckout={canCheckout}
                                errmsg={errmsg}
                                gst={gst}
                                subtotal={subtotal}
                                platformcharges={platformcharges}
                                checkout={checkout}
                                isModalVisible={isModalVisible}
                                setcardno={setcardno}
                                setexpiry={setexpiry}
                                setcvv={setcvv}
                                setname={setname}
                                handleok={handlePayment}
                                handlecancel={handlePaymentcancel}
                              />
                            )}
                          </Suspense>
                        </Col>
                      </Row>
                    </Cards>
                  </Col>
                </Row>
              </div>
            </Main>
          </div>
        )
      )}
      {paymentdone == "success" ? (
        <div style={{ marginTop: "-4%" }}>
          <Main>
            <Row gutter={15}>
              <Col md={24}>
                <Cards headless>
                  <Row gutter={30}>
                    <Col xxl={17} xs={24}>
                      <PaymentSuccess transactionId={txnid} price={price} />
                    </Col>
                  </Row>
                </Cards>
              </Col>
            </Row>
          </Main>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ShoppingCart;
