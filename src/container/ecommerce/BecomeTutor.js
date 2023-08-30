import React from 'react';

import { Row, Col, Collapse } from 'antd';

import { SupportTopWrap} from "../Style"



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
                <Row align="middle">
                  <Col lg={16} sm={14} xs={24}>
                    <div className="sDash_support-content">
                      <h2 className="sDash_support-content__title">Hello, We are here to help</h2>
                      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</p>
                      <Button className="btn-ticket" size="large" type="primary" raised>
                        Create Support Ticket
                        
                      </Button>
                    </div>
                  </Col>

                  <Col lg={8} sm={10} xs={24}>
                    <div className="sDash_support-img">
                      <img src={require(`../../static/img/Group 9786.png`)} alt="" />
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
