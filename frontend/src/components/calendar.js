import {React, useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // needs additional webpack config!

const MyCalendar = () => {
  const [events, setEvents] = useState([])
  const [themes, setThemes] = useState([])

  useEffect(()=>{
    fetch('https://bootswatch.com/api/5.json')
  .then(response => response.json()).then(result => setThemes(result.themes));
  }, [])  // get 

  const handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg)
    let event = prompt("Create an event from "+arg.startStr+" to "+arg.endStr+"(excl)\nEnter the event :")
    console.log(!event)
    if(event)setEvents([...events, {title: event, start: arg.startStr, end: arg.endStr}])
  }

  return(
    <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
        themeSystem= 'bootstrap5'
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        select={(e) => handleDateClick(e)}
        events={events}
        
      />
  )
}

export default MyCalendar