import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";
import SocialLogin from "../../Shared/socialLogin/SocialLogin";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axiosSecurePublic from "../../Service/APIs/AxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { Eye, EyeOff } from "lucide-react"; // Add these icons from lucide-react or any icon lib you use

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const { userLogin, setUserRole, user } = useAuth();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/"; // fallback to home if undefined

  // Toggle state for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await userLogin(data.email, data.password);

      const res = await axiosSecurePublic.get(
        `api/userByEmail?email=${user?.email}`
      );

      if (res.data) {
        const userData = res.data;
        setUserRole(userData);
        navigate(from, { replace: true });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "User not found in database.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen w-full p-6 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-gray-600">
            Sign in to continue
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 text-gray-600 hover:text-gray-900"
              tabIndex={-1} // so that button not tab focusable inside form submit
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {loading ? "login......" : " Sign In"}
          </button>
        </form>

        <SocialLogin />

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>

      <div className="w-full max-w-md hidden sm:block lg:max-w-lg">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Login;
