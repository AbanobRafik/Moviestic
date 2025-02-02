import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-around items-center py-4">
      <h1 className="text-4xl font-bold tracking-widest bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        Moviestic
      </h1>
      <ul className="flex gap-5">
        <li>
          <NavLink to="home" className="mx-3 text-white">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="about" className="mx-3 text-white">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="movies" className="mx-3 text-white">
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="tv" className="mx-3 text-white">
            TV
          </NavLink>
        </li>
      </ul>
      <div className="flex gap-3">
        <NavLink to="login" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
          Login
        </NavLink>
        <NavLink to="register" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;