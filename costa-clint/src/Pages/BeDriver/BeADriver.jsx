import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import axiosSecurePublic from "../../Service/APIs/AxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { uploadImageToImgBB } from "../../utilities/uploadImageToImgBB";

const BeADriver = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecurePublic.post(
        "api/driver/create",
        formData
      );
      return response.data;
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Thank you. We will review your application shortly.",
        confirmButtonColor: "#22c55e",
      });
      reset();
    },
    onError: (error) => {
      console.error("Submission failed:", error);
    },
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.imageUrl?.[0];
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImageToImgBB(imageFile);
      }

      const newDriver = {
        ...data,
        imageUrl,
        createdAt: new Date(),
      };

      mutation.mutate(newDriver);
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl p-4 mx-auto my-32 space-y-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-semibold">Driver Application Form</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label>Full Name</label>
          <input
            {...register("fullName", { required: true })}
            placeholder="Full Name"
            className="input"
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            {...register("dateOfBirth", { required: true })}
            type="date"
            className="input"
          />
        </div>

        <div>
          <label>Nationality</label>
          <input
            {...register("nationality", { required: true })}
            placeholder="Nationality"
            className="input"
          />
        </div>

        <div>
          <label>Gender</label>
          <select {...register("gender", { required: true })} className="input">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Phone Number</label>
          <input
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            className="input"
          />
        </div>

        <div>
          <label className="block">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            value={user?.email}
            className="input"
          />
        </div>

        <div>
          <label>Address</label>
          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="input"
          />
        </div>

        <div>
          <label>Driver’s License Number</label>
          <input
            {...register("licenseNumber", { required: true })}
            placeholder="License Number"
            className="input"
          />
        </div>

        <div>
          <label>License Expiry</label>
          <input
            {...register("licenseExpiry", { required: true })}
            type="date"
            className="input"
          />
        </div>

        <div>
          <label>Passport or ID Number</label>
          <input
            {...register("idNumber", { required: true })}
            placeholder="ID Number"
            className="input"
          />
        </div>

        <div>
          <label>Vehicle Type</label>
          <input
            {...register("vehicleType", { required: true })}
            placeholder="e.g. SUV"
            className="input"
          />
        </div>
        <div>
          <label className="block">Title</label>
          <input
            {...register("title", { required: true })}
            placeholder="Title"
            className="input"
          />
        </div>

        <div>
          <label>Subtitle</label>
          <input
            {...register("subtitle", { required: true })}
            placeholder="Subtitle"
            className="input"
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="file"
            accept="image/*"
            {...register("imageUrl", { required: true })}
            placeholder="Upload your image "
            className="input"
          />
        </div>

        <div>
          <label>base Price</label>
          <input
            {...register("price", { required: true })}
            type="number"
            placeholder="Price"
            className="input"
          />
        </div>

        <div>
          <label>Vehicle Make & Model</label>
          <input
            {...register("vehicleModel", { required: true })}
            placeholder="Make & Model"
            className="input"
          />
        </div>

        <div>
          <label>Vehicle Year</label>
          <input
            {...register("vehicleYear", { required: true })}
            placeholder="Year"
            className="input"
          />
        </div>

        <div>
          <label>License Plate</label>
          <input
            {...register("licensePlate", { required: true })}
            placeholder="License Plate"
            className="input"
          />
        </div>

        <div>
          <label>Vehicle Color</label>
          <input
            {...register("vehicleColor", { required: true })}
            placeholder="Color"
            className="input"
          />
        </div>

        <div>
          <label>Seating Capacity</label>
          <input
            {...register("seatCapacity", { required: true })}
            type="number"
            placeholder="Seats"
            className="input"
          />
        </div>

        <div>
          <label>Luggage Capacity</label>
          <input
            {...register("luggageCapacity", { required: true })}
            type="number"
            placeholder="Luggage"
            className="input"
          />
        </div>

        <div>
          <label>Preferred Regions</label>
          <input
            {...register("region", { required: true })}
            placeholder="Region"
            className="input"
          />
        </div>

        <div>
          <label>Available Hours</label>
          <input
            {...register("availableHours", { required: true })}
            placeholder="e.g. 6AM - 10PM"
            className="input"
          />
        </div>

        <div>
          <label>Willing to Accept Night Rides?</label>
          <select
            {...register("nightRides", { required: true })}
            className="input"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label>Bank Name</label>
          <input
            {...register("bankName", { required: true })}
            placeholder="Bank Name"
            className="input"
          />
        </div>

        <div>
          <label>Account Holder Name</label>
          <input
            {...register("accountHolder", { required: true })}
            placeholder="Account Holder"
            className="input"
          />
        </div>

        <div>
          <label>Account Number / IBAN</label>
          <input
            {...register("accountNumber", { required: true })}
            placeholder="Account Number"
            className="input"
          />
        </div>

        <div>
          <label>Preferred Payout Method</label>
          <select
            {...register("payoutMethod", { required: true })}
            className="z-10 p-2 input"
          >
            <option value="">Select</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          {...register("agreeTerms", { required: true })}
        />
        I agree to the Terms & Conditions
      </label>
      {errors.agreeTerms && (
        <p className="text-sm text-red-500">
          You must agree before submitting.
        </p>
      )}

    <button
  type="submit"
  disabled={mutation.isLoading}
  className={`px-4 py-2 text-white rounded ${
    mutation.isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
  }`}
