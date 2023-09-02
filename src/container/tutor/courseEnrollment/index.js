import React, { useState, useEffect } from "react";
import { Row, Col, Table, Form, Input, Spin } from "antd";
import FeatherIcon from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { FigureCart, ProductTable, CouponForm } from "../../ecommerce/Style";
import { Cards } from "../../../components/cards/frame/cards-frame";
import axiosInstance from "../../../config/axoisconfig";
axiosInstance.defaults.headers.common["xaccesstoken"] = `${localStorage.getItem(
  "token"
) || ""}`;
import Heading from "../../../components/heading/heading";
import { Button } from "../../../components/buttons/buttons";
import { Link, Redirect, useRouteMatch } from "react-router-dom";
import CourseStudentTable from "./CourseStudentTable/index";
import { Main } from "../../styled";
import { Alert } from "antd";

const EnrolledStudents = () => {
  let cartData = [
    {
      key: 1,
      img: "uploads/course/2021-03-25T18:12:06.692ZimageName.jpg",
      paymentrecieved: 100,
      paymentpending: 2343,
      title: "Sample course",
      total: 234,
      courseId: 68,
    },
    {
      key: 2,
      img: "uploads/course/2021-03-25T18:12:06.692ZimageName.jpg",
      paymentrecieved: 100,
      paymentpending: 2343,
      title: "Sample course",
      courseId: 68,
      total: 234,
    },
    {
      key: 3,
      img: "uploads/course/2021-03-25T18:12:06.692ZimageName.jpg",
      paymentrecieved: 100,
      paymentpending: 2343,
      title: "Sample course",
      total: 234,
      courseId: 68,
    },
  ];
  const [isLoading, setisLoading] = useState(false);
  const [productTableData, setproductTableData] = useState([]);
  const [courses, setcourses] = useState([]);
  const [transData, setTransData] = useState([]);
  useEffect(() => {
    setTransData([
      {
        id: 15,
        CourseId: 5,
        BatchId: 11,
        StudentId: 1,
        enrollType: "MONTHLY",
        createdAt: "2021-05-30T07:56:56.271Z",
        updatedAt: "2021-05-30T07:56:56.271Z",
        course_from_enroll_course: {
          id: 5,
          title: "Java Programming Masterclass for Software Developer",
          is_active: true,
          created_by: 4,
        },
        student_from_enroll_course: [
          {
            id: 1,
            full_name: "Lokesh Kumar",
            is_verified: true,
          },
        ],
        batch_from_enroll_course: [
          {
            id: 11,
            name: "4days",
            title: "4days",
            participants_size: 4,
            price: 400,
            total_price: 4000,
            total_duration: 5,
            start_date: "2021-06-01T00:00:00.000Z",
            end_date: "2021-06-03T00:00:00.000Z",
          },
        ],
        duePayment: [
          {
            id: 63,
            status: "PAID_TO_ADMIN",
            amount: 400,
            price: 400,
            transaction_number: 622181,
            transaction_date: "2021-05-30T07:56:50.499Z",
            transaction_due_date: "2021-05-30T00:00:00.000Z",
            createdAt: "2021-05-30T07:56:50.711Z",
          },
          {
            id: 64,
            status: "PAID_TO_ADMIN",
            amount: 400,
            price: 400,
            transaction_number: 620718,
            transaction_date: "2021-05-30T07:56:50.499Z",
            transaction_due_date: "2021-06-30T00:00:00.000Z",
            createdAt: "2021-05-30T07:56:55.707Z",
          },
          {
            id: 65,
            status: "PENDING",
            amount: 400,
            price: 400,
            transaction_number: null,
            transaction_date: "2021-05-30T07:56:50.499Z",
            transaction_due_date: "2021-07-30T00:00:00.000Z",
            createdAt: "2021-05-30T07:57:00.705Z",
          },
          {
            id: 66,
            status: "PENDING",
            amount: 400,
            price: 400,
            transaction_number: null,
            transaction_date: "2021-05-30T07:56:50.499Z",
            transaction_due_date: "2021-08-30T00:00:00.000Z",
            createdAt: "2021-05-30T07:57:05.706Z",
          },
          {
            id: 67,
            status: "PENDING",
            amount: 400,
            price: 400,
            transaction_number: null,
            transaction_date: "2021-05-30T07:56:50.499Z",
            transaction_due_date: "2021-09-30T00:00:00.000Z",
            createdAt: "2021-05-30T07:57:10.707Z",
          },
        ],
      },
    ]);
  }, []);
  useEffect(() => {
    setisLoading(true);
    let URL = "";
    URL =
      "https://api-v2.esculae.com/api/v1/personal/faculty-course-payment-list";
    axiosInstance
      .get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log("the data is for tutor transactions", resp.data);
         setTransData(resp.data.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const courseColumns = [
    { title: "Course", dataIndex: "product", key: "product" },
    // {
    //   title: "Payment Recieved",
    //   dataIndex: "paymentRecieved",
    //   key: "paymentRecieved",
    // },
    // {
    //   title: "Payment Pending",
    //   dataIndex: "paymentPending",
    //   key: "paymentPending",
    // },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    // { title: "Students", dataIndex: "total", key: "total" },
  ];

  useEffect(() => {
    let tmp = [];
    transData.map((data) => {
      let paymentRecivedTotal = 0;
      let paymentPendingTotal = 0;
      data.duePayment.map((item) => {
        if (item.status === "PENDING") {
          paymentPendingTotal = paymentPendingTotal + item.amount;
        } else {
          paymentRecivedTotal = paymentRecivedTotal + item.amount;
        }
      });
      tmp.push({
        key: data.id,
        product: (
          <div className="cart-single">
            <FigureCart>
              {data.course_from_enroll_course?.image ? (
                <img
                  style={{ width: 80, borderRadius: "15px" }}
                  src={
                    "https://api-v2.esculae.com/" +
                    data.course_from_enroll_course?.image
                  }
                  alt=""
                />
              ) : (
                ""
              )}

              <figcaption style={{ marginTop: "20px" }}>
                <div className="cart-single__info">
                  <Link
                    to={`/${window.location.pathname.split('/')[1]}/coursedetail/${data.course_from_enroll_course?.id}`}
                  >
                    <Heading as="h6">
                      {data.course_from_enroll_course?.title}
                    </Heading>
                  </Link>
                  {/* <ul className="info-list">
                  <li>
                    <span className="info-title">Batch :</span>
                    <span>{data.batch.title}</span>
                  </li>
                </ul> */}
                </div>
              </figcaption>
            </FigureCart>
          </div>
        ),

        paymentRecieved: (
          <span className="cart-single-t-price">{paymentRecivedTotal}</span>
        ),
        paymentPending: (
          <span className="cart-single-t-price">{paymentPendingTotal}</span>
        ),

        total: (
          <span className="cart-single-t-price">
            {data.student_from_enroll_course.length}
          </span>
        ),
        duration: (
          <span className="cart-single-t-price">
            {data.batch_from_enroll_course.total_duration}
          </span>
        ),
        // courseId: data.courseId,
      });
    });
    console.log("ther sd", tmp);
    setcourses(tmp);

    // }
  }, [transData]);
  const expandedRow = (row) => {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "50%",
        //   filters: subCategoriesFilterList,
        // filterMultiple: true,
        // onFilter: (value, record) => record.category.indexOf(value) === 0,
        // sorter: (a, b) => a.category.length - b.category.length,
        // sortDirections: ["descend", "ascend"],
      },
      { title: "Batch", dataIndex: "batch", key: "batch", width: "25%" },
      // {
      //   title: "Payment Recieved",
      //   dataIndex: "paymentRecieved",
      //   key: "paymentRecieved",
      //   width: "25%",
      // },
      // {
      //   title: "Payment Pending",
      //   dataIndex: "paymentPending",
      //   key: "paymentPending",
      //   width: "25%",
      // },

      //  { title: "Action", dataIndex: "action", key: "action", width: "25%" },
    ];
    const data = [];
    transData &&
      transData.map((transaction, idx) => {
        if (transaction.id === row.key) {
          // console.log("transaction", transaction);
          data.push({
            key: transaction.student_from_enroll_course.id,
            batch: transaction.batch_from_enroll_course.name,
            name: transaction.student_from_enroll_course.full_name,
            // paymentRecieved: 0,
            // paymentPending: 0,
          });
        }
      });

    return (
      <div style={{ marginBottom: "50px" }}>
        <Alert message="Enrolled students list" type="warning" />
        {/* <center>
          <p>t</p>
        </center> */}
        {data.length > 0 ? (
          <Table
            scroll={{ x: true }}
            loading={isLoading}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        ) : (
          <center>
            <p>No students enrolled yet.</p>
          </center>
        )}
      </div>
    );
  };

  return (
    <Main>
      <Cards title="Enrolled Students List">
        <CourseStudentTable
          expandedRow={expandedRow}
          courseColumns={courseColumns}
          courses={courses}
        />
      </Cards>
    </Main>
  );
};

export default EnrolledStudents;
