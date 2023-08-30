import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Collapse } from 'antd';
import { SupportTopWrap, SupportContentWrap, FaqWrapper } from '../pages/style';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';

const { Panel } = Collapse;

const customPanelStyle = {
  background: '#ffffff',
  borderRadius: 5,
  marginBottom: 5,
  border: '1px solid #F1F2F6',
};

const BecomeTutor = () => {
  return (
    <>
     
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <SupportTopWrap>
              <div className="sDash-support-container">
                <Row align="middle" style={{marginTop: "100px"}}>
                  <Col lg={16} sm={14} xs={24}>
                    <div  className="sDash_support-content">
                      <h2 style={{color: "#18113c", fontSize:"32px"}} className="sDash_support-content__title">Join Our Growing Tutor and teach</h2>
                      <h3 style={{fontSize: "20px"}} className="gurqool-blue"></h3>
                      <p style={{fontSize: "15px", width: "80%"}}>GurQool is a platform that aims to create a global community of tutors and students through a seamless search, select, interact and learning experience all done over live sessions.</p>
                      <Button style={{background: "#cc5252"}} className="btn-ticket" size="large" type="primary" raised onClick={() => (window.location = "/auth/tutor/signup")}>
                        Join Now
                        
                      </Button>
                    </div>
                  </Col>

                  <Col lg={8} sm={10} xs={24}>
                    <div className="sDash_support-img">
                      <img src={require(`../../static/img/Group9786.png`)} alt="" />
                    </div>
                  </Col>
                </Row>
              </div>
            </SupportTopWrap>
            
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default BecomeTutor;
