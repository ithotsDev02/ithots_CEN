import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config/axoisconfig";

import CustomTable from "../../../components/datatable/index";
import { PageHeader } from "../../../components/page-headers/page-headers";
import { Main } from "../../styled";
import { Row, Col } from "antd";
import { Cards } from "../../../components/cards/frame/cards-frame";

import { Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "antd";
import { Fragment } from "react";
axiosInstance.defaults.headers.common["xaccesstoken"] = `${localStorage.getItem(
  "token"
) || ""}`;
const Tutors = () => {
  const [tutors, settutors] = useState([]);
  const [loading, setisloading] = useState(false);
  useEffect(() => {
    getTutorList();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "DisplayName",
      dataIndex: "displayname",
      key: "displayname",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="InActive"
          defaultChecked
        />
        // <Space size="middle">
        //   <a>Invite {record.name}</a>
        //   <a>Delete</a>
        // </Space>
      ),
    },
  ];
  const getTutorList = () => {
    let url = "https://api-v2.esculae.com/api/v1/personal/faculty";
    setisloading(true);

    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        if (resp.data?.data) {
          let tutordata = [];
          resp.data?.data.map((tutor) => {
            tutordata.push({
              key: tutor.id,
              name: tutor.full_name,
              email: tutor.email,
              displayname: tutor.display_name,
              action: tutor.id,
            });
          });
          settutors(tutordata);
          setisloading(false);
        }
        console.log("the response data is", resp.data);
      })
      .catch((err) => {
        setisloading(false);

        console.log("Error in creating tutor profile", err);
      });
  };
  return (
    <div style={{ marginTop: "-5%" }}>
      <PageHeader ghost title="Tutors List" />
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
              <div style={{ minHeight: "calc(100vh - 320px)" }}>
                {/* <h2>Welcome, {state.username}</h2> */}
                <CustomTable
                  loading={loading}
                  columns={columns}
                  data={tutors}
                />
              </div>
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default Tutors;
