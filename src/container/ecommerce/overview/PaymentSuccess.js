import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OrderSummary } from "../Style";
import { Cards } from "../../../components/cards/frame/cards-frame";
import Heading from "../../../components/heading/heading";
import { Button } from "../../../components/buttons/buttons";
import { cartGetData } from "../../../redux/cart/actionCreator";

const PaymentSuccess = ({ transactionId, price }) => {
  const gotoStudentHome = () => {
    window.location = "/student";
  };
  return (
    <Cards
      bodyStyle={{
        backgroundColor: "#F8F9FB",
        borderRadius: "20px",
      }}
      headless
    >
      <OrderSummary>
        {/* <Heading className="summary-table-title" as="h4">
          Payment Summary
        </Heading> */}
        <Cards
          bodyStyle={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
          }}
          headless
        >
          <div className="order-summary-inner">
            <ul className="summary-list">
              <li>
                <lottie-player
                  src="https://assets1.lottiefiles.com/packages/lf20_7W0ppe.json"
                  background="transparent"
                  speed="0.5"
                  style={{
                    width: "600px",
                    height: "300px",
                    //   marginTop: "-10%",
                    //   marginLeft: "27%",
                    //   marginRight: "25%",
                  }}
                  // controls
                  autoplay
                ></lottie-player>
              </li>
              <li>
                <span className="summary-list-title">
                  <b>
                    Your payment and batch allocation is now confirmed. You now
                    have access to all the content of the course. If you face
                    any problem in joining the meeting rooms please contact
                    admin.
                  </b>
                </span>
              </li>
              <li>
                <span className="summary-list-title">Transaction Id :</span>
                <span className="summary-list-text">{transactionId}</span>
              </li>

              <li>
                <span className="summary-list-title">Price :</span>
                <span className="summary-list-text">{price}</span>
              </li>
            </ul>
            <br />

            {/* {isExact && ( */}
            <Button
              onClick={gotoStudentHome}
              className="btn-proceed"
              type="secondary"
              size="large"
            >
              {/* <Link to={`${path}/checkout`}> */}
              Go to my courses
              <FeatherIcon icon={"arrow-right"} size={14} />
              {/* </Link> */}
            </Button>
            {/* )} */}
            {/* {state.current === 3 && (
              <Button
                onClick={onSubmit}
                className="btn-proceed"
                type="secondary"
                size="large"
              >
                <Link to="#">Place Order</Link>
              </Button>
            )} */}
          </div>
        </Cards>
      </OrderSummary>
    </Cards>
  );
};

export default PaymentSuccess;
