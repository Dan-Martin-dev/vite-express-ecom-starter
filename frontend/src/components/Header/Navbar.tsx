import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "@/context/AuthContext";
import useLogout from "@/hooks/useLogout";

const Navbar = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isProductosHovered, setIsProductosHovered] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { handleLogout } = useLogout();

  useEffect(() => {
    setIsProductosHovered(false);
    setMenuVisible(false);
  }, [location]);


  return (
    <div className="bg-black">

      {/* Header: logos y botones */}
      <header className="bg-black text-white p-4 md:p-5 flex items-center justify-between">

        {/* Search Button */}
        <div className="hidden md:block flex-shrink-0 ">
          <button className="">
            <h1 className="text-white font-neue font-medium md:text-3xl md:ml-5">
              BUSCAR
            </h1>
          </button>
        </div>

        {/* Menu Button */}
        <div className="block md:hidden lg:hidden flex-shrink-0 ml-0 sm:ml-5">
          <button className="" onClick={() => setMenuVisible(true)}>
            <h1 className="text-lg xs:text-xl sm:text-3xl font-neue font-medium text-white">
              MENU
            </h1>
          </button>
        </div>

        {/* Sliding Menu for small screens */}
        <div
          className={`fixed top-0 left-0 bg-white shadow-lg transform ${
            menuVisible ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-500 ease-in-out z-10 w-full md:w-1/2 lg:w-1/3 h-full overflow-y-auto`}
          style={{
            width: "100vw", // Explicitly set width to 100% of the viewport
            willChange: "transform", // Improve rendering in Firefox
          }}
        >
          {/* Sliding Menu container */}
          <div className="p-3 w-full min-h-screen flex flex-col">
            {/* Close button */}
            <div className="flex justify-end items-center">
              <button
                className="text-2xl font-medium text-gray-600"
                onClick={() => setMenuVisible(false)}
              >
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>

            {/* Links */}
            <NavLink
              className="text-4xl font-neue font-medium text-black"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              className="text-4xl font-neue font-medium text-black"
              to="/"
            >
              NEW COLLECTION
            </NavLink>
            <NavLink
              className="text-4xl font-neue font-medium text-black"
              to="/"
            >
              SALE
            </NavLink>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex-grow flex justify-center ml-5 md:ml-16">
          <NavLink to="/" className="text-black font-bold">
            <h1 className="font-neue text-3xl xs:text-4xl sm:text-5xl text-white">
              CULTIST CLUB
            </h1>
          </NavLink>
        </div>

        {/* Right: Login and Cart Buttons with toggle */}
        <div className="bg-black flex-shrink-0 flex space-x-2 mr-2">  
          {/* Login button conditional */}
          {isAuthenticated ? (
            // Show Logout when authenticated
            <button onClick={handleLogout} className="hidden md:block">
              <div className="text-white font-neue font-medium md:text-3xl md:ml-6">
                LOGOUT
              </div>
            </button>
          ) : (
            // Show Login when not authenticated
            <button className="hidden md:block">
              <NavLink
                to="/login"
                className="text-white font-neue font-medium md:text-3xl  md:ml-10"
              >
                LOGIN
              </NavLink>
            </button>
          )}

          {/* Cart button */}
          <button className="relative text-black flex items-center justify-center">
            <h1
              className="text-lg xs:text-xl sm:text-3xl font-neue font-medium text-white"
              onClick={() => setCartVisible(true)}
            >
              CART
            </h1>

            <div className="absolute top-0 left-7 sm:left-10 -mt-2 text-black flex items-center justify-center w-4 h-4 bg-white text-xs rounded-full">
              <span className="text-xs font-bold">2</span>
            </div>
          </button>

          {/* Sidebar Cart for small screens */}
          <div
            className={`fixed top-0 right-0 bg-white shadow-lg transform ${
              cartVisible ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-500 ease-in-out z-10 w-full md:w-1/2 lg:w-1/3 h-full my-scrollable-container`}
          >
            <div className="p-3 w-full min-h-screen flex flex-col">
              <div className="flex justify-between items-center">
                <h2 className="text-center text-sm font-normal text-gray-600 w-full">
                  Carrito de compras
                </h2>
                <button
                  className="text-2xl font-medium text-gray-600"
                  onClick={() => setCartVisible(false)}
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
              <hr className="w-full font-thin border-gray-500 mt-2" />
              {/* Conditional rendering for "No products" or Cart Items */}
              <div className="flex justify-center items-center flex-grow">
                <p className="text-gray-500 text-lg">There's no product</p>
              </div>
              ) : (
              <>
                {/* Products */}
                <div className="flex items-center space-x-4 mb-4 p-2">
                  {/* 		<img
											alt={item.title}
											className="object-cover rounded border border-gray-300"
											height={80}
											src={item.images[0]}
											width={80}
										/> */}
                  <div className="flex-1 text-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-normal"></h3>
                      <button className="text-xs font-normal text-gray-600 underline">
                        Borrar
                      </button>
                    </div>
                    <p className="text-sm text-gray-500"></p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-bold text-gray-700"></p>
                      <div className="flex items-center space-x-2">
                        <div className="flex border border-gray-300 rounded">
                          <button className="text-gray-500 border-r border-gray-300 px-3 py-1">
                            -
                          </button>
                          <span className="text-gray-500 px-3 py-1"></span>
                          <button className="text-gray-500 border-l border-gray-300 px-3 py-1">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mt-4">
                  <p className="text-gray-600">
                    Subtotal (sin envío):{" "}
                    <span className="font-bold text-gray-800">
                      {/* ${subtotal.toFixed(2)} */}
                    </span>
                  </p>
                </div>

                {/* Delivery Information */}
                <div className="mt-4">
                  <p className="text-gray-600">
                    Entregas para el CP:{" "}
                    <span className="text-blue-500 cursor-pointer">
                      Cambiar CP
                    </span>
                  </p>
                  <p className="text-blue-500 cursor-pointer">
                    No sé mi código postal
                  </p>
                </div>

                {/* Shipping Methods */}
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700">
                    Medios de envío
                  </h4>
                  <button className="mt-2 text-blue-500">Calcular</button>
                  <div className="mt-2 text-gray-600">
                    <p>Nuestro local</p>
                    <p>Punto de retiro Recoleta - Marcelo T de Alvear 1261</p>
                    <p>Horario y Día de entrega a coordinar</p>
                    <p className="font-bold text-gray-800">Gratis</p>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-6 flex justify-between items-center">
                  <p className="text-lg font-normal text-gray-600">Total:</p>
                  <div className="text-right">
                    <p className="text-lg font-normal text-gray-600"></p>
                    <p className="text-sm text-gray-600">
                      O hasta 6 x $24.833,33 sin interés
                    </p>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <button className="w-full bg-black text-sm text-white py-3 mt-4">
                  Iniciar compra
                </button>

                <button className="w-full text-gray-700 mt-4">
                  Ver más productos
                </button>
              </>
            </div>
          </div>
        </div>
      </header>

      {/* Categorias: hay eventos */}
      <div className="hidden md:flex justify-center items-center space-x-8 pt-2 py-6 bg-black">
        <NavLink className="text-white font-neue font-normal text-xl" to="/">
          INICIO
        </NavLink>
        <NavLink
          className="text-white font-neue font-normal text-xl"
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
          <a className="text-white font-normal font-neue text-xl  mt-[-1px]">
            PRODUCTOS
          </a>

          {/* Panel */}
          <div
            className={`absolute left-0 w-full bg-black shadow-lg transition-opacity duration-500 
              ${
                isProductosHovered
                  ? "opacity-100 z-50"
                  : "opacity-0 pointer-events-none"
              }`}
          >
            <div className="grid grid-cols-6 p-8">
              {/* Column 1 */}
              <div className="text-xl">
                <ul>
                  <li className="text-white font-normal font-neue text-md  relative mb-3">
                    <NavLink to="/collection">NEW COLLECTION</NavLink>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="text-xl">
                <ul className="mb-2">
                  <li className="text-white font-neue text-md  font-normal relative mb-3">
                    ABRIGOS
                  </li>
                  <li className="text-white font-normal font-neue text-md  relative mb-1">
                    Sweaters
                  </li>
                  <li className="text-white font-normal font-neue text-md relative mb-1">
                    Jackets
                  </li>
                  <li className="text-white font-normal font-neue text-md relative mb-1">
                    Hoodies
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="text-xl">
                <ul>
                  <li className="text-white font-normal font-neue text-md  relative mb-3">
                    REMERAS
                  </li>
                  <li className="text-white font-normal font-neue text-md relative mb-3">
                    Boxy
                  </li>
                  <li className="text-white font-normal font-neue text-md  relative mb-3">
                    Oversize
                  </li>
                  <li className="text-white font-normal font-neue text-md  relative mb-3">
                    Heavyweight
                  </li>
                </ul>
              </div>

              {/* Column 4 */}
              <div className="text-xl">
                <ul>
                  <li className="text-white font-normal font-neue text-md  relative mb-3">
                    PANTS
                  </li>
                  <li className="text-white font-normal font-neue text-md  relative mb-3">
                    SHORTS
                  </li>
                  <li className="text-white font-normal font-neue text-md  relative mb-3">
                    SALE
                  </li>
                </ul>
              </div>

              {/* Column 5 */}
              <div className="text-xl">
                <ul>
                  <li className="text-white font-normal font-neue text-md  relative mb-3">
                    ACCESORIOS
                  </li>
                  <li className="text-white font-normal font-neue text-md relative mb-3">
                    Beanies
                  </li>
                  <li className="text-white font-normal font-neue text-md  relative mb-3">
                    &nbsp;
                  </li>
                  <li className="text-white font-normal font-neue text-md  relative mb-3">
                    VER TODO
                  </li>
                </ul>
              </div>

              {/* Column 6 */}
              <div className="text-xl">
                <ul>
                  <li className="text-white font-normal font-neue text-md  relative">
                    GIFT CARDS
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <NavLink
          className="text-white font-neue font-normal text-xl"
          to="/sale"
        >
          SALE
        </NavLink>
      </div>

    </div>
  );
};

export default Navbar;
