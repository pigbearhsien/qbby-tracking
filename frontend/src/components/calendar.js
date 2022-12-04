import {React, useState} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

const MyCalendar = () => {
  const [events, setEvents] = useState([])

  const handleDateClick = (arg) => { // bind with an arrow function
    console.log(arg)
    let event = prompt("Create an event from "+arg.startStr+" to "+arg.endStr+"(excl)\nEnter the event :")
    console.log(event)
    setEvents([...events, {title: event, start: arg.startStr, end: arg.endStr}])
  }

  return(
    <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        select={(e) => handleDateClick(e)}
        events={events}
      />
  )
}

export default MyCalendar