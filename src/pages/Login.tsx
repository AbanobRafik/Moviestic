import { NavLink } from "react-router-dom";
import Button from "../components/Ui/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "../components/Ui/ErrorMsg";

const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
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
          className=" bg-teal-600 disabled:bg-gray-600 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          type="submit"
        >
          Login
        </Button>
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
