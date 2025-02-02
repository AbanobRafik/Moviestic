import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-dark-slate">
      <form className="bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold tracking-widest bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center mb-4">
          Moviestic
        </h1>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login to Moviestic
        </h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button
          className="w-full py-3 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          type="submit"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-300">Don't have an account? </span>
          <NavLink to="/register" className="text-teal-500 hover:underline">
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
