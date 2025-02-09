import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <NavLink
        to="/home"
        className="px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition duration-300"
      >
        Go Home
      </NavLink>
    </div>
  );
};

export default ErrorPage;
