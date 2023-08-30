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
import { Tooltip, Space, Typography } from "antd";
import PaymentModal from "./PaymentModal";
const Ordersummary = ({
  totalcost,
  subtotal,
  gst,
  platformcharges,
  checkout,
  isModalVisible,
  canCheckout,
  errmsg,
  setcardno,
  setexpiry,
  setcvv,
  setname,
  handleok,
  handlecancel,
}) => {
  const dispatch = useDispatch();
  const { rtl } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  const [form] = Form.useForm();
  // const [state, setState] = useState({
  //   coupon: 0,
  //   promo: 0,
  //   current: 0,
  // });

  // useEffect(() => {
  //   if (cartGetData) {
  //     dispatch(cartGetData());
  //   }
  // }, [dispatch]);

  // const submitPromo = (values) => {
  //   setState({ ...state, promo: values });
  // };

  // const { Option } = Select;

  // const onSubmit = () => {
  //   document.querySelectorAll("button span").forEach((item) => {
  //     if (item.innerHTML === "Done") {
  //       item.click();
  //     }
  //   });
  // };

  return (
    <>
      <PaymentModal
        isModalVisible={isModalVisible}
        setcardno={setcardno}
        setexpiry={setexpiry}
        setcvv={setcvv}
        setname={setname}
        handleok={handleok}
        handlecancel={handlecancel}
      />
      <Cards
        bodyStyle={{
          backgroundColor: "#F8F9FB",
          borderRadius: "20px",
        }}
        headless
      >
        <OrderSummary>
          <Heading className="summary-table-title" as="h4">
            Order Summary
          </Heading>
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
                  <span className="summary-list-title">Subtotal :</span>
                  <span className="summary-list-text">
                    &#x20B9;{parseFloat(subtotal).toFixed(2)}
                  </span>
                </li>
                <li>
                  <span className="summary-list-title">GST @18% :</span>
                  <span className="summary-list-text">
                    &#x20B9;{parseFloat(gst).toFixed(2)}
                  </span>
                </li>
                <li>
                  <span className="summary-list-title">Platform Charges :</span>
                  <span className="summary-list-text">
                    &#x20B9;{parseFloat(platformcharges).toFixed(2)}
                  </span>
                </li>
              </ul>
              <br />
              <Heading className="summary-total" as="h4">
                <span className="summary-total-label">Total : </span>
                <span className="summary-total-amount">
                  &#x20B9;{`${parseFloat(totalcost).toFixed(2)}`}
                </span>
              </Heading>

              {/* {isExact && ( */}
              <Button
                onClick={checkout}
                className="btn-proceed"
                type="secondary"
                size="large"
              >
                {/* <Link to={`${path}/checkout`}> */}
                Proceed To Checkout
                <FeatherIcon
                  icon={!rtl ? "arrow-right" : "arrow-left"}
                  size={14}
                />
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
    </>
  );
};

export default Ordersummary;
