import MovingBar from "./movingbar";
import Navbar from "./navbar";

const Header: React.FC = () => {
  return (
    <div className="relative w-full bg-black">
      
      {/* Black Bar: moving bar */}
      <MovingBar />
      <Navbar/>

    </div>
  );
};

export default Header;
