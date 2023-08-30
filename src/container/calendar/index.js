// --Lokesh
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Main } from "../styled";
import { useDispatch, useSelector } from "react-redux";
import { Cards } from "../../components/cards/frame/cards-frame";
import { CustomCalender } from "../../components/calender/calender";
import axiosInstance from "../../config/axoisconfig";
import { editBatch, deleteBatch } from "../../redux/course/actionCreator";
import moment from "moment";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [isEventEditMode, setisEventEditMode] = useState(false);
  const [allBatches, setallBatches] = useState([]);
  const [clickedEvent, setclickedEvent] = useState("");
  const [currentBatchInfo, setcurrentBatchInfo] = useState({});
  const [batch_type, setbatch_type] = useState("value1");
  const [batch_day, setbatch_day] = useState([]);
  const [end_date, setend_date] = useState("");
  const [end_time, setend_time] = useState("");
  const [enroll_last_date, setenroll_last_date] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [start_date, setstart_date] = useState("");
  const [start_time, setstart_time] = useState("");
  const [title, settitle] = useState("");
  const [duration, setduration] = useState("");
  const [monthprice, setmonthprice] = useState("");
  const [eventStartEndDate, seteventStartEndDate] = useState("");
  const [eventTimeSlot, seteventTimeSlot] = useState("");
  const [participants_size, setparticipants_size] = useState(0);
  const [participants_total_size, setparticipants_total_size] = useState(0);

  useEffect(() => {
    if (clickedEvent !== "") {
      getBatchInfo(clickedEvent.id);
    }
  }, [clickedEvent]);
  useEffect(() => {
    getBatches();
  }, []);

  useEffect(() => {
    if (Object.keys(currentBatchInfo).length > 0) {
      setisEventEditMode(true);
      setVisible(true);
      setbatch_type(currentBatchInfo.batch_type);
      setbatch_day(currentBatchInfo.batch_day);
      setend_date(currentBatchInfo.end_date);
      setend_time(currentBatchInfo.end_time);
      setenroll_last_date(currentBatchInfo.enroll_last_date);
      setname(currentBatchInfo.name);
      setprice(currentBatchInfo.total_price);
      setparticipants_size(currentBatchInfo.participants_size);
      setparticipants_total_size(currentBatchInfo.participants_total_size);
      setstart_date(currentBatchInfo.start_date);
      setstart_time(currentBatchInfo.start_time);
      settitle(currentBatchInfo.title);
      setmonthprice(currentBatchInfo.price);
      setduration(currentBatchInfo.total_duration);
    }
  }, [currentBatchInfo]);
  const getBatchInfo = (eventId) => {
    if (eventId !== "") {
      let url = "https://api.esculae.com/api/v1/course/batch/" + eventId;
      axiosInstance
        .get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          setcurrentBatchInfo(resp.data);
        })
        .catch((err) => {
          errorNotification("Error in getting the batch information");
        });
    }
  };
  const getBatches = () => {
    let url = `https://api.esculae.com/api/v1/course/batch?created_by=${localStorage.currentUserInfo}`;
    axiosInstance
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setallBatches(resp.data);
      })
      .catch((err) => {
        console.log("Error in getting batches", err);
      });
  };
  const updateBatch = () => {
    if (
      title !== "" &&
      batch_day.length > 0 &&
      start_date !== "" &&
      start_time !== "" &&
      enroll_last_date !== "" &&
      name !== "" &&
      price !== ""
    ) {
      let startDate = "";
      let endDate = "";
      let sTime = "";
      let eTime = "";
      if (eventStartEndDate === "") {
        //no update made by useer
        startDate = currentBatchInfo.start_date;
        endDate = currentBatchInfo.end_date;
      } else {
        //user changed date, manipualte the date accordingly
        startDate = eventStartEndDate[0].format("MM/DD/YYYY");
        endDate = eventStartEndDate[1].format("MM/DD/YYYY");
      }
      if (eventTimeSlot === "") {
        sTime = currentBatchInfo.start_time;
        eTime = currentBatchInfo.end_time;
      } else {
        sTime = eventTimeSlot[0].format("HH:mm");
        eTime = eventTimeSlot[1].format("HH:mm");
      }
      let data = {
        CourseId: currentBatchInfo.CourseId,
        name: name,
        title: title,
        sub_title: null,
        batch_type: batch_type,
        enroll_last_date: moment(enroll_last_date).format("MM/DD/YYYY"),
        price: monthprice,
        participants_size: participants_size,
        start_date: startDate,
        end_date: endDate,
        batch_day: batch_day,
        total_price: price,
        total_duration: duration,
        start_time: sTime,
        end_time: eTime,
      };
      dispatch(editBatch(currentBatchInfo.id, data));
    }
  };
  const removeBatch = () => {
    dispatch(deleteBatch(clickedEvent.id));
  };
  return (
    <Main style={{ marginTop: "-3%" }}>
      <Cards title="Calendar">
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <CustomCalender
              visible={visible}
              currentBatchInfo={currentBatchInfo}
              isEventEditMode={isEventEditMode}
              seteventTimeSlot={seteventTimeSlot}
              setclickedEvent={setclickedEvent}
              setVisible={setVisible}
              eventStartEndDate={eventStartEndDate}
              seteventStartEndDate={seteventStartEndDate}
              setisEventEditMode={setisEventEditMode}
              allBatches={allBatches}
              settitle={settitle}
              setbatch_type={setbatch_type}
              setbatch_day={setbatch_day}
              setend_date={setend_date}
              setend_time={setend_time}
              setenroll_last_date={setenroll_last_date}
              setname={setname}
              setprice={setprice}
              setstart_date={setstart_date}
              setstart_time={setstart_time}
              setduration={setduration}
              setmonthprice={setmonthprice}
              title={title}
              start_date={start_date}
              start_time={start_time}
              duration={duration}
              monthprice={monthprice}
              batch_type={batch_type}
              batch_day={batch_day}
              end_date={end_date}
              end_time={end_time}
              enroll_last_date={enroll_last_date}
              name={name}
              price={price}
              editBatch={updateBatch}
              deleteBatch={removeBatch}
              participants_size={participants_size}
              participants_total_size={participants_total_size}
              setparticipants_size={setparticipants_size}
              setparticipants_total_size={setparticipants_total_size}
            />
          </Col>
        </Row>
      </Cards>
    </Main>
  );
};

export default Dashboard;
