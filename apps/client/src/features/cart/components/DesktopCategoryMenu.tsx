// apps/client/src/components/layout/DesktopCategoryMenu.tsx
import React from 'react';
import { Link } from '@tanstack/react-router';

interface DesktopCategoryMenuProps {
  isVisible: boolean; // Changed prop name for clarity
}

const DesktopCategoryMenu: React.FC<DesktopCategoryMenuProps> = ({ isVisible }) => {
  return (
    <div
        className={`absolute left-0 w-full bg-black shadow-lg transition-opacity duration-500
        ${
            isVisible
            ? "opacity-100 z-30" // Lower z-index than sidebars
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isVisible}
    >
        <div className="container mx-auto grid grid-cols-6 p-8 text-white"> {/* Added container for centering */}
            {/* Column 1 */}
            <div className="text-xl">
                <ul>
                    <li className="font-neue text-md relative mb-3 hover:text-gray-300">
                        <Link to="/">NEW COLLECTION</Link> {/* Adjust link */}
                    </li>
                </ul>
            </div>

            {/* Column 2 */}
            <div className="text-xl">
                <ul className="mb-2">
                    <li className="font-neue text-md font-normal relative mb-3 hover:text-gray-300">
                        ABRIGOS {/* Make this a link? */}
                    </li>
                    <li className="font-normal font-neue text-sm relative mb-1 hover:text-gray-300"> {/* Reduced size */}
                        <Link to="/">Sweaters</Link> {/* Adjust link */}
                    </li>
                    <li className="font-normal font-neue text-sm relative mb-1 hover:text-gray-300">
                        <Link to="/">Jackets</Link> {/* Adjust link */}
                    </li>
                    <li className="font-normal font-neue text-sm relative mb-1 hover:text-gray-300">
                         <Link to="/">Hoodies</Link> {/* Adjust link */}
                    </li>
                </ul>
            </div>

            {/* Column 3 */}
            <div className="text-xl">
                <ul>
                    <li className="font-normal font-neue text-md relative mb-3 hover:text-gray-300">
                         REMERAS {/* Make this a link? */}
                    </li>
                    <li className="font-normal font-neue text-sm relative mb-1 hover:text-gray-300"> {/* Reduced size */}
                         <Link to="/">Boxy</Link> {/* Adjust link */}
                    </li>
                    <li className="font-normal font-neue text-sm relative mb-1 hover:text-gray-300">
                         <Link to="/">Oversize</Link> {/* Adjust link */}
                    </li>
                     <li className="font-normal font-neue text-sm relative mb-1 hover:text-gray-300">
                         <Link to="/">Heavyweight</Link> {/* Adjust link */}
                    </li>
                </ul>
            </div>

            {/* Column 4 */}
            <div className="text-xl">
                <ul>
                    <li className="font-normal font-neue text-md relative mb-3 hover:text-gray-300">
                        <Link to="/">PANTS</Link> {/* Adjust link */}
                    </li>
                    <li className="font-normal font-neue text-md relative mb-3 hover:text-gray-300">
                         <Link to="/">SHORTS</Link> {/* Adjust link */}
                    </li>
                    <li className="font-normal font-neue text-md relative mb-3 hover:text-gray-300">
                         <Link to="/sale">SALE</Link> {/* Adjust link */}
                    </li>
                </ul>
            </div>

            {/* Column 5 */}
            <div className="text-xl">
                <ul>
                    <li className="font-normal font-neue text-md relative mb-3 hover:text-gray-300">
                        ACCESORIOS {/* Make this a link? */}
                    </li>
                    <li className="font-normal font-neue text-sm relative mb-1 hover:text-gray-300"> {/* Reduced size */}
                         <Link to="/">Beanies</Link> {/* Adjust link */}
                    </li>
                    {/* Removed placeholder   */}
                    <li className="font-normal font-neue text-md relative mb-3 mt-4 hover:text-gray-300"> {/* Added margin-top */}
                        <Link to="/products">VER TODO</Link> {/* Adjust link */}
                    </li>
                </ul>
            </div>

            {/* Column 6 */}
            <div className="text-xl">
                <ul>
                    <li className="font-normal font-neue text-md relative hover:text-gray-300">
                        <Link to="/">GIFT CARDS</Link> {/* Adjust link */}
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
};

export default DesktopCategoryMenu;