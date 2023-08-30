import React, { useState, useEffect } from "react";
import { Input, Row, Col } from "antd";
import { Modal, Form, Button } from "antd";
import { DatePicker, Space } from "antd";
import { TimePicker } from "antd";
import { Radio } from "antd";
import moment from "moment";
import { Select } from "antd";
import "./style.css";
import { Checkbox } from "antd";
import { Fragment } from "react";
import { Popconfirm } from "antd";
const { RangePicker } = TimePicker;
const { Option } = Select;
const DateRangePicker = DatePicker.RangePicker;
const format = "HH:mm";
const CustomPopover = ({
  visible,
  setVisible,
  handleOk,
  handleCancel,
  Modaltitle,
  EventTitle,
  eventStartEndDate,
  days,
  eventTimeSlot,
  selecteddate,
  isEventEditMode,
  currentBatchInfo,
  batch_type,
  batch_day,
  end_date,
  end_time,
  enroll_last_date,
  name,
  price,
  start_date,
  start_time,
  title,
  setbatch_type,
  setend_date,
  setend_time,
  setenroll_last_date,
  setname,
  setprice,
  setstart_date,
  setstart_time,
  setisEventEditMode,
  deleteBatch,
  editBatch,
  duration,
  monthprice,
  setduration,
  setmonthpice,
  //lokesh
  settitle,
  setEventTitle,
  seteventStartEndDate,
  setbatch_day,
  setdays,
  seteventTimeSlot,

  participants_size,
  participants_total_size,
  setparticipants_size,
  setparticipants_total_size,
}) => {
  console.log("the end date is", end_date);
  const [occurence, setoccurence] = React.useState("daily");
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [value, setValue] = useState();
  const [endDate, setEndDate] = useState(moment(end_date));
  const [startDate, setStartDate] = useState("");
  const [form] = Form.useForm();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const clearValues = () => {
    seteventStartEndDate(["", ""]);
    setEndDate("");
    setstart_date("");
    setend_date("");
    setStartDate("");
    form.setFieldsValue({
      sedate: ["", ""],
    });
  };
  const disabledDate = (current) => {
    if (duration != "0") {
      if (!dates || dates.length === 0) {
        return false;
      }
      const tooLate =
        dates[0] && current.diff(dates[0], "months") > parseInt(duration) - 1;
      const tooEarly =
        dates[1] && dates[1].diff(current, "months") > parseInt(duration) - 1;
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

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const occurenceChange = (e) => {
    setoccurence(e.target.value);
  };
  const onChange1 = (e) => {
    console.log("radio checked", e.target.value);
    // setValue(e.target.value);
  };

  const onDayChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const handleFormSubmit = () => {
    console.log("form submitted");
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
  return (
    <Modal
      title={Modaltitle}
      visible={visible}
      width={700}
      afterClose={() => setisEventEditMode(false)}
      onOk={handleOk}
      destroyOnClose={true}
      onCancel={handleCancel}
      confirmLoading={true}
      footer={[
        isEventEditMode ? (
          <Fragment>
            {participants_size === participants_total_size && (
              <Popconfirm
                onConfirm={() => {
                  deleteBatch();
                  setVisible(false);
                }}
                onCancel={() => {
                  setVisible(false);
                }}
                title="Do you want to remove this batch permenantly？"
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">Delete</Button>
              </Popconfirm>
            )}
            ,
            <Button
              onClick={() => {
                editBatch();
                setVisible(false);
              }}
              type="primary"
              key="2"
            >
              Save
            </Button>
            ,
            <Button onClick={() => setVisible(false)} key="3">
              Cancel
            </Button>
            ,
          </Fragment>
        ) : (
          <Fragment>
            <Button
              onClick={() => {
                setVisible(false);
              }}
              type="primary"
            >
              OK
            </Button>
            ,
            <Button onClick={() => setVisible(false)} type="primary">
              Cancel
            </Button>
          </Fragment>
        ),
      ]}
    >
      <Form
        form={form}
        style={{ width: "100%" }}
        name="info"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          label="Add Title"
          name="title"
          initialValue={isEventEditMode ? title : EventTitle || ""}
        >
          <Input
            onChange={(e) => {
              isEventEditMode
                ? settitle(e.target.value)
                : setEventTitle(e.target.value);
            }}
            placeholder="Eg. React Training Class"
          />
        </Form.Item>
        {isEventEditMode && (
          <Form.Item label="Batch Name" initialValue={name} name="batchname">
            <Input
              onChange={(e) => {
                setname(e.target.value);
              }}
              placeholder="Morning Batch.."
            />
          </Form.Item>
        )}
        <Form.Item
          name="duration"
          initialValue={duration}
          required
          label="Duration"
        >
          <Select
            placeholder="Batch Duration in months"
            required
            // defaultValue="lucy"
            style={{ width: 120 }}
            onChange={(value) => {
              setduration(value);
              clearValues();
            }}
          >
            <Option value={0}>Less than 1 Month</Option>
            <Option value={1}>1 Month</Option>
            <Option value={2}>2 Months</Option>
            <Option value={3}>3 Months</Option>
            <Option value={4}>4 Months</Option>
            <Option value={5}>5 Months</Option>
            <Option value={6}>6 Months</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Start and End Date"
          initialValue={
            isEventEditMode
              ? [moment(start_date), moment(end_date)]
              : // ? [moment(start_date), moment(end_date)]
                eventStartEndDate || ""
          }
          name="sedate"
        >
          {duration < 1 ? (
            <DateRangePicker
              onChange={(date) => {
                seteventStartEndDate(date);
                // setdteRange(date);
              }}
              value={hackValue || value}
              onOpenChange={onOpenChange}
              onCalendarChange={(val) => setDates(val)}
              // disabledDate={disabledDate}
              disabledDate={(current) => {
                return (
                  current < moment() ||
                  (current && current >= moment().add(1, "month"))
                );
              }}
            />
          ) : (
            <Row gutter={24}>
              {console.log("the console log", start_date, "----", end_date)}
              <Col xs={24} sm={24} lg={12} md={12} xl={12} xxl={12}>
                <DatePicker
                  value={
                    start_date && start_date !== "" ? moment(start_date) : ""
                  }
                  disabledDate={(current) => {
                    return current && current < moment();
                  }}
                  placeholder="Course Start Date"
                  disabled={duration == "" ? true : false}
                  onChange={(date) => {
                    setEndDate(moment(date).add(duration, "M"));
                    setend_date(moment(date).add(duration, "M"));
                    setStartDate(date);
                    setstart_date(date);
                    seteventStartEndDate([
                      date,
                      moment(date).add(duration, "M"),
                    ]);
                  }}
                />
              </Col>
              <Col xs={24} sm={24} lg={12} md={12} xl={12} xxl={12}>
                <DatePicker
                  style={{ width: "50px" }}
                  placeholder="Course End Date"
                  disabled
                  value={end_date && end_date !== "" ? moment(end_date) : ""}
                />
              </Col>
            </Row>
          )}
          {/* <DateRangePicker
            onChange={(date) => {
              seteventStartEndDate(date);
            }}
            value={hackValue || value}
            onOpenChange={onOpenChange}
            onCalendarChange={(val) => setDates(val)}
            disabledDate={disabledDate}
          /> */}
        </Form.Item>
        <Form.Item
          label="Days"
          initialValue={isEventEditMode ? batch_day : days}
          name="days"
        >
          <Checkbox.Group
            options={plainOptions}
            onChange={isEventEditMode ? setbatch_day : setdays}
          />
        </Form.Item>
        <Form.Item
          label="Time Slot"
          initialValue={
            isEventEditMode
              ? [moment(start_time, "HH:mm"), moment(end_time, "HH:mm")]
              : eventTimeSlot
          }
          name="multipledaytime"
        >
          <RangePicker
            onChange={(time) => {
              seteventTimeSlot(time);
            }}
            minuteStep={15}
            defaultOpenValue={moment("00:00:00", "HH:mm")}
            format={format}
          />
        </Form.Item>
        {isEventEditMode && (
          <Fragment>
            <Form.Item label="Batch Name" initialValue={name} name="batchname">
              <Input
                onChange={(e) => {
                  setname(e.target.value);
                }}
                placeholder="Morning Batch.."
              />
            </Form.Item>
            {/* <Form.Item
              label="Enrollment last date"
              initialValue={moment(enroll_last_date)}
              name="rnrolllastname"
            >
              <DatePicker
                onChange={(date) => {
                  setenroll_last_date(date);
                }}
              />
            </Form.Item> */}

            {/* <Form.Item
              initialValue={batch_type}
              name="courseType"
              label="Course Type"
            >
              <Radio.Group
                onChange={(e) => setbatch_type(e.target.value)}
                value={"value1"}
              >
                <Radio value={"value1"}>Individual</Radio>
                <Radio value={"value2"}>Group</Radio>
              </Radio.Group>
            </Form.Item> */}
            {/* {batch_type !== "value1" && (
              <Form.Item
                name="attendees"
                initialValue={participants_size}
                label="Number of attendies"
              >
                <Input
                  type="number"
                  onChange={(e) => setparticipants_size(e.target.value)}
                  placeholder="5"
                />
              </Form.Item>
            )} */}
            {duration != "0" && duration != "1" ? (
              <Form.Item
                initialValue={monthprice}
                name="pricepermonth"
                required
                label="Price per month"
              >
                <Input
                  type="number"
                  onChange={(e) => {
                    setmonthpice(e.target.value);
                  }}
                  placeholder="4500"
                />
              </Form.Item>
            ) : (
              ""
            )}
            <Form.Item
              label="Price(Total Price)"
              initialValue={price}
              name="price"
            >
              <Input
                onChange={(e) => {
                  setprice(e.target.value);
                }}
                placeholder="5500"
              />
            </Form.Item>
          </Fragment>
        )}
      </Form>
    </Modal>
  );
};

export { CustomPopover };
