import { useEffect, useState } from "react";
import MovingBar from "@/components/MovingBar";
import logo from "/home/vare/project/microservices_1/ecommerce_1/Barnes-Clone-Frontend/public/logo.webp"; // Adjust this path according to your structure
import { NavLink, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const [isProductosHovered, setIsProductosHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsProductosHovered(false);
    setMenuVisible(false);
  }, [location]);

  return (
    <div className="relative w-full">
      {/* Black Bar: moving bar */}
      <MovingBar />

      {/* Header: logos y botones */}
      <header className="bg-white text-white p-4 md:p-6 flex items-center justify-between">
        {/* Search Button */}
        <div className="hidden md:block flex-shrink-0 ">
          <button className="">
            <h1 className="text-gray-500 font-normal text-md md:text-lg  md:ml-10">
              Buscar
            </h1>
          </button>
        </div>

        {/* Menu Button */}
        <div className="block md:hidden lg:hidden flex-shrink-0 sm:ml-10 ml-6">
          <button className="" onClick={() => setMenuVisible(true)}>
            <h1 className="text-gray-500 font-normal text-md md:text-lg">
              Menu
            </h1>
          </button>
        </div>

        {/* Sliding Menu for small screens */}
        <div
          className={`fixed top-0 left-0 bg-white shadow-lg transform ${
            menuVisible ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-500 ease-in-out z-10 w-full md:w-1/2 lg:w-1/3 h-full overflow-y-auto`}
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

            {/* Links */}
            <NavLink className="text-4xl text-red-600" to="/">
              Home
            </NavLink>
            <NavLink className="text-4xl text-red-600" to="/collection">
              NEW COLLECTION
            </NavLink>
            <NavLink className="text-4xl text-red-600" to="/sale">
              SALE
            </NavLink>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex-grow flex justify-center ml-10 md:ml-[105px]">
          <NavLink to="/" className="text-xl text-black font-bold">
            <img alt="logo" src={logo} width={180} height={100} />
          </NavLink>
        </div>

        {/* Right: Login and Cart Buttons with toggle */}
        <div className="flex-shrink-0 flex space-x-2 mr-2 sm:mr-10">
          {/* Login button conditional */}
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

          {/* Cart button */}
          <button className="relative text-black py-2 px-4 flex items-center justify-center">
            <h1
              onClick={() => setVisible(true)}
              className="text-gray-500 font-normal text-md md:text-lg"
            >
              Carrito
            </h1>

            <div className="absolute top-0 right-2 -mt-1 -mr-1 flex items-center justify-center w-4 h-4 bg-gray-500 text-white text-xs rounded-full">
              <span className="text-xxs font-light">2</span>
            </div>
          </button>

          {/* Sidebar Cart for small screens */}
          <div
            className={`fixed top-0 right-0 bg-white shadow-lg transform ${
              visible ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-500 ease-in-out z-10 w-full md:w-1/2 lg:w-1/3 h-full overflow-y-auto`}
          >
            <div className="p-3 w-full min-h-screen flex flex-col">
              <div className="flex justify-between items-center">
                <h2 className="text-center text-sm font-normal text-gray-600 w-full">
                  Carrito de compras
                </h2>
                <button
                  className="text-2xl font-medium text-gray-600"
                  onClick={() => setVisible(false)}
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
      <div className="hidden md:flex justify-center items-center space-x-8 pt-2 py-6 bg-white">
        <NavLink className="text-gray-500 font-normal text-sm" to="/">
          INICIO
        </NavLink>
        <NavLink className="text-gray-500 font-normal text-sm" to="/collection">
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

        <NavLink className="text-gray-500 font-normal text-sm" to="/sale">
          SALE
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
