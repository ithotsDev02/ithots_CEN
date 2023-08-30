import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import events from "./events";
import moment from "moment";
import * as dates from "./dates";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import CustomAgenda from "./customAgenda";
// import "react-big-calendar/lib/sass/styles.scss";
import { CustomPopover } from "./popover";
import { Fragment } from "react";

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

let CustomCalender = ({
  allBatches,
  EventTitle,
  setEventTitle,
  eventStartEndDate,
  seteventStartEndDate,
  days,
  setdays,
  eventTimeSlot,
  seteventTimeSlot,
  setclickedEvent,
  getBatchInfo,
  currentBatchInfo,
  isEventEditMode,
  visible,
  setVisible,
  batch_type,
  deleteBatch,
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
  setbatch_day,
  setend_date,
  setend_time,
  setenroll_last_date,
  setname,
  setprice,
  setstart_date,
  setstart_time,
  settitle,
  setisEventEditMode,
  editBatch,
  duration,
  monthprice,
  setduration,
  setmonthpice,
  participants_size,
  participants_total_size,
  setparticipants_size,
  setparticipants_total_size,
}) => {
  const [eventList, seteventList] = useState([]);
  let calenderEvents = [];
  useEffect(() => {
    if (allBatches && allBatches.data && allBatches.data.length > 0) {
      allBatches.data.map((batch) => {
        if (
          batch.CourseId !== null &&
          batch.batch_type !== null &&
          batch.end_date !== null &&
          batch.end_time !== null &&
          batch.enroll_last_date !== null &&
          batch.start_date !== null &&
          batch.start_time !== null
        ) {
          let filteredDates = [];
          let yr = "";
          let mnth = "";
          let dte = "";
          let endyr = "";
          let endmnth = "";
          let enddte = "";
          if (batch.batch_day.length > 0) {
            batch.batch_day.map((days) => {
              filteredDates.push(
                filterDateByDays(batch.start_date, batch.end_date, days)
              );
            });
            if (filteredDates.length > 0) {
              filteredDates.map((outer) => {
                outer.map((inner) => {
                  console.log(
                    "ASDASDASDAF",
                    moment(inner).format("YYYY,MM,DD")
                  );
                  yr = moment(inner)
                    .format("YYYY,MM,DD")
                    .split(",")[0];
                  mnth = moment(inner)
                    .format("YYYY,MM,DD")
                    .split(",")[1];
                  dte = moment(inner)
                    .format("YYYY,MM,DD")
                    .split(",")[2];
                  endyr = moment(inner)
                    .format("YYYY,MM,DD")
                    .split(",")[0];
                  endmnth = moment(inner)
                    .format("YYYY,MM,DD")
                    .split(",")[1];
                  enddte = moment(inner)
                    .format("YYYY,MM,DD")
                    .split(",")[2];
                  let stHr = batch.start_time.split(":")[0];
                  let stMin = batch.start_time.split(":")[1];
                  let stSec = batch.start_time.split(":")[2];

                  let endHr = batch.end_time.split(":")[0];
                  let endMin = batch.end_time.split(":")[1];
                  let endSec = batch.end_time.split(":")[2];
                  let tmp = {};
                  tmp.id = batch.id;
                  tmp.title = batch.title;
                  tmp.start = new Date(yr, mnth - 1, dte, stHr, stMin, stSec);
                  tmp.end = new Date(
                    endyr,
                    endmnth - 1,
                    enddte,
                    endHr,
                    endMin,
                    endSec
                  );
                  calenderEvents.push(tmp);
                });
              });
            }
          } else {
            yr = moment(batch.start_date)
              .format("YYYY,MM,DD")
              .split(",")[0];
            mnth = moment(batch.start_date)
              .format("YYYY,MM,DD")
              .split(",")[1];
            dte = moment(batch.start_date)
              .format("YYYY,MM,DD")
              .split(",")[2];
            endyr = moment(batch.end_date)
              .format("YYYY,MM,DD")
              .split(",")[0];
            endmnth = moment(batch.end_date)
              .format("YYYY,MM,DD")
              .split(",")[1];
            enddte = moment(batch.end_date)
              .format("YYYY,MM,DD")
              .split(",")[2];
            let stHr = batch.start_time.split(":")[0];
            let stMin = batch.start_time.split(":")[1];
            let stSec = batch.start_time.split(":")[2];

            let endHr = batch.end_time.split(":")[0];
            let endMin = batch.end_time.split(":")[1];
            let endSec = batch.end_time.split(":")[2];
            let tmp = {};
            tmp.id = batch.id;
            tmp.title = batch.title;
            tmp.meetingId = batch.meeting_id;
            tmp.start = new Date(yr, mnth - 1, dte, stHr, stMin, stSec);
            tmp.end = new Date(
              endyr,
              endmnth - 1,
              enddte,
              endHr,
              endMin,
              endSec
            );
            calenderEvents.push(tmp);
          }
          console.log("the filtered dates are----", filteredDates);
        }
      });
      seteventList(calenderEvents);
      console.log("the calender events", calenderEvents || []);
    }
  }, [allBatches?.data]);
  const filterDateByDays = (startRange, endRange, day) => {
    console.log("inside date filter");
    var start = moment(startRange), // Sept. 1st
      end = moment(endRange), // Nov. 2nd
      day = day; // Sunday
    var result = [];
    var current = start.clone();

    while (current.day(day).isSameOrBefore(end)) {
      result.push(current.clone());
      current.day(7 + day);
    }
    console.log("tdfasas0", result);

    console.log(result.map((m) => m.format("LLLL")));
    return result;
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const eventClicked = (eventInfo) => {
    getBatchInfo(eventInfo.id);
  };
  const handleshowPopup = (slotInfo) => {
    if (EventTitle !== "") {
      setVisible(true);
    }
  };
  const MyCustomAgendaComponent = () => {
    return "Hey HI";
  };
  return (
    <Fragment>
      {isEventEditMode ? (
        <CustomPopover
          Modaltitle={
            isEventEditMode ? "Update Course Schedule" : "Schedule Course"
          }
          handleOk={handleOk}
          setisEventEditMode={setisEventEditMode}
          handleCancel={handleCancel}
          visible={visible}
          setVisible={setVisible}
          currentBatchInfo={currentBatchInfo}
          isEventEditMode={isEventEditMode}
          batch_type={batch_type}
          batch_day={batch_day}
          end_date={end_date}
          end_time={end_time}
          enroll_last_date={enroll_last_date}
          name={name}
          price={price}
          start_date={start_date}
          start_time={start_time}
          title={title}
          setbatch_type={setbatch_type}
          setbatch_day={setbatch_day}
          setend_date={setend_date}
          setend_time={setend_time}
          setenroll_last_date={setenroll_last_date}
          setname={setname}
          setprice={setprice}
          setstart_date={setstart_date}
          setstart_time={setstart_time}
          settitle={settitle}
          deleteBatch={deleteBatch}
          editBatch={editBatch}
          eventStartEndDate={eventStartEndDate}
          seteventStartEndDate={seteventStartEndDate}
          eventTimeSlot={eventTimeSlot}
          seteventTimeSlot={seteventTimeSlot}
          duration={duration}
          monthprice={monthprice}
          setduration={setduration}
          setmonthpice={setmonthpice}
          participants_size={participants_size}
          participants_total_size={participants_total_size}
          setparticipants_size={setparticipants_size}
          setparticipants_total_size={setparticipants_total_size}
        />
      ) : (
        <CustomPopover
          Modaltitle={
            isEventEditMode ? "Update Course Schedule" : "Schedule Course"
          }
          handleOk={handleOk}
          handleCancel={handleCancel}
          setisEventEditMode={setisEventEditMode}
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
          deleteBatch={deleteBatch}
          editBatch={editBatch}
        />
      )}

      <div style={{ height: 700, width: "100%" }}>
        <Calendar
          selectable
          onSelectEvent={(event) => {
            setclickedEvent(event);
          }}
          // onSelectSlot={(slotInfo) => {
          //   handleshowPopup(slotInfo);
          // }}
          // onSelectSlot={(slotInfo) => {
          //   setVisible(true);
          // }}
          events={eventList}
          // views={allViews}
          step={30}
          views={{ month: true, agenda: CustomAgenda, day: true }}
          // views={["month", "agenda", "day"]}
          defaultView="month"
          showMultiDayTimes
          // max={dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours")}
          defaultDate={new Date()}
          components={{
            event: Event,
            timeSlotWrapper: ColoredDateCellWrapper,
          }}
          localizer={localizer}
        />
      </div>
    </Fragment>
  );
};
function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ":  " + event.desc}
    </span>
  );
}
export { CustomCalender };
