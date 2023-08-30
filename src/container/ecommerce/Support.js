import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Collapse } from "antd";
import {
  SupportTopWrap,
  SupportContentWrap,
  HomeJoinTutor,
  FaqWrapper,
} from "../pages/style";

import { Main } from "../styled";
import { Button } from "../../components/buttons/buttons";



const { Panel } = Collapse;

const customPanelStyle = {
  background: "#ffffff",
  borderRadius: 5,
  marginBottom: 5,
  border: "1px solid #F1F2F6",
};

const Support = () => {
  return (
    <>
      {/*} <PageHeader
        title="Support Center"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />*/}
      <Main>
      
      



        <Row gutter={25}>
          <Col xs={24}>
            <SupportContentWrap>
              <div className="sDash-support-container">
               <div  className="sDash-support-links">
                  <Row gutter={30}>
                    <Col lg={6} xs={24}>
                      <div className="sDash-support-link-item">
                      {/*<div className="sDash-support-link-item__icon primary">
                          <img
                            src={require(`../../static/img/icon/idea.svg`)}
                            alt=""
                          />
    </div>*/}
                        <h3 style={{color: "#18113c", paddingTop: "10px"}}>Academics</h3>
                        {/*<div className="sDash-support-link-item__content">
                          <p>Lorem ipsum dolor sit amet consetetur</p>
                          <Link to="./knowledgebase/plugins" className="btn-link">
                            Learn More
                          </Link>
    </div>*/}
                      </div>
                    </Col>
                    <Col lg={6} xs={24}>
                      <div className="sDash-support-link-item">
                         {/*<div className="sDash-support-link-item__icon primary">
                          <img
                            src={require(`../../static/img/icon/idea.svg`)}
                            alt=""
                          />
    </div>*/}
                        <h3 style={{color: "#18113c", paddingTop: "10px"}}>Sports</h3>
                        {/*<div className="sDash-support-link-item__content">
                          <p>Lorem ipsum dolor sit amet consetetur</p>
                          <Link to="./knowledgebase/plugins" className="btn-link">
                            Learn More
                          </Link>
    </div>*/}
                      </div>
                    </Col>
                    <Col lg={6} xs={24}>
                      <div className="sDash-support-link-item">
                        {/*<div className="sDash-support-link-item__icon primary">
                          <img
                            src={require(`../../static/img/icon/idea.svg`)}
                            alt=""
                          />
    </div>*/}
                        <h3 style={{color: "#18113c", paddingTop: "10px"}}>Arts and Wellness</h3>
                        {/*<div className="sDash-support-link-item__content">
                          <p>Lorem ipsum dolor sit amet consetetur</p>
                          <Link to="./knowledgebase/plugins" className="btn-link">
                            Learn More
                          </Link>
    </div>*/}
                      </div>
                    </Col>
                    <Col lg={6} xs={24}>
                      <div className="sDash-support-link-item">
                         {/*<div className="sDash-support-link-item__icon primary">
                          <img
                            src={require(`../../static/img/icon/idea.svg`)}
                            alt=""
                          />
    </div>*/}
                        <h3 style={{color: "#18113c", paddingTop: "10px"}}>Culinary</h3>
                        {/*<div className="sDash-support-link-item__content">
                          <p>Lorem ipsum dolor sit amet consetetur</p>
                          <Link to="./knowledgebase/plugins" className="btn-link">
                            Learn More
                          </Link>
    </div>*/}
                      </div>
                    </Col>
                    <Col lg={6} xs={24}>
                      <div className="sDash-support-link-item">
                        {/*<div className="sDash-support-link-item__icon primary">
                          <img
                            src={require(`../../static/img/icon/idea.svg`)}
                            alt=""
                          />
    </div>*/}
                        <h3 style={{color: "#18113c", paddingTop: "10px"}}>Music</h3>
                        {/*<div className="sDash-support-link-item__content">
                          <p>Lorem ipsum dolor sit amet consetetur</p>
                          <Link to="./knowledgebase/plugins" className="btn-link">
                            Learn More
                          </Link>
    </div>*/}
                      </div>
                    </Col>
                    <Col lg={6} xs={24}>
                      <div className="sDash-support-link-item">
                      {/*<div className="sDash-support-link-item__icon primary">
                          <img
                            src={require(`../../static/img/icon/idea.svg`)}
                            alt=""
                          />
    </div>*/}
                        <h3 style={{color: "#18113c", paddingTop: "10px"}}>Dance</h3>
                        {/*<div className="sDash-support-link-item__content">
                          <p>Lorem ipsum dolor sit amet consetetur</p>
                          <Link to="./knowledgebase/plugins" className="btn-link">
                            Learn More
                          </Link>
    </div>*/}
                      </div>
                    </Col>

                    <Col lg={6} xs={24}>
                      <div className="sDash-support-link-item">
                        {/*<div className="sDash-support-link-item__icon primary">
                          <img
                            src={require(`../../static/img/icon/idea.svg`)}
                            alt=""
                          />
    </div>*/}
                        <h3 style={{color: "#18113c", paddingTop: "10px"}}>Instruments</h3>
                        {/*<div className="sDash-support-link-item__content">
                          <p>Lorem ipsum dolor sit amet consetetur</p>
                          <Link to="./knowledgebase/plugins" className="btn-link">
                            Learn More
                          </Link>
    </div>*/}
                      </div>
                    </Col>
                    <Col lg={6} xs={24}>
                      <div className="sDash-support-link-item">
                        {/*<div className="sDash-support-link-item__icon primary">
                          <img
                            src={require(`../../static/img/icon/idea.svg`)}
                            alt=""
                          />
    </div>*/}
                        <h3 style={{color: "#18113c", paddingTop: "10px"}}>New Age</h3>
                        {/*<div className="sDash-support-link-item__content">
                          <p>Lorem ipsum dolor sit amet consetetur</p>
                          <Link to="./knowledgebase/plugins" className="btn-link">
                            Learn More
                          </Link>
    </div>*/}
                      </div>
                    </Col>
                  </Row>
                </div>
                {/*<div className="sDash_faq-block">
                  <Cards headless title="Frequently Asked Questions">
                    <FaqWrapper>
                      <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <FeatherIcon icon={isActive ? 'minus' : 'plus'} size={14} />}
                      >
                        <Panel header="How long does it take to download updates?" key="1" style={customPanelStyle}>
                          <p>
                            Many support queries and technical questions will already be answered in supporting
                            documentation such as FAQ&rsquo;s and comments from previous buyers. Anim pariatur cliche
                            reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
                            officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                            nulla assumenda shoreditch et.
                          </p>
                          <Heading as="h4">Was this article helpful?</Heading>
                          <div className="panel-actions">
                            <Button outlined type="success">
                              <FeatherIcon size={14} icon="smile" />
                              Yes
                            </Button>
                            <Button outlined type="warning">
                              <FeatherIcon size={14} icon="frown" />
                              No
                            </Button>
                          </div>
                        </Panel>
                        <Panel
                          header="How to use SCSS variables to build custom color?"
                          key="2"
                          style={customPanelStyle}
                        >
                          <p>
                            Many support queries and technical questions will already be answered in supporting
                            documentation such as FAQ&rsquo;s and comments from previous buyers. Anim pariatur cliche
                            reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
                            officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                            nulla assumenda shoreditch et.
                          </p>
                          <Heading as="h4">Was this article helpful?</Heading>
                          <div className="panel-actions">
                            <Button outlined type="success">
                              <FeatherIcon size={14} icon="smile" />
                              Yes
                            </Button>
                            <Button outlined type="warning">
                              <FeatherIcon size={14} icon="frown" />
                              No
                            </Button>
                          </div>
                        </Panel>
                        <Panel header="How long does it take to download updates?" key="3" style={customPanelStyle}>
                          <p>
                            Many support queries and technical questions will already be answered in supporting
                            documentation such as FAQ&rsquo;s and comments from previous buyers. Anim pariatur cliche
                            reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
                            officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                            nulla assumenda shoreditch et.
                          </p>
                          <Heading as="h4">Was this article helpful?</Heading>
                          <div className="panel-actions">
                            <Button outlined type="success">
                              <FeatherIcon size={14} icon="smile" />
                              Yes
                            </Button>
                            <Button outlined type="warning">
                              <FeatherIcon size={14} icon="frown" />
                              No
                            </Button>
                          </div>
                        </Panel>
                        <Panel header="What is the flex layout?" key="4" style={customPanelStyle}>
                          <p>
                            Many support queries and technical questions will already be answered in supporting
                            documentation such as FAQ&rsquo;s and comments from previous buyers. Anim pariatur cliche
                            reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
                            officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                            nulla assumenda shoreditch et.
                          </p>
                          <Heading as="h4">Was this article helpful?</Heading>
                          <div className="panel-actions">
                            <Button outlined type="success">
                              <FeatherIcon size={14} icon="smile" />
                              Yes
                            </Button>
                            <Button outlined type="warning">
                              <FeatherIcon size={14} icon="frown" />
                              No
                            </Button>
                          </div>
                        </Panel>
                        <Panel header="How long does it take to download updates?" key="5" style={customPanelStyle}>
                          <p>
                            Many support queries and technical questions will already be answered in supporting
                            documentation such as FAQ&rsquo;s and comments from previous buyers. Anim pariatur cliche
                            reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
                            officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                            nulla assumenda shoreditch et.
                          </p>
                          <Heading as="h4">Was this article helpful?</Heading>
                          <div className="panel-actions">
                            <Button outlined type="success">
                              <FeatherIcon size={14} icon="smile" />
                              Yes
                            </Button>
                            <Button outlined type="warning">
                              <FeatherIcon size={14} icon="frown" />
                              No
                            </Button>
                          </div>
                        </Panel>
                        <Panel header="Where to buy this UI dashboard?" key="6" style={customPanelStyle}>
                          <p>
                            Many support queries and technical questions will already be answered in supporting
                            documentation such as FAQ&rsquo;s and comments from previous buyers. Anim pariatur cliche
                            reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
                            officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                            nulla assumenda shoreditch et.
                          </p>
                          <Heading as="h4">Was this article helpful?</Heading>
                          <div className="panel-actions">
                            <Button outlined type="success">
                              <FeatherIcon size={14} icon="smile" />
                              Yes
                            </Button>
                            <Button outlined type="warning">
                              <FeatherIcon size={14} icon="frown" />
                              No
                            </Button>
                          </div>
                        </Panel>
                        <Panel header="How long does it take to download updates?" key="7" style={customPanelStyle}>
                          <p>
                            Many support queries and technical questions will already be answered in supporting
                            documentation such as FAQ&rsquo;s and comments from previous buyers. Anim pariatur cliche
                            reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon
                            officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                            nulla assumenda shoreditch et.
                          </p>
                          <Heading as="h4">Was this article helpful?</Heading>
                          <div className="panel-actions">
                            <Button outlined type="success">
                              Yes
                            </Button>
                            <Button outlined type="warning">
                              <FeatherIcon size={14} icon="frown" />
                              No
                            </Button>
                          </div>
                        </Panel>
                      </Collapse>
                    </FaqWrapper>
                  </Cards>
    </div>*/}
              </div>
            </SupportContentWrap>

          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Support;
