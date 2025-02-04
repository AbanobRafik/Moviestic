import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import userData from "./useData";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Logout = () => {
    localStorage.removeItem("loggedIn");
    window.location.replace("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="relative flex flex-wrap justify-between items-center py-4 px-5 bg-gray-800">
      <h1 className="text-2xl md:text-4xl font-bold tracking-widest bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        Moviestic
      </h1>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`
          ${
            isMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 md:max-h-screen md:opacity-100"
          } 
          overflow-hidden transition-all duration-300 ease-in-out
          w-full md:flex md:items-center md:w-auto md:flex-grow md:justify-between
        `}
      >
        <ul className="flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0 justify-center md:mx-auto">
          <li>
            <NavLink
              to="home"
              className="block mx-3 text-white hover:text-gray-300 text-center"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="about"
              className="block mx-3 text-white hover:text-gray-300 text-center"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="movies"
              className="block mx-3 text-white hover:text-gray-300 text-center"
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tv"
              className="block mx-3 text-white hover:text-gray-300 text-center"
            >
              TV
            </NavLink>
          </li>
        </ul>

        <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
          {userData ? (
            <button
              onClick={Logout}
              className="w-full md:w-auto px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col md:flex-row gap-2">
              <NavLink
                to="login"
                className="w-full md:w-auto px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-center"
              >
                Login
              </NavLink>
              <NavLink
                to="register"
                className="w-full md:w-auto px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-center"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
