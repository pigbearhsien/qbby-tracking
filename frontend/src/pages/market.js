import MainDrawer from "../components/mainDrawer"

const MarketPage=({setPage}) => {
    return(
        <div className="Market"> 
            <MainDrawer setPage={setPage}></MainDrawer>
            Hi, I am MarketPage !
        </div>
    )

}

export default MarketPage