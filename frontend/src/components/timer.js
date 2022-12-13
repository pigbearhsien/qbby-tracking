import React, { useEffect, useState } from "react";
import "./timer.css";
import Clock from "../assets/clock.png";
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

  const [studyTime, setStudyTime] = useState(0);
  const [record, setRecord] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [started, setStarted] = useState(false);

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
  };

  // const handleSave = () => {
  //   let currentTime = formatTime(now());
  //   let newRecord = { currentTime: currentTime, recordTime: studyTime };
  //   setRecord(() => (studyTime ? [...record, newRecord] : [...record]));
  //   handolReset();
  // };

  useEffect(() => {
    setTotalTime(record.reduce((a, v) => (a = a + v.recordTime), 0));
  }, [record]);

  useEffect(() => {
    if (startAt) {
      setStudyTime(lapTime + now() - startAt);
      handleStart();
    } else {
      setStudyTime(lapTime);
    }
    // setStudyTime(lapTime + (startAt ? now() - startAt : 0));
    // setStudyTime(studyTime);
  }, [page]);

  return (
    <>
      <div className="TimerWrapper" style={{ userSelect: "none" }}>
        <p className="title h1">StudyTimer</p>
        <div className="clock">
          <img src={Clock} alt="Clock" width={"250px"} />
        </div>
        <div className="button">
          <button
            className="btn timerBtn btn-primary btn-lg"
            onClick={() => handleStart()}
          >
            Start
          </button>
          <button
            className="btn timerBtn btn-primary btn-lg"
            onClick={() => handleStop()}
          >
            Stop
          </button>
          <button
            className="btn timerBtn btn-primary btn-lg"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        </div>
        <div className="time">
          <div className="time-block">
            <p className="mb-0 text">HOURS</p>
            <p className="text-warning num">{formatTime(studyTime)[0]}</p>
          </div>
          <div className="time-block">
            <p className="mb-0 text">MINUTES</p>
            <p className="text-warning num">{formatTime(studyTime)[1]}</p>
          </div>
          <div className="time-block">
            <p className="mb-0 text">SECONDS</p>
            <p className="text-warning num">{formatTime(studyTime)[2]}</p>
          </div>
        </div>
        {/* <div className="countingTime">{formatTime(studyTime)}</div> */}

        {/* <button className="btn btn-info" onClick={() => handleSave()}>
          Save record
        </button> */}
      </div>
      {/* <div className="RecordWrapper">
        <p className="title">Record</p>
        <div>
          {record.map((item) => (
            <>
              <div key={item.currentTime} className="timeRecord">
                {formatTime(item.recordTime)}
              </div>
            </>
          ))}
        </div>
        <p className="totaTime">Total time: {formatTime(totalTime)}</p>
      </div> */}
    </>
  );
};

export default StudyTimer;
