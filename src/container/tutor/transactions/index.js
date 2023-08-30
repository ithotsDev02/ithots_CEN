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
function TransactionTables() {
  const [isLoading, setisLoading] = useState(false);
  const [transactions, settransactions] = useState([]);
  const [tbldata, settbldata] = useState([]);
  const currentUserId = localStorage.getItem("currentUserInfo") || 0;

  useEffect(() => {
    setisLoading(true);
    let URL = "";
    URL = "https://api.esculae.com/api/v1/course/transactions";
    axiosInstance
      .get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        let currentTutorTrans = [];
        resp.data.data.map((tran) => {
          if (tran.faculty_id == currentUserId) {
            currentTutorTrans.push(tran);
          }
        });
        settransactions(currentTutorTrans);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const columns = [
    {
      title: "Transaction Date",
      dataIndex: "tdate",
      key: "tdate",
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
      // sorter: (a, b) => moment(a.tdate) - moment(b.tdate),
      // sorter: (a, b) => new Date(a.tdate) - new Date(b.tdate),
      sorter: (a, b) => moment(a.tdate).unix() - moment(b.tdate).unix()
    },
    {
      title: "Due Date",
      dataIndex: "ddate",
      key: "ddate",
      // sortDirections: ["descend", "ascend"],
      // defaultSortOrder: "descend",
      // sorter: (a, b) => moment(a.ddate) - moment(b.ddate),
      sorter: (a, b) => moment(a.ddate).unix() - moment(b.ddate).unix()
    },

    {
      title: "CourseName",
      dataIndex: "cname",
      key: "cname",
      sorter: (a, b) => a.cname.localeCompare(b.cname)
    },
    {
      title: "Batch Name",
      dataIndex: "bname",
      key: "bname",
    },
    {
      title: "StudentName",
      dataIndex: "sname",
      key: "sname",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Transaction Id",
      dataIndex: "tid",
      key: "tid",
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
  const data = [
    {
      key: "1",
      tdate: "25 March 2021",
      cname: "Python for data science",
      sname: "Lokesh",
      amount: " $4536",
      tid: "sdasjd34aAFa",
    },
    {
      key: "2",
      tdate: "25 March 2021",
      cname: "data science",
      amount: " $536",
      sname: "Lokesh",

      tid: "sjde434aAFa",
    },
    {
      key: "3",
      tdate: "25 March 2021",
      cname: "Python",
      amount: " $45336",
      sname: "Lokesh",

      tid: "sdasjd34aAFa",
    },
    {
      key: "4",
      tdate: "25 March 2021",
      cname: "Python for data science",
      amount: " $4536",
      tid: "sdasjd34aAFa",
      sname: "Lokesh",
    },
  ];
  return (
    <Main>
      {/* <Cards headless></Cards> */}
      <Row>
        <Col xs={24}>
          <Cards title="Transaction History">
            <CustomTable
              columns={columns}
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
