import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-dark-slate">
      <form className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold tracking-widest bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center mb-2">
          Moviestic
        </h1>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Register to Moviestic
        </h2>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-300 mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="text"
              id="first_name"
              name="first_name"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-300 mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="text"
              id="last_name"
              name="last_name"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-300 mb-2" htmlFor="age">
            Age
          </label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="number"
            id="age"
            name="age"
            required
          />
        </div>
        <div className="mb-3">
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
        <div className="mb-5">
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
          Register
        </button>
        <div className="mt-2 text-center">
          <span className="text-gray-300">Already have an account? </span>
          <NavLink to="/login" className="text-teal-500 hover:underline">
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;