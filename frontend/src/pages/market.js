import MainDrawer from "../components/mainDrawer";
import ThemePicker from "../components/themePicker";
const MarketPage = ({ setPage }) => {
  return (
    <div className="Market">
      <MainDrawer setPage={setPage}></MainDrawer>
      <ThemePicker></ThemePicker>
    </div>
  );
};
export default MarketPage;
