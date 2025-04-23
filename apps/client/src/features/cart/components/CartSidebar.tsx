// apps/client/src/components/layout/CartSidebar.tsx
import React, { useContext } from 'react';
// TODO: Import ShopContext and necessary types/hooks when ready
// import { useShop } from '@/context/ShopContext';

interface CartSidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isVisible, onClose }) => {
  // TODO: Replace placeholders with actual cart data from ShopContext
  // const { cartItems, removeFromCart, updateQuantity, subtotal, total } = useShop();
  const cartItems: any[] = []; // Placeholder
  const subtotal = 0; // Placeholder
  const total = 0; // Placeholder

  return (
    <div
      className={`fixed top-0 right-0 bg-white shadow-lg transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-500 ease-in-out z-40 w-full md:w-1/2 lg:w-1/3 h-full my-scrollable-container overflow-y-auto`} // Added overflow-y-auto
      aria-hidden={!isVisible}
    >
      <div className="p-3 w-full min-h-screen flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-center text-sm font-normal text-gray-600 w-full">
            Carrito de compras
          </h2>
          <button
            className="text-2xl font-medium text-gray-600 p-2" // Added padding
            onClick={onClose}
            aria-label="Close cart"
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
        <hr className="w-full font-thin border-gray-500 mt-2 mb-4" /> {/* Added margin-bottom */}

        {/* Conditional rendering for "No products" or Cart Items */}
        <div className="flex-grow flex flex-col"> {/* Changed to flex-col */}
          {cartItems.length === 0 ? (
            <div className="flex justify-center items-center flex-grow">
                <p className="text-gray-500 text-lg">There's no product</p>
            </div>
          ) : (
            <>
              {/* Products List - Map over actual cartItems here */}
              <div className="flex-grow overflow-y-auto pr-2"> {/* Scrollable area for items */}
                {/* --- Placeholder Item --- */}
                <div className="flex items-center space-x-4 mb-4 p-2 border-b border-gray-200"> {/* Added border */}
                  {/* Placeholder Image */}
                   <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Image</div>
                  {/* <img
                      alt={item.title} // From item
                      className="object-cover rounded border border-gray-300"
                      height={80}
                      src={item.images[0]} // From item
                      width={80}
                  /> */}
                  <div className="flex-1 text-gray-600">
                    <div className="flex justify-between items-center mb-2">
                       {/* <h3 className="text-sm font-normal">{item.title}</h3> From item */}
                       <h3 className="text-sm font-normal">Placeholder Product</h3>
                      <button className="text-xs font-normal text-gray-600 underline">
                        {/* onClick={() => removeFromCart(item.id)} */}
                        Borrar
                      </button>
                    </div>
                    {/* <p className="text-sm text-gray-500">{item.variantInfo}</p> Optional variant info */}
                    <div className="flex justify-between items-center mt-2">
                       {/* <p className="text-sm font-bold text-gray-700">${item.price.toFixed(2)}</p> From item */}
                       <p className="text-sm font-bold text-gray-700">$99.99</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex border border-gray-300 rounded">
                          <button className="text-gray-500 border-r border-gray-300 px-3 py-1">
                            {/* onClick={() => updateQuantity(item.id, item.quantity - 1)} */}
                            -
                          </button>
                           {/* <span className="text-gray-500 px-3 py-1">{item.quantity}</span> From item */}
                           <span className="text-gray-500 px-3 py-1">1</span>
                          <button className="text-gray-500 border-l border-gray-300 px-3 py-1">
                           {/* onClick={() => updateQuantity(item.id, item.quantity + 1)} */}
                           +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --- End Placeholder Item --- */}
                {/* TODO: Map over real items here */}
              </div>

              {/* Cart Footer - Pushes to bottom */}
              <div className="mt-auto pt-4 border-t border-gray-200"> {/* Added padding-top and border */}
                  {/* Subtotal */}
                  <div className="mt-4">
                    <p className="text-gray-600 flex justify-between">
                      <span>Subtotal (sin envío):</span>
                      <span className="font-bold text-gray-800">
                         ${subtotal.toFixed(2)} {/* From context */}
                      </span>
                    </p>
                  </div>

                  {/* Delivery Information */}
                  {/* <div className="mt-4"> ... Your delivery info ... </div> */}
                  {/* Shipping Methods */}
                  {/* <div className="mt-4"> ... Your shipping methods ... </div> */}

                  {/* Total */}
                  {/* <div className="mt-6 flex justify-between items-center"> ... Your total info ... </div> */}

                  {/* Checkout Buttons */}
                  <button className="w-full bg-black text-sm text-white py-3 mt-4 hover:bg-gray-800">
                     {/* onClick={handleCheckout} or Link to checkout page */}
                    Iniciar compra
                  </button>

                  <button className="w-full text-gray-700 mt-4 hover:underline" onClick={onClose}>
                    Ver más productos
                  </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;