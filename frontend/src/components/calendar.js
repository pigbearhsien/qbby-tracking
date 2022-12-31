import { React, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // needs additional webpack config!
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "../hooks/api"

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [eventClicked, setEventClicked] = useState("")
  const [stdStartClicked, setStdStartClicked] = useState("")
  const [stdEndClicked, setStdEndClicked] = useState("")

  const [resetCount, setResetCount] = useState(0)
  const [newEvent, setNewEvent] = useState("");
  const [delEvent, setDelEvent] = useState("")
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventStartShow, setEventStartShow] = useState("");
  const [eventEndShow, setEventEndShow] = useState("");
  const [eventWarn, setEventWarn] = useState("hidden");
  const [warnmsg, setWarnmsg] = useState("");
  const [delPopup, setDelPopup] = useState(false)
  const [popup, setPopup] = useState(false);
  const [type, setType] = useState("");
  const [typecolor, setTypeColor] = useState("");


  const eventOnClick = (e)=>{
    const event = e.event.title
    setStdStartClicked(e.event.startStr)
    setStdEndClicked(e.event.endStr)
    setEventClicked(event)
    setDelPopup(true)
  }

  const deleteEvent = async()=>{
    if(delEvent === eventClicked){
      console.log("correct input")
      const {data:{msg}} = await axios.post("deleteCalendarEvent/", {
        name: eventClicked,              
        stdEventStart: stdStartClicked,          // start time in standard form
        stdEventEnd: stdEndClicked               // end time in standard form
      })
      getEvent()
      setDelPopup(false);
      setEventWarn("hidden")
    }
    else{
      setWarnmsg("Wrong Input")
      setEventWarn("");
    }
    setDelEvent("")
  }

  const createEvent = async()=>{  // save event to mongoDB
    const {data:{msg}} = await axios.post("createCalendarEvent/", {
      id: "B10901098",
      name: newEvent,
      type: type,
      time: eventStartShow+eventEndShow,  // time
      color: typecolor,                   // color
      stdEventStart: eventStart,          // start time in standard form
      stdEventEnd: eventEnd               // end time in standard form
    })
  }

  const getEvent = async()=>{   // get events from mongoDB
    console.log("in getEvent")
    
    let {data: {msg, events}} = await axios.get("getCalendarEvent/", {
      params: {id: "B10901098"},
    })
    console.log("done")
    let eventArr = []
    events.events.map(event => {eventArr = [...eventArr, {
      title: event.name,
      start: event.stdEventStart,
      end: event.stdEventEnd,
      backgroundColor: event.color,
      borderColor: event.color,
    }]})
    console.log("eventArr", eventArr)
    console.log("get")
    setEvents(eventArr)
    setResetCount(resetCount+1)
  }

  useEffect(()=>{
    if(resetCount===0){
      console.log("in");
      getEvent();
    }
  }, [resetCount])


  const handleDateClick = (arg) => {  // handle select and event
    // bind with an arrow function
    setPopup(true);
    setEventStart(arg.startStr);
    setEventEnd(arg.endStr);
    let endBuffer = arg.endStr.split("-");
    let startBuffer = arg.startStr.split("-");
    if (startBuffer[2].length != 2)
      setEventStartShow(
        "from " +
          startBuffer[0] +
          "-" +
          startBuffer[1] +
          "-" +
          startBuffer[2].split("+")[0].slice(0, 8).split("T")[0] +
          " " +
          startBuffer[2].split("+")[0].slice(0, 8).split("T")[1]
      );
    else setEventStartShow("from " + arg.startStr);
    if (endBuffer[2].length == 2) {
      let day = new Date(new Date(arg.endStr).valueOf() - 86400000);
      day = day.toLocaleDateString().split("/");
      if (day[2].length == 1) day[2] = "0" + day[2];
      day = day[0] + "-" + day[1] + "-" + day[2];
      if (arg.startStr == day) {
        setEventStartShow("On " + arg.startStr);
        setEventEndShow("");
      } else setEventEndShow("to " + day);
    } else
      setEventEndShow(
        "to " +
          endBuffer[0] +
          "-" +
          endBuffer[1] +
          "-" +
          endBuffer[2].split("+")[0].slice(0, 8).split("T")[0] +
          " " +
          endBuffer[2].split("+")[0].slice(0, 8).split("T")[1]
      );
    endBuffer = endBuffer[2].split("+")[0].slice(0, 8).split("T");

    console.log(endBuffer);

    // console.log((parseInt(buffer[2], 10)-1).toString())
    // setEventEndShow(arg.endStr)
    // let event = prompt("Create an event from "+arg.startStr+" to "+arg.endStr+"(excl)\nEnter the event :")
    // prompt("hello")
    // if(event)setEvents([...eevent: event, start: arg.startStr, end: arg.endStr, backgroundColor: typecolor, borderColor: typecolor}])

    

  };

  const closePopup = () => {
    setPopup(false);
    setDelPopup(false);
    setEventWarn("hidden");
    setDelEvent("")
    setNewEvent("");
  };

  const confirm = async() => {

    if (newEvent != "" && type != "") {
      await createEvent();
      setEventWarn("hidden");
      setEvents([
        ...events,
        {
          title: newEvent,
          start: eventStart,
          end: eventEnd,
          backgroundColor: typecolor,
          borderColor: typecolor,
        },
      ]);
      setPopup(false);
      setNewEvent("");
      setType("");
    } else {
      if (newEvent == "") {
        setWarnmsg("Please Input an Event !!!");
        setNewEvent("");
      } else if (type == "") setWarnmsg("Please Select an Event Type !!!");
      setEventWarn("");
    }
  };

  const handleType = (arg) => {
    console.log(arg.target.innerHTML);
    setType(arg.target.innerHTML);
    setTypeColor(arg.target.id);
  };

  const dropdown = () => {
    if (
      document.getElementsByClassName("dropdown-menu")[0].className ===
      "dropdown-menu"
    )
      document.getElementsByClassName("dropdown-menu")[0].className =
        "dropdown-menu show";
    else
      document.getElementsByClassName("dropdown-menu")[0].className =
        "dropdown-menu";
  };

  return (
    <div style={{ userSelect: "none" }}>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          bootstrap5Plugin,
          timeGridPlugin,
          listPlugin,
          dayGridPlugin,
        ]}
        themeSystem="bootstrap5"
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        select={(e) => handleDateClick(e)}
        events={events}
        eventClick={(e)=>eventOnClick(e)}
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          end: "dayGridMonth timeGridWeek timeGridDay listWeek",
        }}
      />

      <Popup
        open={delPopup}
        contentStyle={{
          width: "25%",
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: "rgba(255,255,255,0)",
        }}
        closeOnDocumentClick={false}
      >
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">My Event</strong>
          </div>
          <div className="toast-body" style={{ opacity: "1" }}>
            <p>Enter [ {eventClicked} ] to delete</p>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Event"
                id="inputDefault"
                value={delEvent}
                onChange={(e) => setDelEvent(e.target.value)}
              />
            </div>
            <p></p>
            <span
              className="badge rounded-pill"
              style={{ backgroundColor: typecolor }}
            >
              {type}
            </span>
            <p style={{ color: "#FC7659", visibility: eventWarn }}>{warnmsg}</p>
            <button
              type="button"
              className="btn btn-primary btn-danger btn-sm"
              style={{ position: "left" }}
              onClick={deleteEvent}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={closePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      </Popup>

      <Popup
        open={popup}
        contentStyle={{
          width: "25%",
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: "rgba(255,255,255,0)",
        }}
        closeOnDocumentClick={false}
      >
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">My TODO</strong>
          </div>
          <div className="toast-body" style={{ opacity: "1" }}>
            Create an event <br></br>
            {eventStartShow} {eventEndShow}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Event"
                id="inputDefault"
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
              />
            </div>
            <p></p>
            <ul className="nav nav-pills">
              <li className="nav-item dropdown" onClick={dropdown}>
                <a
                  className="nav-link dropdown-toggle show"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  Select a Type
                </a>
                <div
                  className="dropdown-menu"
                  data-popper-placement="bottom-start"
                  style={{
                    position: "absolute",
                    inset: "0px auto auto 0px;",
                    margin: "0px;",
                    transform: "translate3d(0px, 46px, 0px);",
                  }}
                >
                  <a
                    className="dropdown-item"
                    href="#"
                    id="#FC7659"
                    onClick={(e) => handleType(e)}
                  >
                    Holidays
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    id="#FCC859"
                    onClick={(e) => handleType(e)}
                  >
                    Entertainment
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    id="#64E59A"
                    onClick={(e) => handleType(e)}
                  >
                    Meeting
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    id="#5FB3F7"
                    onClick={(e) => handleType(e)}
                  >
                    Homework
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    id="#5F67F7"
                    onClick={(e) => handleType(e)}
                  >
                    Exam
                  </a>
                  <a
                    className="dropdown-item"
                    href="#"
                    id="#D77AE7"
                    onClick={(e) => handleType(e)}
                  >
                    Chores
                  </a>
                </div>
              </li>
            </ul>
            <span
              className="badge rounded-pill"
              style={{ backgroundColor: typecolor }}
            >
              {type}
            </span>
            <p style={{ color: "#FC7659", visibility: eventWarn }}>{warnmsg}</p>
            <button
              type="button"
              className="btn btn-primary btn-info btn-sm"
              style={{ position: "left" }}
              onClick={confirm}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={closePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default MyCalendar;
