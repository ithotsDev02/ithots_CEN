import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Collapse } from "antd";
import { Timeline } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const { Panel } = Collapse;

const PaymentDetailModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  paymentDetails,
  checkout,
}) => {
  return (
    <>
      <Modal
        width="80%"
        title="Payment Information"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Collapse bordered={false} defaultActiveKey={["0"]}>
          {paymentDetails.map((detail, idx) => (
            <Panel header={detail.course_from_enroll_course.title} key={idx}>
              <Timeline mode="alternate">
                {detail &&
                  detail.duePayment &&
                  detail.duePayment.map((dues, idx) => (
                    <Timeline.Item
                      dot={
                        dues.status === "PENDING" ? (
                          <ClockCircleOutlined
                            style={{ fontSize: "16px", color: "red" }}
                          />
                        ) : (
                          <CheckCircleOutlined
                            style={{ fontSize: "16px", color: "green" }}
                          />
                        )
                      }
                    >
                      Payment {dues.status === "PENDING" ? "Due on" : "Paid"}{" "}
                      for month{" "}
                      {moment(dues.transaction_due_date).format("Do MMM YYYY")}(
                      {idx + 1} / {detail.duePayment.length}){" "}
                      {dues.status === "PENDING" && (
                        <Button onClick={() => checkout(detail, dues)}>
                          {" "}
                          Pay Now
                        </Button>
                      )}
                    </Timeline.Item>
                  ))}
              </Timeline>
            </Panel>
          ))}
        </Collapse>
      </Modal>
    </>
  );
};
export default PaymentDetailModal;
