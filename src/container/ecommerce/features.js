import React from "react";
import { Row, Col } from "antd";
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Swiper from "react-id-swiper";
import { TestimonialStyleWrapper } from "../pages/style";
import { Cards } from "../../components/cards/frame/cards-frame";
import { Main } from "../styled";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Navigation, Pagination]);
const Testimonials = () => {
  const paramsOne = {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  };
  const paramsTwo = {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  };

  const users = [
    {
      img: "",
      name: "Sham",
      designation: "Software Engineer",
    },
    {
      img: "",
      name: "Ram",
      designation: "Student",
    },
    {
      img: "",
      name: "Rajesh",
      designation: "Student",
    },
    {
      img: "",
      name: "Lokesh",
      designation: "SDE",
    },
    {
      img: "",
      name: "Sundar Pichai",
      designation: "IT Professional at Google",
    },
  ];
  return (
    <>
      {" "}
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <TestimonialStyleWrapper>
              <Cards headless>
                <div
                  style={{ background: "#f4f5f7" }}
                  className="testimonial-block theme-2"
                >
                  <Swiper {...paramsTwo}>
                    {users.map((user, index) => {
                      return (
                        <div className="testimonial-block__single">
                          <span className="quotation">
                            <img
                              src={require(`../../static/img/icon/quote.png`)}
                              alt=""
                            />
                          </span>
                          <div className="testimonial-block__author">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWSwL6QEGjHRyGx0Dv4tpZjxelnG2MWh1A-9MFs2rw9MZDG-gWgWj86z5e0prysSigS6I&usqp=CAU"
                              alt="User Image"
                              style={{ borderRadius: "50%" }}
                            />
                            <div className="author-info">
                              <h2 className="client-name">{user.name}</h2>
                              <p className="client-designation">
                                {user.designation}
                              </p>
                            </div>
                          </div>
                          <div className="testimonial-block__review">
                            <p>
                              It is amazing platform to learn from, I have
                              enrolled in React JS course for three months and
                              the way tutor explains the concept and sessions
                              are very much intresting. Thanks, got a job offer
                              from amazon as well
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </Swiper>
                </div>
              </Cards>
            </TestimonialStyleWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Testimonials;
