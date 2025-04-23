// apps/client/src/components/layout/MobileMenu.tsx
import React from 'react';
import { Link } from '@tanstack/react-router';

interface MobileMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isVisible, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 bg-white shadow-lg transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-500 ease-in-out z-40 w-full md:w-1/2 lg:w-1/3 h-full overflow-y-auto`}
      style={{
        width: "100vw", // Explicitly set width to 100% of the viewport
        willChange: "transform", // Improve rendering in Firefox
      }}
      aria-hidden={!isVisible} // Accessibility improvement
    >
      {/* Sliding Menu container */}
      <div className="p-3 w-full min-h-screen flex flex-col">
        {/* Close button */}
        <div className="flex justify-end items-center mb-6"> {/* Added margin-bottom */}
          <button
            className="text-2xl font-medium text-gray-600 p-2" // Added padding for easier clicking
            onClick={onClose}
            aria-label="Close menu" // Accessibility improvement
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
        {/* Wrap links for better layout and add onClick to close menu on navigation */}
        <nav className="flex flex-col space-y-4">
           <Link
              className="text-4xl font-neue font-medium text-black hover:text-gray-700"
              to="/"
              onClick={onClose} // Close menu when link is clicked
            >
              HOME
            </Link>
            <Link
              className="text-4xl font-neue font-medium text-black hover:text-gray-700"
              to="/" // Should link to collection page
              onClick={onClose}
            >
              NEW COLLECTION
            </Link>
            <Link
              className="text-4xl font-neue font-medium text-black hover:text-gray-700"
              to="/sale" // Should link to sale page
              onClick={onClose}
            >
              SALE
            </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;