import React from "react";
import { Carousel } from "antd";
import {
  Figure2,
  Figure3,
  Figure6,
  Figure7,
  BannerWrapper,
  BannerNormal,
  BannerCarouselWrap,
  BannerLongWrap,
  BannerCardWrap,
  BannerCtaWrap,
} from "./Style";
import { Button } from "../buttons/buttons";
import { Cards } from "../cards/frame/cards-frame";

const Banner1 = () => {
  return (
    <BannerNormal>
      <Cards headless bodyStyle={{ minHeight: "270px" }}>
        <h2>15 Days Free Trail</h2>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut
        </p>
        <Button className="btn-outlined" size="small" outlined type="primary">
          Start
        </Button>
      </Cards>
    </BannerNormal>
  );
};

const Banner2 = ({ onClick, paymentDetails, dueCount }) => {
  return (
    <BannerWrapper>
      <Cards
        className="mb-70"
        bodyStyle={{
          background: "#5F63F2",
          borderRadius: "10px",
          minHeight: "270px",
          padding: "30px !important",
        }}
        headless
      >
        <Figure2 style={{ padding: "30px" }}>
          <img src={require("../../static/img/banner/ManBanner.png")} alt="" />
          <figcaption>
            <h2>({dueCount})Payment Dues</h2>
            <p>
              If you have opted for monthly payments in any of the course
              purchased, The next payments due date will show up here.
            </p>
            <Button onClick={onClick} size="large" type="white">
              Show All
            </Button>
          </figcaption>
        </Figure2>
      </Cards>
    </BannerWrapper>
  );
};

const Banner3 = () => {
  return (
    <BannerWrapper>
      <Cards
        bodyStyle={{
          borderRadius: "10px",
          minHeight: "270px",
          background: "#5F63F2",
        }}
        headless
      >
        <Figure3>
          <img src={require("../../static/img/banner/2.png")} alt="" />
          <figcaption>
            <h2>Earn More Money</h2>
            <Button size="large" type="white">
              Learn More
            </Button>
          </figcaption>
        </Figure3>
      </Cards>
    </BannerWrapper>
  );
};

const Banner4 = () => {
  return (
    <BannerWrapper>
      <Cards
        bodyStyle={{
          background: "#000103",

          // borderRadius: "10px",
          minHeight: "300px",
        }}
        headless
      >
        <Figure3 className="theme-3">
          <img src={require("../../static/img/banner/ManBanner.png")} alt="" />
          {/* 
          <img
            height="266px"
            src={require("../../static/img/tutorBG.jpeg")}
            alt=""
          /> */}
          <figcaption>
            <h2 style={{ marginLeft: "30px", marginTop: "30px" }}>
              Would like to become a Tutor?
            </h2>
            <p style={{ marginLeft: "30px" }}>
              Become a tutor and teach lesson to thousands of students
            </p>
            <Button
              size="large"
              style={{
                background: "green",
                border: "green",
                marginLeft: "30px",
                marginTop: "30px",
              }}
              type="primary"
              danger
              onClick={() => (window.location = "/auth/tutor/signup")}
            >
              Become a Tutor
            </Button>
          </figcaption>
        </Figure3>
      </Cards>
    </BannerWrapper>
  );
};

const Banner5 = () => {
  return (
    <BannerWrapper>
      <Cards
        bodyStyle={{
          background: "#5F63F2",
          borderRadius: "10px",
          minHeight: "265px",
          display: "flex",
          alignItems: "center",
        }}
        headless
      >
        <Figure3 className="theme-wide">
          <img src={require("../../static/img/banner/4.png")} alt="" />
          <figcaption>
            <h2>Congratulations Jhon!</h2>
            <p>Best Seller on the last month.</p>
            <Button size="large" type="white">
              Learn More
            </Button>
          </figcaption>
        </Figure3>
      </Cards>
    </BannerWrapper>
  );
};

const Banner6 = () => {
  return (
    <BannerWrapper>
      <Cards
        bodyStyle={{
          background: `url(${require("../../static/img/banner/5.png")})`,
          backgroundSize: "cover",
          borderRadius: "10px",
          minHeight: "265px",
          display: "flex",
          direction: "ltr",
          alignItems: "center",
        }}
        headless
      >
        <Figure6>
          <img src={require("../../static/img/banner/badge.svg")} alt="" />
          <figcaption>
            <h2>Up to 50 OFF</h2>
            <Button
              className="btn-outlined"
              size="small"
              outlined
              type="danger"
            >
              Buy Now
            </Button>
          </figcaption>
        </Figure6>
      </Cards>
    </BannerWrapper>
  );
};

