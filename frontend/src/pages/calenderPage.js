import MyCalendar from "../components/calendar"
import MainDrawer from "../components/mainDrawer"

const CalendarPage = ({setPage})=>{
    return(
        <div>
            <MainDrawer setPage={setPage}></MainDrawer>
            <MyCalendar></MyCalendar>
        </div>

    )


}

export default CalendarPage