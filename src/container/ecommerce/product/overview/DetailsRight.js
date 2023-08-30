import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rate } from "antd";
import FeatherIcon from "feather-icons-react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import Heading from "../../../../components/heading/heading";
import { updateWishList } from "../../../../redux/product/actionCreator";
import { cartDelete } from "../../../../redux/cart/actionCreator";

import { Button } from "../../../../components/buttons/buttons";

const DetailsRight = ({ product }) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.data);
  const cartDeleted = (id) => {
    let tmp = [];
    tmp = cartData;
    tmp.splice(id, 1);
    const confirm = window.confirm("Are you sure to delete this course?", id);
    if (confirm) dispatch(cartDelete(tmp));
  };
  return (
    <div className="product-details-box__right pdbr">
      <Heading className="pdbr__title" as="h2">
        Sample
      </Heading>
      <Rate allowHalf defaultValue="200" disabled />
      <span className="pdbr__rating">400</span>
      <span className="pdbr__review-count"> 778 Reviews</span>
      <p>
        <span className="pdbr__brand-text">Brand :</span>
        <span className="pdbr__brand-name">Amazon</span>
      </p>
      <Heading className="pdbr__new-price" as="h3">
        <span className="pdbr__currency">$</span>
        <span className="pdbr__price">1343</span>
      </Heading>

      <p className="pdbr__desc">brand now</p>
      <div className="pdbr__current-status">
        <p>
          <span className="current-status-title">Available:</span>
          <span className="stock-status in-stock"> In Stock</span>
        </p>
        <p>
          <span className="current-status-title"> Shipping: </span>
          <span className="shipping-cost">Free</span>
        </p>
      </div>

      <div className="pdbr__Actions d-flex align-items-center">
        <div className="pdbr__product-action">
          <Button className="btn-buy" size="default" type="primary">
            Buy Now
          </Button>
          <Button className="btn-cart" size="default" type="secondary">
            <FeatherIcon icon="shopping-bag" size={14} /> Add To Cart
          </Button>
          <Button
            className="btn-icon"
            size="default"
            raised
            type="white"
            shape="circle"
          >
            <FeatherIcon icon="heart" size={14} />
          </Button>
          <Button
            className="btn-icon"
            size="default"
            raised
            type="white"
            shape="circle"
          >
            <FeatherIcon icon="share-2" size={14} />
          </Button>
        </div>
        <div className="pdbr__socials">
          <NavLink to="#">
            <FontAwesome
              className="super-crazy-colors"
              name="facebook"
              size="2x"
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </NavLink>
          <NavLink to="#">
            <FontAwesome
              className="super-crazy-colors"
              name="twitter"
              size="2x"
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </NavLink>
          <NavLink to="#">
            <FontAwesome
              className="super-crazy-colors"
              name="pinterest-p"
              size="2x"
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </NavLink>
          <NavLink to="#">
            <FontAwesome
              className="super-crazy-colors"
              name="linkedin"
              size="2x"
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </NavLink>
          <NavLink to="#">
            <FontAwesome
              className="super-crazy-colors"
              name="send"
              size="2x"
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
          </NavLink>
        </div>
      </div>
      <ul className="pdbr__list">
        <li>
          <span>Category:</span>
          <span>Music</span>
        </li>
      </ul>
      <ul className="pdbr__list">
        <li>
          <span>Tags:</span>
          <span>Blue, Green, Light</span>
        </li>
      </ul>
    </div>
  );
};

DetailsRight.propTypes = {
  product: PropTypes.object,
};

export default DetailsRight;
