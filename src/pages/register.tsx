import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "../components/Ui/ErrorMsg";
import Button from "../components/Ui/Button";
import { useState } from "react";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import axios from "axios";

const RegisterSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters long")
    .nonempty("First name is required"),
  last_name: z
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .nonempty("Last name is required"),
  age: z
    .number()
    .min(18, "You must be at least 18 years old")
    .max(100, "Age must be less than 100"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .nonempty("Password is required"),
});

type RegisterFormData = z.infer<typeof RegisterSchema>;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/signup", data);
      if (status === 200) {
        toast.success(
          "Account created successfully! Please login to continue.",
          {
            duration: 2000,
            position: "top-center",
            style: {
              backgroundColor: "#333",
              color: "#fff",
            },
          }
        );
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed!");
      } else {
        toast.error("An unknown error occurred!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-dark-slate py-6">
      <form
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-bold tracking-widest bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center mb-4">
          Moviestic
        </h1>
        <h2 className="text-2xl font-bold text-white mb-3 text-center">
          Register to Moviestic
        </h2>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-300 mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="text"
              id="first_name"
              {...register("first_name")}
            />
            {errors.first_name && (
              <ErrorMsg>{errors.first_name.message}</ErrorMsg>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-gray-300 mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              type="text"
              id="last_name"
              {...register("last_name")}
            />
            {errors.last_name && (
              <ErrorMsg>{errors.last_name.message}</ErrorMsg>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-300 mb-2" htmlFor="age">
            Age
          </label>
          <input
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && <ErrorMsg>{errors.age.message}</ErrorMsg>}
        </div>
        <div className="mb-3">
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            type="email"
            id="email"
            {...register("email")}
          />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </div>
        <div className="mb-5">
          <label className="block text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
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
          Register
        </Button>
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
