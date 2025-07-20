import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/register.json";
import SocialLogin from "../../Shared/socialLogin/SocialLogin";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axiosSecurePublic from "../../Service/APIs/AxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { uploadImageToImgBB } from "../../utilities/uploadImageToImgBB";
import { Eye, EyeOff, Phone } from "lucide-react"; // or any icon lib
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      setLoading(true);
      const imageFile = data.photo?.[0];
      let imageUrl = "";
      if (imageFile) {
        // imageUrl = await uploadImageToImgBB(imageFile);
      }

      const result = await createUser(data.email, data.password);
      const firebaseUser = result.user;

      // ✅ Step 2: Firebase profile update (name + photoURL)
      await updateProfile(firebaseUser, {
        displayName: data.name,
        photoURL: imageUrl,
      });
      const notificationToken = localStorage.getItem("notificationToken");
      const saveUser = {
        firebaseUID: firebaseUser.uid,
        name: data.name,
        email: data.email || "",
        photoURL: imageUrl || "",
        isVerified: firebaseUser.emailVerified,
        role: "user",
        createdAt: new Date(Number(firebaseUser.metadata?.createdAt)),
        updatedAt: new Date(),
        lastLoginAt: new Date(Number(firebaseUser.metadata?.lastLoginAt)),
        fcmToken: notificationToken || null,
      };

      const res = await axiosSecurePublic.post("api/user/create", saveUser);

      if (res.status === 201 || res.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created!",
          timer: 2000,
          showConfirmButton: false,
        });

        reset();
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Registration Error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse items-center justify-center w-full min-h-screen p-6 bg-gray-100 lg:flex-row">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create an Account
          </h2>
          <p className="text-sm text-center text-gray-600">
            Sign up to get started
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

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
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
              className="absolute text-gray-600 right-3 top-10 hover:text-gray-900"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute text-gray-600 right-3 top-10 hover:text-gray-900"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("terms", { required: true })}
              className="mr-2"
            />
            <label className="text-sm text-gray-600">
              I agree to the{" "}
              <Link to="#" className="text-blue-500 hover:underline">
                Terms and Conditions
              </Link>
            </label>
            {errors.terms && (
              <p className="ml-2 text-sm text-red-500">You must agree</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {loading ? "Creating" : "Register"}
          </button>
        </form>

        <SocialLogin />

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>

      <div className="hidden w-full max-w-md sm:block lg:max-w-lg">
        <Lottie animationData={registerAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Register;
