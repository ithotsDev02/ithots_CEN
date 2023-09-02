import React, { useState, useEffect } from "react";
import { Row, Col, Table, Form, Input, Spin } from "antd";
import FeatherIcon from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { FigureCart, ProductTable, CouponForm } from "../Style";
import Heading from "../../../components/heading/heading";
import { Button } from "../../../components/buttons/buttons";
import { cartDelete } from "../../../redux/cart/actionCreator";
import { Link, Redirect, useRouteMatch } from "react-router-dom";
import axiosInstance from "../../../config/axoisconfig";

// import { cartGetData, cartUpdateQuantity, cartDelete } from '../../../redux/cart/actionCreator';

const CartTable = ({ cartData }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.cart.loading);
  const { path } = useRouteMatch();
  const [canCheckout, setcanCheckout] = useState(true);
  const [errmsg, setErrmsg] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [productTableData, setproductTableData] = useState([]);
  const cartDeleted = (id, courseId) => {
    let tmp = [];
    tmp = cartData;
    tmp.splice(id, 1);
    const confirm = window.confirm("Are you sure to delete this course?", id);
    if (confirm) dispatch(cartDelete(tmp));
  };

  useEffect(() => {
    // if (cartData !== null) {
    let tmp = [];
    cartData.map((data, id) => {
      tmp.push({
        key: data.courseInfo.id,
        product: (
          <div className="cart-single">
            <FigureCart>
              <img
                style={{ width: 80 }}
                src={"https://api-v2.esculae.com/" + data.courseInfo.image}
                // src={require(`../../../${img}`)}
                alt=""
              />
              <figcaption>
                <div className="cart-single__info">
                  <Link to={`${path}/coursedetail/${data?.courseInfo.id}`}>
                    <Heading as="h6">{data.courseInfo.title}</Heading>
                  </Link>
                  <ul className="info-list">
                    <li>
                      <span className="info-title">Batch :</span>
                      <span>{data.batch.title}</span>
                    </li>
                    {/* <li>
                      <span className="info-title"> Color :</span>
                      <span>{color}</span>
                    </li> */}
                  </ul>
                </div>
              </figcaption>
            </FigureCart>
          </div>
        ),
        price: (
          <span className="cart-single-price">
            &#x20B9;{data.selectedBatchPrice}
          </span>
        ),
        // quantity: (
        //   <div className="cart-single-quantity">
        //     <Button
        //       onClick={() => decrementUpdate(id, quantity)}
        //       className="btn-dec"
        //       type="default"
        //     >
        //       <FeatherIcon icon="minus" size={12} />
        //     </Button>
        //     {quantity}
        //     <Button
        //       onClick={() => incrementUpdate(id, quantity)}
        //       className="btn-inc"
        //       type="default"
        //     >
        //       <FeatherIcon icon="plus" size={12} />
        //     </Button>
        //   </div>
        // ),
        total: (
          <span className="cart-single-t-price">
            &#x20B9;{data.selectedBatchPrice}
          </span>
        ),
        action: (
          <div className="table-action">
            <Button
              onClick={() => cartDeleted(id, data.courseInfo.key)}
              className="btn-icon"
              to="#"
              size="default"
              type="danger"
              shape="circle"
              transparented
            >
              <FeatherIcon icon="trash-2" size={16} />
            </Button>
          </div>
        ),
      });
    });
    setproductTableData(tmp);

    // }
  }, []);

  const productTableColumns = [
    {
      title: "Course",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    // {
    //   title: "Quantity",
    //   dataIndex: "quantity",
    //   key: "quantity",
    // },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
    },
  ];

  // const submitCoupon = (values) => {
  //   setState({ ...state, coupon: values });
  // };

  return (
    <>
      <ProductTable>
        <div className="table-cart table-responsive">
          <Table
            loading={isLoading}
            pagination={false}
            canCheckout={canCheckout}
            errmsg={errmsg}
            dataSource={productTableData}
            columns={productTableColumns}
          />
        </div>
      </ProductTable>

      {/* <CouponForm>
        <Form form={form} name="submitCoupon" onFinish={submitCoupon}>
          <Row gutter={15}>
            <Col lg={4} sm={8} xs={24}>
              <Form.Item name="coupon" label="">
                <Input placeholder="Coupon Code" />
              </Form.Item>
            </Col>
            <Col lg={4} sm={8} xs={24}>
              <Button htmlType="submit" size="default" type="primary">
                Apply Coupon
              </Button>
            </Col>
          </Row>
        </Form>
      </CouponForm> */}
    </>
  );
};

export default CartTable;
