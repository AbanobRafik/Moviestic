import { NavLink } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "../components/Ui/ErrorMsg";
import Button from "../components/Ui/Button";
import { useState } from "react";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";

// Zod validation schema
const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters") // Updated length
    .nonempty("Password is required"),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  // Submit function for login form
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Send login data to the backend API
      const { status, data: userData } = await axiosInstance.post(
        "/signin", // Ensure the API endpoint for signin is correct
        data
      );

      // Check for successful response
      if (status === 200) {
        toast.success("Login successful!", {
          duration: 2000,
          position: "top-center",
          style: {
            backgroundColor: "#333",
            color: "#fff",
          },
        });

        // Save user data to localStorage (e.g., token, user info)
        localStorage.setItem("loggedIn", JSON.stringify(userData));

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          location.replace("/home");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      // Handle API errors (incorrect email/password or other errors)
      toast.error("Incorrect email or password", {
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "#333",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-dark-slate">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-10 rounded-lg shadow-lg w-full max-w-md"
      >
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
            {...register("email")}
          />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="password"
            id="password"
            {...register("password")}
          />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </div>
        <Button
          className="w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          type="submit"
          isLoading={isLoading}
        >
          Login
        </Button>
        <div className="mt-4 text-center">
          <span className="text-gray-300">Don't have an account? </span>
          <NavLink to="/register" className="text-teal-500 hover:underline">
            Register
          </NavLink>
        </div>
        <div className="mt-6 p-4 bg-gray-800 rounded text-white">
          <h3 className="text-lg font-bold mb-2">Demo Account</h3>
          <p>Email: <span className="font-mono">user1@example.com</span></p>
          <p>Password: <span className="font-mono">user@123</span></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
