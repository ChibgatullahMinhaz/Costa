import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Modal from "../UI/Modal/Modal";
import PaymentForm from "../Payment/StripPayment";

const ContactInformation = ({ onContinue }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const isBookingForSomeoneElse = watch("bookingForSomeoneElse");

  // On successful validation, call onContinue
  const onValid = (data) => {
    if (onContinue) {
      onContinue(data);
    }
    setShowPaymentModal(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="font-bold">Contact Information</h1>
      {/* Booking for someone else checkbox */}
      <label className="flex items-center space-x-2 text-sm font-semibold">
        <input type="checkbox" {...register("bookingForSomeoneElse")} />
        <span>I’m booking for someone else</span>
      </label>

      {/* Form fields when booking for someone else is checked */}
      {isBookingForSomeoneElse && (
        <>
          <h1>Booking Agent Details</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block mb-1 text-xs font-semibold"
                htmlFor="agentName"
              >
                Name of the agent *
              </label>
              <input
                id="agentName"
                {...register("agentName", {
                  required: "Agent name is required",
                })}
                placeholder="Name of the agent"
                className={`border rounded px-2 py-1 text-xs w-full ${
                  errors.agentName ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.agentName && (
                <p className="text-xs text-red-600">
                  {errors.agentName.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block mb-1 text-xs font-semibold"
                htmlFor="salutation"
              >
                Salutation
              </label>
              <select
                id="salutation"
                {...register("salutation")}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
              >
                <option value="">Select</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
                <option>Dr.</option>
              </select>
            </div>

            <div className="col-span-2">
              <label
                className="block mb-1 text-xs font-semibold"
                htmlFor="agentEmail"
              >
                Email *
              </label>
              <input
                id="agentEmail"
                type="email"
                {...register("agentEmail", {
                  required: "Agent email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email address to receive ride info"
                className={`border rounded px-2 py-1 text-xs w-full ${
                  errors.agentEmail ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.agentEmail && (
                <p className="text-xs text-red-600">
                  {errors.agentEmail.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label
                className="block mb-1 text-xs font-semibold"
                htmlFor="agentPhone"
              >
                Phone Number *
              </label>
              <Controller
                name="agentPhone"
                control={control}
                rules={{ required: "Agent phone number is required" }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    country={"cr"}
                    enableSearch
                    inputStyle={{
                      width: "100%",
                      fontSize: "12px",
                      padding: "10px",
                    }}
                    containerStyle={{ width: "100%" }}
                    onChange={(value) => field.onChange(value ? `+${value}` : "")}
                    placeholder="Phone Number"
                  />
                )}
              />
              {errors.agentPhone && (
                <p className="text-xs text-red-600">
                  {errors.agentPhone.message}
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Main contact info inputs */}
      <h1>Passenger Details</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label
            className="block mb-1 text-xs font-semibold"
            htmlFor="contactName"
          >
            Name *
          </label>
          <input
            id="contactName"
            {...register("contactInfo.name", { required: "Name is required" })}
            placeholder="Name *"
            className={`border rounded px-2 py-1 text-xs w-full ${
              errors.contactInfo?.name ? "border-red-600" : "border-gray-300"
            }`}
          />
          {errors.contactInfo?.name && (
            <p className="text-xs text-red-600">
              {errors.contactInfo.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            className="block mb-1 text-xs font-semibold"
            htmlFor="contactEmail"
          >
            Email *
          </label>
          <input
            id="contactEmail"
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
            <p className="text-xs text-red-600">
              {errors.contactInfo.email.message}
            </p>
          )}
        </div>

        {/* Salutation */}
        <div>
          <label
            className="block mb-1 text-xs font-semibold"
            htmlFor="contactSalutation"
          >
            Salutation
          </label>
          <select
            id="contactSalutation"
            {...register("salutation", { required: "salutation is required" })}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
          >
            <option value="">Select</option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
            <option>Dr.</option>
          </select>
          {errors?.salutation && (
            <p className="text-xs text-red-600">{errors.salutation.message}</p>
          )}
        </div>

        {/* Empty div to keep 2 col alignment */}
        <div></div>

        {/* Phone numbers: 3 fields */}
        {[0, 1, 2].map((idx) => (
          <div key={idx} className="col-span-2 md:col-span-1">
            <label
              className="block mb-1 text-xs font-semibold"
              htmlFor={`phone${idx}`}
            >
              {idx === 0 ? "Phone Number *" : `Additional Phone Number ${idx}`}
            </label>
            <Controller
              name={`contactInfo.phoneNumbers.${idx}`}
              control={control}
              rules={idx === 0 ? { required: "Phone number is required" } : {}}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={"cr"} 
                  enableSearch
                  inputStyle={{
                    width: "100%",
                    fontSize: "12px",
                    padding: "10px",
                  }}
                  containerStyle={{ width: "100%" }}
                  onChange={(value) => field.onChange(value ? `+${value}` : "")}
                  placeholder={
                    idx === 0
                      ? "Phone Number"
                      : `Additional Phone Number ${idx}`
                  }
                />
              )}
            />
            {errors.contactInfo?.phoneNumbers?.[idx] && (
              <p className="text-xs text-red-600">
                {errors.contactInfo.phoneNumbers[idx]?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Newsletter subscribe checkbox */}
      <label className="flex items-start space-x-2 text-sm">
        <input
          type="checkbox"
          {...register("agreeNewsletter", {
            required: "please check our Subscription",
          })}
        />
        <span>
          I agree to subscribe to Elife’s newsletter for the latest discounts,
          promotions, and updates.
        </span>
       
      </label>
       {errors?.agreeNewsletter && (
          <p className="text-xs text-red-600">
            {errors.agreeNewsletter.message}
          </p>
        )}
      {/* Special Instructions (Optional) */}
      <div>
        <label
          className="block mt-2 mb-1 text-xs font-semibold"
          htmlFor="specialInstructions"
        >
          Special Instructions (Optional)
        </label>
        <textarea
          id="specialInstructions"
          {...register("specialInstructions")}
          placeholder="Add any notes or special instructions..."
          className="w-full h-24 px-2 py-1 text-xs border border-gray-300 rounded resize-none"
        />
      </div>

      {/* Continue Button */}
      <button
        className="w-full py-2 mt-2 text-xs font-semibold text-white bg-orange-400 rounded"
        type="submit"
        onClick={handleSubmit(onValid)}
      >
        Continue to payment
      </button>
      {/* Payment modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      >
        <PaymentForm
          onSuccess={() => {
            setShowPaymentModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default ContactInformation;
