import React, { useEffect, useState } from "react";
var clocktimer;
var startAt = 0;
var lapTime = 0;

const StudyTimer = () => {
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
    newTime = pad(h, 2) + "h" + pad(m, 2) + "m" + pad(s, 2) + "s";
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

  const handolReset = () => {
    handleStop();
    startAt = lapTime = 0;
    setStudyTime(0);
  };

  const handleSave = () => {
    let currentTime = formatTime(now());
    let newRecord = { currentTime: currentTime, recordTime: studyTime };
    setRecord(() => (studyTime ? [...record, newRecord] : [...record]));
    handolReset();
  };

  useEffect(() => {
    setTotalTime(record.reduce((a, v) => (a = a + v.recordTime), 0));
  }, [record]);

  return (
    <>
      <div className="TimerWrapper">
        <p className="title">StudyTimer</p>
        <div className="countingTime">{formatTime(studyTime)}</div>
        <button className="btn" onClick={() => handleStart()}>
          Start
        </button>
        <button className="btn" onClick={() => handleStop()}>
          Stop
        </button>
        <button className="btn" onClick={() => handolReset()}>
          Reset
        </button>
        <button className="btn" onClick={() => handleSave()}>
          Save record
        </button>
      </div>
      <div className="RecordWrapper">
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
      </div>
    </>
  );
};

export default StudyTimer;
