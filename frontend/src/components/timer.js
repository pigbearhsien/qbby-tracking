import React, { useEffect, useState } from "react";
import "./timer.css";
import "./record.css";
import Clock from "../assets/clock.png";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@mui/material";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
});

var clocktimer;
var startAt = 0;
var lapTime = 0;

const StudyTimer = ({ page }) => {
  // 時、分、秒　幾位數　格式
  const pad = (num, size) => {
    var s = "00" + num;
    return s.substr(s.length - size);
  };

  // 時、分、秒　時間計算
  const formatTime = (time) => {
    var h = 0;
    var m = 0;
    var s = 0;
    var newTime = "";

    //時
    h = Math.floor(time / (60 * 60 * 1000));
    time = time % (60 * 60 * 1000);

    // 分
    m = Math.floor(time / (60 * 1000));
    time = time % (60 * 1000);

    // 秒
    s = Math.floor(time / 1000);

    // 顯示時間計算結果，套用到幾位數格式上
    newTime = [pad(h, 2), pad(m, 2), pad(s, 2)];
    return newTime;
  };

  //從外面傳入id跟timerRecords
  const studentId = "d";

  const [studyTime, setStudyTime] = useState(0);
  const [allRecords, setAllRecords] = useState([]);
  const [showRecords, setShowRecords] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [date, setDate] = useState(moment());
  const [tag, setTag] = useState("");

  const getTimerRecord = async () => {
    const {
      data: { timerRecords },
    } = await instance.get("/getTimerRecords", {
      params: { studentId: studentId },
    });
    setAllRecords(timerRecords);
  };

  var now = () => {
    return new Date().getTime();
  };

  const handleStart = () => {
    if (!started) {
      clocktimer = setInterval(() => {
        setStudyTime(lapTime + (startAt ? now() - startAt : 0));
      }, 500);
      startAt = startAt ? startAt : now();
      setStarted(true);
    }
  };

  const handleStop = () => {
    lapTime = startAt ? lapTime + now() - startAt : lapTime;
    startAt = 0;
    clearInterval(clocktimer);
    setStarted(false);
  };

  const handleReset = () => {
    handleStop();
    startAt = lapTime = 0;
    setStudyTime(0);
    setTag("");
  };

  useEffect(() => {
    if (startAt) {
      setStudyTime(lapTime + now() - startAt);
      handleStart();
      getTimerRecord();
    } else {
      setStudyTime(lapTime);
      getTimerRecord();
    }
  }, [page]);

  const createRecord = async (record) => {
    await instance.post("/createTimerRecord", {
      studentId: studentId,
      newRecord: record,
    });
  };

  const handleSave = () => {
    if (studyTime) {
      let newRecord = {
        date: moment().format("YYYY/MM/DD"),
        currentTime: moment().format("HH:mm"),
        tag: tag,
        recordTime: studyTime,
      };
      setAllRecords([...allRecords, newRecord]);
      handleReset();
      createRecord(newRecord);
    }
  };

  const deleteRecord = async (newRecords) => {
    await instance.post("/deleteTimerRecord", {
      studentId: studentId,
      new: newRecords,
    });
  };
  const handleDelete = (item) => {
    setAllRecords(allRecords.filter((r) => r !== item.item));
    deleteRecord(allRecords.filter((r) => r !== item.item));
  };

  useEffect(() => {
    setShowRecords(
      allRecords.filter((r) => r.date === date.format("YYYY/MM/DD"))
    );
  }, [allRecords, date]);

  useEffect(() => {
    setTotalTime(showRecords.reduce((a, v) => (a = a + v.recordTime), 0));
  }, [showRecords]);

  return (
    <>
      <div className="Wrapper">
        <div className="TimerWrapper" style={{ userSelect: "none" }}>
          <p className="timerTitle">FocusTimer</p>
          <div className="clock">
            <img src={Clock} alt="Clock" width={"250px"} />
          </div>
          <div className="button">
            <button className="timerBtn" onClick={() => handleStart()}>
              Start
            </button>
            <button className="timerBtn" onClick={() => handleStop()}>
              Stop
            </button>
            <button className="timerBtn" onClick={() => handleReset()}>
              Reset
            </button>
          </div>
          <div className="time">
            <div className="time-block">
              <p className="text">HOURS</p>
              <p className="num">{formatTime(studyTime)[0]}</p>
            </div>
            <div className="time-block">
              <p className="text">MINUTES</p>
              <p className="num">{formatTime(studyTime)[1]}</p>
            </div>
            <div className="time-block">
              <p className="text">SECONDS</p>
              <p className="num">{formatTime(studyTime)[2]}</p>
            </div>
          </div>
        </div>
        <div className="RecordWrapper">
          <div className="pickDate">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                inputFormat="MMM DD (ddd)"
                value={date}
                disableFuture={true}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="viewDate">
            <div className="date">
              {date.format("MMM DD (ddd)") === moment().format("MMM DD (ddd)")
                ? "Today"
                : `${date.format("MMM DD")}`}
            </div>
            <p className="totalTime">
              Total: {formatTime(totalTime)[0]}h{formatTime(totalTime)[1]}m
              {formatTime(totalTime)[2]}s
            </p>
          </div>
          <div variant="outlined" className="content">
            {showRecords.length !== 0 ? (
              <>
                {showRecords.map((item, i) => (
                  <>
                    <div key={i} className="recordRow">
                      <div
                        style={{
                          fontFamily: "Comic Sans MS",
                          color: "rgba(128, 128, 128, 0.8)",
                          fontSize: "80%",
                        }}
                      >
                        {item.currentTime}
                      </div>
                      <div className="tag">{item.tag}</div>
                      <div style={{ fontFamily: "Comic Sans MS" }}>
                        {formatTime(item.recordTime)[0]}h
                        {formatTime(item.recordTime)[1]}m
                        {formatTime(item.recordTime)[2]}s
                      </div>
                      <IconButton
                        style={{ width: "20%" }}
                        onClick={() => handleDelete({ item })}
                      >
                        <RiDeleteBin5Fill size={22} />
                      </IconButton>
                    </div>
                  </>
                ))}
              </>
            ) : (
              <>
                <div
                  style={{
                    fontFamily: "Comic Sans MS",
                    color: "rgba(128, 128, 128, 0.6)",
                  }}
                >
                  No record
                </div>
              </>
            )}
          </div>
          <div className="footer">
            {date.format("MMM DD (ddd)") === moment().format("MMM DD (ddd)") ? (
              <>
                <p className="tagText">Tag: </p>
                <TextField
                  className="tapInput"
                  placeholder="Enter Tag"
                  value={tag}
                  style={{ width: 130 }}
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                />
                <button
                  className="saveBtn"
                  variant="contained"
                  disabled={!tag}
                  onClick={handleSave}
                >
                  Save record
                </button>
              </>
            ) : (
              <p className="tagText">WELL DONE!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyTimer;
