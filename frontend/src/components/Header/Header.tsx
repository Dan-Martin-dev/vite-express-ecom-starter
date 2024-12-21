import MovingBar from "@/components/Header/MovingBar.tsx";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <div className="relative w-full">
      
      {/* Black Bar: moving bar */}
      <MovingBar />
      <Navbar/>

    </div>
  );
};

export default Header;
