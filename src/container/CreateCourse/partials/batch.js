import React, { useState, useDispatch, useEffect } from "react";
import { BasicFormWrapper } from "../../styled";
import Heading from "../../../components/heading/heading";
import { Radio } from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { Row, Col, Form, Input, Button } from "antd";
import { Table } from "antd";
import { Fragment } from "react";
import { batch } from "react-redux";
import errorNotification from "../../../components/notification/errorNotification";
import { Alert } from "antd";
import { Select } from "antd";
import { Checkbox } from "antd";

import { DatePicker, Space } from "antd";
import { TimePicker } from "antd";
const { RangePicker } = TimePicker;

const DateRangePicker = DatePicker.RangePicker;

const { Option } = Select;
function Batch({
  createdCourseId,
  setcanCreateNewBatch,
  canCreateNewBatch,
  setbatchInfo,
  batchInfo,
  allBatches,
  createBatch,
  isEventEditMode,
  settitle,
  setEventTitle,
  seteventStartEndDate,
  setbatch_day,
  setdays,
  seteventTimeSlot,
  attendees,
  setattendees,
}) {
  let INITIAL_BATCHES = [];
  const [coursetype, setcoursetype] = useState("value1");
  const [batches, setbatches] = useState(INITIAL_BATCHES);
  const [tblSrc, settblSrc] = useState([]);
  const [batchname, setbatchname] = useState("");
  const [batchprice, setbatchprice] = useState("");
  const [batchDisplayprice, setbatchDisplayprice] = useState(0);
  const [batchpricepermonth, setbatchpricepermonth] = useState(0);
  const [batchdisplaypricepermonth, setbatchdisplaypricepermonth] = useState(0);
  const [dteRange, setdteRange] = useState("");
  const [duration, setduration] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [lastdate, setlastdate] = useState("");
  const [isEdit, setisEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [editId, seteditId] = useState("");
  const [currentCourseBatches, setcurrentCourseBatches] = useState([]);
  const [filteredBatches, setfilteredBatches] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [value, setValue] = useState();
  const [startDate, setStartDate] = useState("");
  const format = "HH:mm";

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };
  useEffect(() => {
    setisLoading(true);
    if (allBatches && allBatches.data && allBatches.data.length > 0) {
      let tempData =
        allBatches &&
        allBatches.data &&
        allBatches.data.filter((batch) => batch.CourseId === createdCourseId);
      setcurrentCourseBatches(tempData);
      tempData.map((btch) => {
        if (tblSrc.length === 0) {
          settblSrc([
            {
              key: btch.id,
              name: btch.name || "",
              type: btch.batch_type === "value1" ? "Individual" : "Group",
              price: btch.total_price,
              attendees: btch.attendees || 0,
              // lastdate: moment(btch.enroll_last_date).format("MM/DD/YYYY"),
              duration: btch.total_duration,
              batchpricepermonth: btch.price,
            },
          ]);
          INITIAL_BATCHES = [
            {
              name: btch.name || "",
              type: btch.batch_type === "value1" ? "Individual" : "Group",
              price: btch.total_price,
              attendees: btch.attendees || 0,
              // lastdate: moment(btch.enroll_last_date).format("MM/DD/YYYY"),
              duration: btch.total_duration,
              batchpricepermonth: btch.price,
            },
          ];
        }
        tblSrc.map((item) => {
          if (item.key === btch.id) {
            console.log("duplicate found");
          } else {
            settblSrc((tblSrc) => [
              ...tblSrc,
              {
                key: btch.id,
                name: btch.name || "",
                type: btch.batch_type === "value1" ? "Individual" : "Group",
                price: btch.total_price,
                attendees: btch.attendees || 0,
                // lastdate: moment(btch.enroll_last_date).format("MM/DD/YYYY"),

                duration: btch.total_duration,
                batchpricepermonth: btch.price,
              },
            ]);
            INITIAL_BATCHES = [
              ...tblSrc,
              {
                key: btch.id,
                name: btch.name || "",
                type: btch.batch_type === "value1" ? "Individual" : "Group",
                price: btch.total_price,
                attendees: btch.attendees || 0,
                // lastdate: moment(btch.enroll_last_date).format("MM/DD/YYYY"),

                duration: btch.total_duration,
                batchpricepermonth: btch.price,
              },
            ];
          }
        });
      });
    }
    setisLoading(false);
  }, [allBatches, createdCourseId]);
  useEffect(() => {
    let a = parseFloat(batchprice) + parseFloat((batchprice * 10) / 100);
    setbatchDisplayprice(a);
  }, [batchprice]);
  useEffect(() => {
    let a =
      parseFloat(batchpricepermonth) +
      parseFloat((batchpricepermonth * 10) / 100);
    setbatchdisplaypricepermonth(a);
  }, [batchpricepermonth]);
  const onChange = (e) => {
    setcoursetype(e.target.value);
  };
  useEffect(() => {
    seteventStartEndDate(["", ""]);
    setEndDate("");
    setStartDate("");
    form.setFieldsValue({
      sedate: ["", ""],
    });
  }, [duration]);
  const [form] = Form.useForm();

  function findBatch(batch, idx) {
    return batch.id == idx;
  }
  const editbatch = (e, idx) => {
    setSelectedId(idx);
    setisEdit(true);
  };
  const deletebatch = () => {
    let updatedValues = [];
    for (let i = 0; i < batches.length; i++) {
      if (batches[i].key != selectedId) {
        updatedValues.push(batches[i]);
      }
    }
    setbatches(updatedValues);
    INITIAL_BATCHES = updatedValues;
    settblSrc(INITIAL_BATCHES);
    setbatches(INITIAL_BATCHES);
    resetFields();
  };

  const resetFields = () => {
    form.setFieldsValue({
      batchname: "",
      // enrolmentdate: "",
      courseType: "value1",
      price: 0,
      attendees: "",
      pricepermonth: 0,
      duration: "",
      display: 0,
      displaytotal: 0,
    });
    setcoursetype("value1");
    setbatchname("");
    setbatchprice("");
    setbatchDisplayprice(0);
    setbatchdisplaypricepermonth(0);
    setbatchpricepermonth(0);
    setattendees(1);
    // setlastdate("");
    setisEdit(false);
    setSelectedId("");
  };
  const save = () => {
    const name = document.getElementById("info_batchname")
      ? document.getElementById("info_batchname").value
      : "";
    // const enrollmentdate = document.getElementById("info_enrolmentdate")
    //   ? document.getElementById("info_enrolmentdate").value
    //   : "";
    const price = document.getElementById("info_price")
      ? document.getElementById("info_price").value
      : "";
    const attendees = document.getElementById("info_attendees")
      ? document.getElementById("info_attendees").value
      : "";
    const type = coursetype;
    let updatedValues = batches;
    for (let i = 0; i < batches.length; i++) {
      if (batches[i].key == selectedId) {
        updatedValues[i].key = batches[i].key;
        updatedValues[i].name = name;
        // updatedValues[i].lastdate = enrollmentdate;
        updatedValues[i].price = price;
        updatedValues[i].attendees = attendees || 1;
        updatedValues[i].type = coursetype == "value1" ? "Individual" : "Group";
      }
    }
    setbatches(updatedValues);
    INITIAL_BATCHES = updatedValues;
    settblSrc(INITIAL_BATCHES);
    setbatchInfo(INITIAL_BATCHES);
    resetFields();
  };
  const cancel = () => {
    resetFields();
  };
  const addNewBatch = (e) => {
    // if (canCreateNewBatch === true) {
    e.preventDefault();
    if (batchname !== "" && batchprice !== "") {
      // setcanCreateNewBatch(false);
      let randomIdx = Math.random();
      settblSrc((tblSrc) => [
        ...tblSrc,
        {
          key: randomIdx,
          name: batchname,
          type: coursetype === "value1" ? "Individual" : "Group",
          price: batchDisplayprice,
          attendees: attendees,
          // lastdate: moment(lastdate).format("MM/DD/YYYY"),
          duration: duration,
          batchpricepermonth: batchdisplaypricepermonth,
        },
      ]);
      setbatchInfo({
        key: randomIdx,
        name: batchname,
        type: coursetype === "value1" ? "Individual" : "Group",
        price: batchDisplayprice,
        attendees: attendees,
        // lastdate: moment(lastdate).format("MM/DD/YYYY"),
        duration: duration,
        batchpricepermonth: batchdisplaypricepermonth,
        edit: (
          <Fragment>
            <EditOutlined onClick={(e) => editbatch(e, randomIdx)} /> &nbsp;
            <DeleteOutlined onClick={(e) => deletebatch(e, randomIdx)} />
          </Fragment>
        ),
      });
      let creationObj = {
        name: batchname,
        type: coursetype === "value1" ? "Individual" : "Group",
        batchpricepermonth: batchdisplaypricepermonth,
        price: batchDisplayprice,
        duration: duration,
      };
      createBatch(e, creationObj);
      resetFields();
    }
    // } else {
    //   errorNotification("Please save your batch by clicking on save button!!");
    // }
  };
  const onEnrollmentChange = (date) => {
    setlastdate(date);
  };
  const plainOptions = [
    { label: "Su", value: 0 },
    { label: "Mo", value: 1 },
    { label: "Tu", value: 2 },
    { label: "We", value: 3 },
    { label: "Th", value: 4 },
    { label: "Fr", value: 5 },
    { label: "Sa", value: 6 },
  ];

  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 30;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 30;
    return tooEarly || tooLate;
  };

  const disabledDateOld = (current) => {
    if (duration != "0") {
      if (!dates || dates.length === 0) {
        return false;
      }
      const tooLate =
        dates[0] && current.diff(dates[0], "months") > parseInt(duration) - 1;
      const tooEarly =
        dates[1] &&
        dates[1].diff(current, "months") > parseInt(duration) - 1 &&
        current < moment();
      return tooEarly || tooLate;
    } else {
      if (!dates || dates.length === 0) {
        return false;
      }
      const tooLate = dates[0] && current.diff(dates[0], "months") > 0;
      const tooEarly = dates[1] && dates[1].diff(current, "months") > 0;
      return tooEarly || tooLate;
    }
  };

  return (
    <BasicFormWrapper className="basic-form-inner">
      <div className="atbd-form-checkout">
        <Row justify="center">
          <Col sm={22} xs={24}>
            <div className="create-account-form">
              <Heading as="h4">2. Please Fill Batch Information</Heading>
              <Form
                style={{ width: "100%" }}
                form={form}
                name="info"
                onFinish={!isEdit ? addNewBatch : save}
                initialValues={{
                  batchname: batchname,
                  // enrolmentdate:
                  //   lastdate !== "" ? moment(lastdate).format() : lastdate,
                  courseType: coursetype,
                  price: batchprice,
                  attendees: attendees,
                }}
              >
                <Form.Item label="Batch Name" name="batchname" required>
                  <Input
                    value={batchname}
                    onChange={(e) => setbatchname(e.target.value)}
                    placeholder="Morning Batch"
                  />
                </Form.Item>
                <Form.Item label="Event Title" name="title">
                  <Input
                    onChange={(e) => {
                      isEventEditMode
                        ? settitle(e.target.value)
                        : setEventTitle(e.target.value);
                    }}
                    placeholder="Eg. React Training Class"
                  />
                </Form.Item>
                <Form.Item name="duration" required label="Duration">
                  <Select
                    placeholder="Batch Duration in months"
                    required
                    // defaultValue="lucy"
                    style={{ width: 120 }}
                    onChange={(value) => setduration(value)}
                  >
                    <Option value="0"> Less than 1 Month</Option>
                    <Option value="1">1 Month</Option>
                    <Option value="2">2 Months</Option>
                    <Option value="3">3 Months</Option>
                    <Option value="4">4 Months</Option>
                    <Option value="5">5 Months</Option>
                    <Option value="6">6 Months</Option>
                  </Select>
                </Form.Item>

                {/* <Col sm={24} xs={24} md={11} lg={11} xl={11} xxl={11}>
                    <Form.Item
                      label="Enrollment last date"
                      name="enrolmentdate"
                      required
                    >
                      <DatePicker onChange={onEnrollmentChange} />
                    </Form.Item>
                  </Col> */}

                <Form.Item
                  initialValue={coursetype}
                  name="courseType"
                  label="Course Type"
                  required
                >
                  <Radio.Group onChange={onChange} value={"value1"}>
                    <Radio value={"value1"}>Individual</Radio>
                    <Radio value={"value2"}>Group</Radio>
                  </Radio.Group>
                </Form.Item>
                {coursetype !== "value1" && (
                  <Form.Item name="attendees" label="Number of attendies">
                    <Input
                      type="number"
                      onChange={(e) => setattendees(e.target.value)}
                      placeholder="5"
                    />
                  </Form.Item>
                )}
                {duration != "0" && duration != "1" && (
                  <Row>
                    <Col sm={24} xs={24} md={11} lg={11} xl={11} xxl={11}>
                      <Form.Item
                        name="pricepermonth"
                        required
                        label="Price per month"
                      >
                        <Input
                          type="number"
                          onChange={(e) => {
                            setbatchpricepermonth(e.target.value);
                          }}
                          placeholder="4500"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={1} xs={1} md={1} lg={1} xl={1} xxl={1}></Col>

                    <Col sm={24} xs={24} md={11} lg={11} xl={11} xxl={11}>
                      <Form.Item name="display" label="Display Price">
                        {batchdisplaypricepermonth}
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                <br />
                <Row>
                  <Col sm={24} xs={24} md={11} lg={11} xl={11} xxl={11}>
                    <Form.Item
                      name="price"
                      required
                      label="Price(Total Course Price)"
                    >
                      <Input
                        type="number"
                        onChange={(e) => {
                          setbatchprice(e.target.value);
                        }}
                        placeholder="4500"
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={1} xs={1} md={1} lg={1} xl={1} xxl={1}></Col>

                  <Col sm={24} xs={24} md={11} lg={11} xl={11} xxl={11}>
                    <Form.Item name="displaytotal" label="Display Price">
                      {isNaN(batchDisplayprice) ? 0 : batchDisplayprice}
                    </Form.Item>
                  </Col>
                </Row>
                <br />

                <Form.Item label="Event Start and End Date" name="sedate">
                  {duration < 1 ? (
                    <DateRangePicker
                      onChange={(date) => {
                        seteventStartEndDate(date);
                        setdteRange(date);
                      }}
                      value={hackValue || value}
                      onOpenChange={onOpenChange}
                      onCalendarChange={(val) => setDates(val)}
                      disabledDate={disabledDate}
                    />
                  ) : (
                    <Row gutter={24}>
                      <Col xs={24} sm={24} lg={12} md={12} xl={12} xxl={12}>
                        <DatePicker
                          placeholder="Course Start Date"
                          value={startDate}
                          disabledDate={(current) => {
                            return current && current < moment();
                          }}
                          disabled={duration == "" ? true : false}
                          onChange={(date) => {
                            setEndDate(moment(date).add(duration, "M"));
                            setStartDate(date);
                            seteventStartEndDate([
                              date,
                              moment(date).add(duration, "M"),
                            ]);
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={24} lg={12} md={12} xl={12} xxl={12}>
                        <DatePicker
                          placeholder="Course End Date"
                          disabled
                          value={endDate._isValid ? endDate : ""}
                        />
                      </Col>
                    </Row>
                  )}

                  {/* <DateRangePicker
                    onChange={(date) => {
                      seteventStartEndDate(date);
                      setdteRange(date);
                    }}
                    value={hackValue || value}
                    onOpenChange={onOpenChange}
                    onCalendarChange={(val) => setDates(val)}
                    disabledDate={disabledDate}
                  /> */}
                </Form.Item>
                <Form.Item label="Days" name="days">
                  <Checkbox.Group
                    options={plainOptions}
                    onChange={isEventEditMode ? setbatch_day : setdays}
                  />
                </Form.Item>
                <Form.Item label="Time Slot" name="multipledaytime">
                  <RangePicker
                    onChange={(time) => {
                      seteventTimeSlot(time);
                    }}
                    minuteStep={15}
                    defaultOpenValue={moment("00:00:00", "HH:mm")}
                    format={format}
                  />
                </Form.Item>
                <Form.Item>
                  {!isEdit &&
                    (canCreateNewBatch === true ? (
                      <Button
                        className="btn-signin"
                        onClick={addNewBatch}
                        style={{ float: "right" }}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        shape="round"
                        block
                      >
                        Create Batch
                      </Button>
                    ) : (
                      <>
                        <br />
                        <Alert
                          message="Please schedule your new batch before creating another"
                          type="warning"
                          showIcon
                        />
                      </>
                    ))}
                  {isEdit && (
                    <div style={{ float: "right" }}>
                      <Button
                        className="btn-signin"
                        onClick={save}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        shape="round"
                      >
                        Save
                      </Button>{" "}
                      &nbsp;
                      <Button
                        className="btn-signin"
                        onClick={cancel}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        shape="round"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </Form.Item>
                {/* <Form.Item label="Batch List">
                  <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={tblSrc}
                  />
                </Form.Item> */}
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </BasicFormWrapper>
  );
}

export default Batch;
