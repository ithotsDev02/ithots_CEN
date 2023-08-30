import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "antd";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { Main } from "../../styled";
import moment from "moment";
import axiosInstance from "../../../config/axoisconfig";
axiosInstance.defaults.headers.common["xaccesstoken"] = `${localStorage.getItem(
  "token"
) || ""}`;
import CustomTable from "../../../components/datatable/index";
function TransactionTables({ from }) {
  const [isLoading, setisLoading] = useState(false);
  const [transactions, settransactions] = useState([]);
  const [tbldata, settbldata] = useState([]);
  const studentId = localStorage.getItem("currentUserInfo") || 0;
  useEffect(() => {
    setisLoading(true);
    let URL = "";
    if (from == "admin") {
      URL = "https://api.esculae.com/api/v1/course/transactions";
    } else {
      URL = "https://api.esculae.com/api/v1/course/transactions/" + studentId;
    }
    axiosInstance
      .get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        settransactions(from == "admin" ? resp.data.data : resp.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const studentcolumns = [
    {
      title: "Transaction Date",
      dataIndex: "tdate",
      key: "tdate",
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
      sorter: (a, b) => moment(a.tdate) - moment(b.tdate),
    },
    {
      title: "Due Date",
      dataIndex: "ddate",
      key: "ddate",
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
      sorter: (a, b) => moment(a.ddate) - moment(b.ddate),
    },
    {
      title: "Course Name",
      dataIndex: "cname",
      key: "cname",
    },
    {
      title: "Batch Name",
      dataIndex: "bname",
      key: "bname",
    },
    {
      title: "Tutor Name",
      dataIndex: "tname",
      key: "tname",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Transaction Id",
      dataIndex: "tid",
      key: "tid",
      sortDirections: ["descend", "ascend"],

      sorter: (a, b) => a.tid - b.tid,
    },
  ];
  const admincolumns = [
    {
      title: "Transaction Date",
      dataIndex: "tdate",
      key: "tdate",
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
      sorter: (a, b) => moment(a.tdate) - moment(b.tdate),
    },
    {
      title: "Due Date",
      dataIndex: "ddate",
      key: "ddate",
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
      sorter: (a, b) => moment(a.ddate) - moment(b.ddate),
    },
    {
      title: "Student Name",
      dataIndex: "sname",
      key: "sname",
    },
    {
      title: "Tutor Name",
      dataIndex: "tname",
      key: "tname",
    },
    {
      title: "Course Name",
      dataIndex: "cname",
      key: "cname",
    },
    {
      title: "Batch Name",
      dataIndex: "bname",
      key: "bname",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Transaction Id",
      dataIndex: "tid",
      key: "tid",
      sortDirections: ["descend", "ascend"],

      sorter: (a, b) => a.tid - b.tid,
    },
  ];
  useEffect(() => {
    if (transactions.length > 0) {
      let tmptbl = [];
      transactions.map((item) => {
        if (
          item.transaction_number !== "" &&
          item.transaction_number !== null
        ) {
          tmptbl.push({
            key: item.id,
            tdate: moment(item.transaction_date).format("DD-MM-YYYY HH:MM:SS"),
            ddate: item.transaction_due_date
              ? moment(item.transaction_due_date).format("DD-MM-YYYY HH:MM:SS")
              : "-",
            cname: item.course_name,
            bname: item.name,
            sname: item.student_name,

            tname: item.faculty_name,
            // cname: "Python for data science",
            amount: item.amount,
            tid: item.transaction_number,
          });
        }
      });
      settbldata(tmptbl);
    }
  }, [transactions]);

  return (
    <Main>
      {/* <Cards headless></Cards> */}
      <Row>
        <Col xs={24}>
          <Cards title="Transaction History">
            <CustomTable
              columns={from == "admin" ? admincolumns : studentcolumns}
              data={tbldata}
              loading={isLoading}
            ></CustomTable>
          </Cards>
        </Col>
      </Row>
    </Main>
  );
}

export default TransactionTables;
