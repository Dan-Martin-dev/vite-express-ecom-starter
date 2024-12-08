import { useEffect, useState } from "react";
// Adjust path based on actual structure
import MovingBar from "./MovingBar";
import logo from "/home/vare/project/microservices_1/ecommerce_1/Barnes-Clone-Frontend/public/logo.webp"; // Adjust this path according to your structure
import { NavLink, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  /* 	const { toggleCarrito } = useCart();
	const { isAuthenticated, login, logout } = useAuth();

   */
  const [isProductosHovered, setIsProductosHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsProductosHovered(false);
  }, [location]);

   
  // Close the panel whenever the route changes

  return (
    <div className="relative w-full">
      {/* Black Bar: moving bar */}
      <MovingBar />

      {/* Header: logos y botones */}
      <header className="bg-white text-white p-4 md:p-6 flex items-center justify-between">
        {/* Left: Buscar Button */}
        <div className="hidden md:block flex-shrink-0 ">
          <button className="">
            <h1 className="text-gray-500 font-normal text-md md:text-lg  md:ml-10">
              Buscar
            </h1>
          </button>
        </div>

        {/* Left: Smart Search Button */}
        <div className="block md:hidden lg:hidden flex-shrink-0 sm:ml-10 ml-6">
          <button className="">
            <h1 className="text-gray-500 font-normal text-md md:text-lg">
              Menu
            </h1>
          </button>
        </div>

        {/* Center: Logo */}
        <div className="flex-grow flex justify-center ml-10 md:ml-[105px]">
          <NavLink to="/" className="text-xl text-black font-bold">
            <img alt="logo" src={logo} width={180} height={100} />
          </NavLink>
        </div>

        {/* Right: Login and Cart Buttons with toggle */}
        <div className="flex-shrink-0 flex space-x-2 mr-2 sm:mr-10">
          {/* Login/logoff conditional */}
          <button className="hidden md:block">
            <div>
              <NavLink
                to="/login"
                className="text-gray-500 font-normal text-md md:text-lg"
              >
                Login
              </NavLink>
            </div>
          </button>

          {/* carrito button */}
          <button className="relative text-black py-2 px-4 flex items-center justify-center">
            <h1
              /* onClick={toggleCarrito} */
              className="text-gray-500 font-normal text-md md:text-lg"
            >
              Carrito
            </h1>
            <div className="absolute top-0 right-2 -mt-1 -mr-1 flex items-center justify-center w-4 h-4 bg-gray-500 text-white text-xs rounded-full">
              <span className="text-xxs font-light">2</span>
            </div>
          </button>
        </div>
      </header>

      {/* Categorias: hay eventos */}
      <div className="hidden md:flex justify-center items-center space-x-8 pt-2 py-6 bg-white">
        <NavLink className="text-gray-500 font-normal text-sm" to="/">
          INICIO
        </NavLink>
        <NavLink
          className="text-gray-500 font-normal text-sm"
          to="/collection"
        >
          NEW COLLECTION
        </NavLink>

        {/* Panel desplegable */}
        <div
          onMouseOut={() => {
            setIsProductosHovered(false);
          }}
          onMouseOver={() => {
            setIsProductosHovered(true);
          }}
        >
          {/* Products button */}
          <a className="text-gray-500 font-normal text-sm mt-[-1px]">
            PRODUCTOS
          </a>

          {/* Panel */}
          <div
            className={`absolute left-0 w-full bg-white shadow-lg transition-opacity duration-500 
              ${
                isProductosHovered
                  ? "opacity-100 z-50"
                  : "opacity-0 pointer-events-none"
              }`}
          >
            <div className="grid grid-cols-6 p-8">
              {/* Column 1 */}
              <div>
                <ul>
                  <li className="text-gray-500 font-normal text-sm relative mb-3">
                    <NavLink to="/collection">NEW COLLECTION</NavLink>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <ul className="mb-2">
                  <li className="text-gray-500 font-normal text-sm relative mb-3">
                    ABRIGOS
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    Sweaters
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    Jackets
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    Hoodies
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <ul>
                  <li className="text-gray-500 font-normal text-sm relative mb-3">
                    REMERAS
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    Boxy
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    Oversize
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    Heavyweight
                  </li>
                </ul>
              </div>

              {/* Column 4 */}
              <div>
                <ul>
                  <li className="text-gray-500 font-normal text-sm relative mb-3">
                    PANTS
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    SHORTS
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    SALE
                  </li>
                </ul>
              </div>

              {/* Column 5 */}
              <div>
                <ul>
                  <li className="text-gray-500 font-normal text-sm relative mb-3">
                    ACCESORIOS
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    Beanies
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    &nbsp;
                  </li>
                  <li className="text-gray-500 font-normal text-sm relative mb-1">
                    VER TODO
                  </li>
                </ul>
              </div>

              {/* Column 6 */}
              <div>
                <ul>
                  <li className="text-gray-500 font-normal text-sm relative">
                    GIFT CARDS
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <a className="text-gray-500 font-normal text-sm" href="#sale">
          SALE
        </a>
      </div>

      {/* Sliding cart */}
      {/* <SmartCart /> */}
    </div>
  );
};

export default Header;

{
  /* Login/logoff conditional
					<button className="hidden md:block">
						<div>
							{isAuthenticated ? (
								<a
									href="/"
									onClick={logout}
									className="text-gray-500 font-normal text-md md:text-lg"
								>
									Logout
								</a>
							) : (
								<a
									href="/login"
									className="text-gray-500 font-normal text-md md:text-lg"
									onClick={login}
								>
									Login
								</a>
							)}
						</div> 
					</button> */
}