>
  {mutation.isLoading ? "Submitting..." : "Submit Application"}
</button>
    </form>
  );
};

export default BeADriver;




// extra code for enhace ui 

// import { useMutation, useQuery } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axiosSecurePublic from "../../Service/APIs/AxiosPublic";
// import Swal from "sweetalert2";
// import useAuth from "../../Hooks/useAuth";
// import { uploadImageToImgBB } from "../../utilities/uploadImageToImgBB";
// import { useNavigate } from "react-router";

// const BeADriver = () => {
//   const navigation = useNavigate();
//   const { user } = useAuth();
//   const [allowResubmit, setAllowResubmit] = useState(false);

//   // ===== 1️⃣ Check if user already applied =====
//   const { data: existingApp, isLoading: checkingStatus } = useQuery({
//     queryKey: ["driverApplication", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecurePublic.get(`/api/driver/check/${user.email}`);
//       return res.data; // { exists: true, status: "pending"|"approved"|"rejected" }
//     },
//   });

//   // ===== 2️⃣ Form hook =====
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // ===== 3️⃣ Submit Mutation =====
//   const mutation = useMutation({
//     mutationFn: async (formData) => {
//       const response = await axiosSecurePublic.post("api/driver/create", formData);
//       return response.data;
//     },
//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "Application Submitted!",
//         text: "Thank you. We will review your application shortly.",
//         confirmButtonColor: "#22c55e",
//       });
//       reset();
//       navigation("/dashboard");
//     },
//     onError: (error) => {
//       console.error("Submission failed:", error);
//     },
//   });

//   // ===== 4️⃣ On Submit =====
//   const onSubmit = async (data) => {
//     try {
//       const imageFile = data.imageUrl?.[0];
//       let imageUrl = "";
//       if (imageFile) {
//         imageUrl = await uploadImageToImgBB(imageFile);
//       }

//       const newDriver = {
//         ...data,
//         email: user?.email,
//         imageUrl,
//         createdAt: new Date(),
//       };

//       mutation.mutate(newDriver);
//     } catch (error) {
//       console.error("Image upload error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Image Upload Failed",
//         text: "Please try again.",
//       });
//     }
//   };

//   // ===== 5️⃣ Conditional UI =====
//   if (checkingStatus) {
//     return <p className="mt-10 text-center">Checking your application status...</p>;
//   }

//   if (existingApp?.exists && existingApp?.status === "pending") {
//     return (
//       <div className="mt-20 text-center">
//         <h2 className="text-xl font-semibold">Your application is under review.</h2>
//         <p className="text-gray-600">Please wait until we respond.</p>
//       </div>
//     );
//   }

//   if (existingApp?.exists && existingApp?.status === "approved") {
//     return (
//       <div className="mt-20 text-center">
//         <h2 className="text-xl font-semibold">You are already a driver 🎉</h2>
//         <p className="text-gray-600">No need to apply again.</p>
//       </div>
//     );
//   }

//   // If rejected → allow re-submit
//   if (existingApp?.exists && existingApp?.status === "rejected") {
//     Swal.fire({
//       icon: "warning",
//       title: "Application Rejected",
//       text: "You can reapply now.",
//     });
//   }

//   // ===== 6️⃣ Form =====
//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-3xl p-4 mx-auto my-32 space-y-6 bg-white rounded shadow"
//     >
//       <h2 className="text-xl font-semibold">Driver Application Form</h2>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//         {/* All your previous input fields remain here exactly */}
//         <div>
//           <label>Full Name</label>
//           <input {...register("fullName", { required: true })} placeholder="Full Name" className="input" />
//         </div>

//         <div>
//           <label>Date of Birth</label>
//           <input {...register("dateOfBirth", { required: true })} type="date" className="input" />
//         </div>

//         {/* ... Rest of your 20+ fields same as before */}
//         {/* Keeping exactly as you had it in your original code */}
//       </div>

//       <label className="flex items-center gap-2 mt-4">
//         <input type="checkbox" {...register("agreeTerms", { required: true })} />
//         I agree to the Terms & Conditions
//       </label>
//       {errors.agreeTerms && (
//         <p className="text-sm text-red-500">You must agree before submitting.</p>
//       )}

//       <button
//         type="submit"
//         disabled={mutation.isLoading}
//         className={`px-4 py-2 text-white rounded ${
//           mutation.isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
//         }`}
//       >
//         {mutation.isLoading ? "Submitting..." : "Submit Application"}
//       </button>
//     </form>
//   );
// };

// export default BeADriver;
