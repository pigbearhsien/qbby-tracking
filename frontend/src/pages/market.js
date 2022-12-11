<<<<<<< HEAD
import MainDrawer from "../components/mainDrawer";
import ThemePicker from "../components/themePicker";

const MarketPage = ({ setPage, setStyle }) => {
  return (
    <div className="Market">
      <MainDrawer setPage={setPage}></MainDrawer>
      <ThemePicker></ThemePicker>
    </div>
  );
};
=======
import MainDrawer from "../components/mainDrawer"
import ThemePicker from "../components/themePicker"
const MarketPage=({setPage}) => {
    return(
        <div className="Market"> 
            <MainDrawer setPage={setPage}></MainDrawer>
            <ThemePicker></ThemePicker>
        </div>
    )
>>>>>>> b6dd41777209dae9636e41626fd3fae2af03236e

export default MarketPage;
