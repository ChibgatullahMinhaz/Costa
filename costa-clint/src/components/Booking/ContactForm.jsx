import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactInformation = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const isBookingForSomeoneElse = watch("bookingForSomeoneElse");

  return (
    <div className="space-y-4">
      {/* ✅ Booking for someone else */}
      <label className="flex items-center space-x-2 text-sm font-semibold">
        <input type="checkbox" {...register("bookingForSomeoneElse")} />
        <span>I’m booking for someone else</span>
      </label>

      {/* ✅ Agent fields if checked */}
      {isBookingForSomeoneElse && (
        <>
          <input
            {...register("agentName", { required: true })}
            placeholder="Name of the agent"
            className="border border-gray-300 rounded px-2 py-1 text-xs w-full"
          />

          <select
            {...register("salutation")}
            className="border border-gray-300 rounded px-2 py-1 text-xs w-full"
          >
            <option value="">Select</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
            <option>Dr.</option>
          </select>
        </>
      )}

      {/* ✅ Name */}
      <input
        {...register("contactInfo.name", { required: "Name is required" })}
        placeholder="Name *"
        className={`border rounded px-2 py-1 text-xs w-full ${
          errors.contactInfo?.name ? "border-red-600" : "border-gray-300"
        }`}
      />
      {errors.contactInfo?.name && (
        <p className="text-xs text-red-600">{errors.contactInfo.name.message}</p>
      )}

      {/* ✅ Email */}
      <input
        {...register("contactInfo.email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address",
          },
        })}
        placeholder="Email *"
        className={`border rounded px-2 py-1 text-xs w-full ${
          errors.contactInfo?.email ? "border-red-600" : "border-gray-300"
        }`}
      />
      {errors.contactInfo?.email && (
        <p className="text-xs text-red-600">{errors.contactInfo.email.message}</p>
      )}

      {/* ✅ Phone number (with all countries and code) */}
      <Controller
        name="contactInfo.phone"
        control={control}
        rules={{ required: "Phone number is required" }}
        render={({ field }) => (
          <PhoneInput
            {...field}
            country={"bd"}
            enableSearch
            inputStyle={{
              width: "100%",
              fontSize: "12px",
              padding: "10px",
            }}
            containerStyle={{ width: "100%" }}
            onChange={(value) => field.onChange(value)}
            placeholder="Phone Number"
          />
        )}
      />
      {errors.contactInfo?.phone && (
        <p className="text-xs text-red-600">{errors.contactInfo.phone.message}</p>
      )}

      {/* ✅ Social Media dropdown */}
      <select
        {...register("socialMedia")}
        className="border border-gray-300 rounded px-2 py-1 text-xs w-full"
      >
        <option value="">Select Social Media</option>
        <option value="facebook">Facebook</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="viber">Viber</option>
        <option value="telegram">Telegram</option>
        <option value="wechat">WeChat</option>
      </select>
    </div>
  );
};

export default ContactInformation;