const Banner7 = () => {
  return (
    <BannerNormal className="theme-wide">
      <Cards headless>
        <Figure7>
          <img src={require("../../static/img/banner/6.png")} alt="" />
          <figcaption>
            <h2>Subscribe to our newsletter</h2>
            <p>Lorem ipsum dolor sit amet, consetetur </p>
            <Button
              className="btn-outlined"
              size="large"
              outlined
              type="primary"
            >
              Subscribe Now
            </Button>
          </figcaption>
        </Figure7>
      </Cards>
    </BannerNormal>
  );
};

const BannerCarousel = () => {
  return (
    <BannerCarouselWrap>
      <Carousel autoplay>
        <div className="banner-signle">
          <div className="banner-single__img">
            <img src={require("../../static/img/banner/8.png")} alt="" />
          </div>
          <div className="banner-single__content">
            <h3>Achievements</h3>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
          </div>
        </div>
        {/* End of /.banner-signle */}
        <div className="banner-signle">
          <div className="banner-single__img">
            <img src={require("../../static/img/banner/8.png")} alt="" />
          </div>
          <div className="banner-single__content">
            <h3>Achievements</h3>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
          </div>
        </div>
        {/* End of /.banner-signle */}
        <div className="banner-signle">
          <div className="banner-single__img">
            <img src={require("../../static/img/banner/8.png")} alt="" />
          </div>
          <div className="banner-single__content">
            <h3>Achievements</h3>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
          </div>
        </div>
        {/* End of /.banner-signle */}
      </Carousel>
    </BannerCarouselWrap>
  );
};

const BannerLong = () => {
  return (
    <BannerLongWrap>
      <div className="banner-long-inner">
        <h2>Up To Date </h2>
        <img src={require("../../static/img/banner/9.png")} alt="" />
      </div>
    </BannerLongWrap>
  );
};

const BannerCard = () => {
  return (
    <BannerCardWrap>
      <div
        className="banner-card-inner"
        style={{
          backgroundImage: `url("${require("../../static/img/banner/card-banner-1.png")}")`,
        }}
      >
        <h2>Need More Space?</h2>
        <Button size="small" type="white">
          Buy Storage
        </Button>
      </div>
    </BannerCardWrap>
  );
};

const BannerCard2 = () => {
  return (
    <BannerCardWrap>
      <div
        className="banner-card-inner theme-2"
        style={{
          backgroundImage: `url("${require("../../static/img/banner/card-banner-2.png")}")`,
        }}
      >
        <h2>Create Sale Report</h2>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy
        </p>
        <Button size="small" type="white">
          Learn More
        </Button>
      </div>
    </BannerCardWrap>
  );
};

const BannerCta = () => {
  return (
    <BannerCtaWrap>
      <div
        className="banner-cta align-center-v"
        style={{
          backgroundImage: `url("${require("../../static/img/banner/cta-banner-1.png")}")`,
        }}
      >
        <div className="banner-cta__content">
          <h2>Dedicated Support</h2>
          <Button size="small" type="primary">
            Learn More
          </Button>
        </div>
      </div>
    </BannerCtaWrap>
  );
};

const BannerCta2 = () => {
  return (
    <BannerCtaWrap>
      <div
        className="banner-cta align-center-v theme-2"
        style={{ margin:"20px", backgroundColor: "#a3ce37",
          
        }}
      >
        <div className="banner-cta__content">
          <h2>Welcome Back Garry Sobars!</h2>
          <p>Lorem ipsum dolor amet, consetetur sadipscing elitr sed diam </p>
          <Button size="small" type="white">
            Learn More
          </Button>
        </div>
      </div>
    </BannerCtaWrap>
  );
};



const HomepageWelcome = () => {
  return (
    <BannerLongWrap >
    <div className="banner-long-inner" style={{backgroundColor: "#ffffff"}}>
      <h2 style={{fontSize: "30px" , color: "#18113c", paddingTop: "20px"}}>
World's largest <span style={{fontSize: "30px" , color: "#ec5252", paddingTop: "20px"}}>Christian Entrepreneur Network</span>
</h2>
<p style={{fontSize: "18px" , color: "#4967a3", paddingTop: "0px"}}>Trusted by over a million Christian Entrepreneurs 
</p>
      
    </div>
  </BannerLongWrap>
  );
};

const BannerCta3 = () => {
  return (
    <BannerCtaWrap>
      <div
        className="banner-cta align-center-v theme-2"
        style={{ backgroundColor: "#a3ce37",
          
        }}
      >
        <div className="banner-cta__content">
          <h2 style={{color:"#ffffff"}}>Welcome Tutor</h2>
          <p>Please fill your personal information</p>

        </div>
      </div>
    </BannerCtaWrap>
  );
};

export {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner5,
  Banner6,
  Banner7,
  BannerCarousel,
  BannerLong,
  BannerCard,
  BannerCard2,
  BannerCta,
  BannerCta2,
  BannerCta3,
  HomepageWelcome,
};
