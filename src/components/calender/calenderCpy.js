import React, { useState } from "react";
import { Calendar, Badge } from "antd";
import { CustomPopover } from "./popover";
import moment from "moment";

import "./style.css";
const CustomCalender = ({
  onSelect,
  EventTitle,
  setEventTitle,
  eventStartEndDate,
  seteventStartEndDate,
  days,
  setdays,
  eventTimeSlot,
  seteventTimeSlot,
  allBatches,
}) => {
  const [visible, setVisible] = useState(false);
  const [selecteddate, setselecteddate] = useState("");
  console.log("the batches in calender", allBatches);
  const getListData = (value) => {
    let listData;
    console.log("thehesd fsdsdf", value.month());
    switch (value.date()) {
      case 8:
        listData = [
          { type: "warning", content: "React Coaching." },
          { type: "success", content: "Dance Class." },
        ];
        break;
      case 10:
        listData = [
          { type: "warning", content: "Media." },
          { type: "success", content: "Runntime." },
          { type: "error", content: "This is error event." },
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "This is warning event" },
          { type: "success", content: "This is very long usual event。。...." },
          { type: "error", content: "This is error event 1." },
          { type: "error", content: "This is error event 2." },
          { type: "error", content: "This is error event 3." },
          { type: "error", content: "This is error event 4." },
        ];
        break;
      default:
    }
    return listData || [];
  };
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const dateCellRender = (value) => {
    console.log("inside the date cell render", value);
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const dateSelected = (date) => {
    setVisible(true);
    setselecteddate(date);
  };

  const monthCellRender = (value) => {
    console.log("From month cell render", value);
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  return (
    <>
      <CustomPopover
        selecteddate={selecteddate}
        title="Schedule Course"
        handleOk={handleOk}
        handleCancel={handleCancel}
        visible={visible}
        setVisible={setVisible}
        EventTitle={EventTitle}
        setEventTitle={setEventTitle}
        eventStartEndDate={eventStartEndDate}
        seteventStartEndDate={seteventStartEndDate}
        days={days}
        setdays={setdays}
        eventTimeSlot={eventTimeSlot}
        seteventTimeSlot={seteventTimeSlot}
      />
      <div className="customClass">
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          onSelect={dateSelected}
          fullscreen={true}
          onPanelChange={(e) => console.log("Pannel change event triggered", e)}
        />
      </div>
    </>
  );
};

export { CustomCalender };
