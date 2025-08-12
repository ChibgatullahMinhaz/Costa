import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import axiosSecureInstance from "../../../Service/APIs/AxiosInstance";

const fetchPricing = async () => {
  const { data } = await axiosSecureInstance.get("api/settings/pricing");
  return data;
};

const updatePricing = async (newData) => {
  const { data } = await axiosSecureInstance.put("api/settings/pricing/update", newData);
  return data;
};

const Pricing = () => {
  const queryClient = useQueryClient();

  const { data: pricingData, isLoading } = useQuery({
    queryKey: ["pricing"],
    queryFn: fetchPricing,
  });

  const { control, register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: updatePricing,
    onSuccess: () => {
      queryClient.invalidateQueries(["pricing"]);
      Swal.fire("Success", "Pricing settings updated", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update settings", "error");
    },
  });

  React.useEffect(() => {
    if (pricingData) reset(pricingData);
  }, [pricingData, reset]);

  const onSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update pricing settings.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(formData);
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Pricing Settings</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField label="Base Fare ($)" name="baseFare" register={register} />
        <InputField label="Included Distance (km)" name="includedDistanceKm" register={register} />
        <InputField label="Additional Distance Rate ($/km)" name="additionalPerKmRate" register={register} type="text" />
        <InputField label="Free Passenger Limit" name="basePassengerLimit" register={register} />
        <InputField label="Extra Passenger Fee ($)" name="extraPassengerFee" register={register} />
        <InputField label="Night Surcharge Start Time (HH:mm)" name="nightSurcharge.startTime" register={register} type="time" />
        <InputField label="Night Surcharge (%)" name="nightSurcharge.surchargePercent" register={register} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">Enable Night Surcharge</p>
          <p className="text-sm text-gray-500">Applies after set time</p>
        </div>
        <Controller
          control={control}
          name="nightSurcharge.enabled"
          render={({ field }) => (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {mutation.isPending ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
};

const InputField = ({ label, name, register, type = "number" }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      {...register(name, { valueAsNumber: type === "number" })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Pricing;
