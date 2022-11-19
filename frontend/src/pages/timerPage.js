import MainDrawer from "../components/mainDrawer"

const TimerPage=({setPage}) => {
    return(
        <div className="Timer"> 
            <MainDrawer setPage={setPage}></MainDrawer>
            Hi, I am TimerPage !
        </div>
    )

}

export default TimerPage