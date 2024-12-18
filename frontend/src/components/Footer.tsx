import logo from "@/assets/frontend_assets/logo.webp";

const Footer = () => {
  return (
    <footer className=" text-black p-6">

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        
        {/* Left Side: Links */}
        <div className="md:w-1/2 flex flex-col space-y-4">
          <a
            href="#"
            className="relative pt-6 text-5xl font-light hover:text-gray-400 before:content-[''] before:absolute before:-bottom-3 before:left-0 before:w-[200%] before:h-[1px] before:bg-black"
            >
            CAMBIOS
          </a>
          <a
            href="#"
            className="relative pt-6 text-5xl font-light hover:text-gray-400 before:content-[''] before:absolute before:-bottom-3 before:left-0 before:w-[200%] before:h-[1px] before:bg-black"
            >
            CUIDADOS
          </a>
          <a
            href="#"
            className="relative pt-6 text-5xl font-light hover:text-gray-400 before:content-[''] before:absolute before:-bottom-3 before:left-0 before:w-[200%] before:h-[1px] before:bg-black"
            >
            VISITANOS
          </a>
          <a
            href="#"
            className="relative pt-6 text-5xl font-light hover:text-gray-400 before:content-[''] before:absolute before:-bottom-3 before:left-0 before:w-[200%] before:h-[1px] before:bg-black"
            >
            MAYORISTA
          </a>
        </div>

        {/* Right Side: Social Media, Contact Info */}
        <div className="md:w-1/2 flex flex-col space-y-4 items-start">

          {/* Logo */}
          <div className="flex justify-center items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className=" h-36 w-5/6 object-contain"
            />  
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-gray-300 transition"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition"
              aria-label="Twitter"
            >
              Twitter
            </a>
          </div>

          {/* Contact Info */}
          <div>
            <p className="hover:text-gray-300 transition">📞 WhatsApp: +123456789</p>
            <p className="hover:text-gray-300 transition">📧 Email: info@example.com</p>
            <p className="hover:text-gray-300 transition">
              📍 Address: 123 Main St, City, Country
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Your Brand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
