import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecureInstance from "../../../Service/APIs/AxiosInstance";
import Swal from "sweetalert2";

async function fetchBooking(id) {
  const res = await axiosSecureInstance.get(`api/bookingById/${id}`);
  return res.data;
}

async function updateBooking(id, data) {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update booking");
  return res.json();
}

function BookingUpdateForm() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => fetchBooking(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (updatedData) => updateBooking(id, updatedData),
    onSuccess: () => {
      alert("Booking updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    },
    onError: (error) => {
      alert("Error updating booking: " + error.message);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      transferType: "",
      from: "",
      to: "",
      date: "",
      time: "",
      passengers: "",
      flightNumber: "",
      vehicleType: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      paymentMethod: "",
      adults: 0,
      children: "",
      bags: "",
      pet: "",
      extras: "",
      notes: "",
      duration: "",
      flight: "",
      bookingForSomeoneElse: false,
      salutation: "",
      agreeNewsletter: false,
      specialInstructions: "",
      agentName: "",
      agentEmail: "",
    },
  });

 useEffect(() => {
    if (booking) {
      reset({
        transferType: booking.transferType || "",
        from: booking.from || "",
        to: booking.to || "",
        date: booking.date || "",
        time: booking.time || "",
        passengers: booking.passengers || "",
        flightNumber: booking.flightNumber || "",
        vehicleType: booking.vehicleType || "",
        contactName: booking.contactInfo?.name || "",
        contactEmail: booking.contactInfo?.email || "",
        contactPhone: booking.contactInfo?.phone || "",
        paymentMethod: booking.paymentMethod || "",
        adults: booking.adults || 0,
        children: booking.children || "",
        bags: booking.bags || "",
        pet: booking.pet || "",
        extras: booking.extras || "",
        notes: booking.notes || "",
        duration: booking.duration || "",
        flight: booking.flight || "",
        bookingForSomeoneElse: booking.bookingForSomeoneElse || false,
        salutation: booking.salutation || "",
        agreeNewsletter: booking.agreeNewsletter || false,
        specialInstructions: booking.specialInstructions || "",
        agentName: booking.agentName || "",
        agentEmail: booking.agentEmail || "",
      });
    }
  }, [booking, reset]);

 const onSubmit = async (data) => {
  const updatedData = {
    ...data,
    contactInfo: {
      name: data.contactName,
      email: data.contactEmail,
      phone: data.contactPhone,
    },
  };

  const confirmResult = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to update this booking?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'Cancel',
  });

  if (confirmResult.isConfirmed) {
    try {
      const res = await axiosSecureInstance.put(`api/myBookings/update/${id}`, updatedData);

      await Swal.fire({
        title: 'Updated!',
        text: 'Booking updated successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error?.response?.data?.message || error.message,
        icon: 'error',
      });
    }
  }
};


  if (isLoading) return <p className="text-center text-lg">Loading booking data...</p>;
  if (isError) return <p className="text-center text-red-600">Error: {error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Booking</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Transfer Type", name: "transferType", type: "text" },
          { label: "From", name: "from", type: "text" },
          { label: "To", name: "to", type: "text" },
          { label: "Date", name: "date", type: "date" },
          { label: "Time", name: "time", type: "time" },
          { label: "Passengers", name: "passengers", type: "number" },
          { label: "Flight Number", name: "flightNumber", type: "text" },
          { label: "Vehicle Type", name: "vehicleType", type: "text" },
          { label: "Payment Method", name: "paymentMethod", type: "text" },
          { label: "Adults", name: "adults", type: "number" },
          { label: "Children", name: "children", type: "text" },
          { label: "Bags", name: "bags", type: "text" },
          { label: "Pet", name: "pet", type: "text" },
          { label: "Extras", name: "extras", type: "text" },
          { label: "Duration (hours)", name: "duration", type: "number" },
          { label: "Flight", name: "flight", type: "text" },
          { label: "Salutation", name: "salutation", type: "text" },
          { label: "Agent Name", name: "agentName", type: "text" },
          { label: "Agent Email", name: "agentEmail", type: "email" },
        ].map(({ label, name, type }) => (
          <label key={name} className="flex flex-col">
            <span className="text-sm font-medium mb-1">{label}</span>
            <input type={type} {...register(name)} className="border rounded px-3 py-2" />
          </label>
        ))}

        <fieldset className="col-span-full border p-4 rounded">
          <legend className="font-semibold text-sm mb-2">Contact Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col">
              <span className="text-sm">Name</span>
              <input type="text" {...register("contactName")} className="border rounded px-3 py-2" />
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Email</span>
              <input type="email" {...register("contactEmail")} className="border rounded px-3 py-2" />
            </label>
            <label className="flex flex-col">
              <span className="text-sm">Phone</span>
              <input type="tel" {...register("contactPhone")} className="border rounded px-3 py-2" />
            </label>
          </div>
        </fieldset>

        <label className="col-span-full">
          <span className="text-sm font-medium mb-1">Notes</span>
          <textarea rows={3} {...register("notes")} className="w-full border rounded px-3 py-2" />
        </label>

        <label className="col-span-full">
          <span className="text-sm font-medium mb-1">Special Instructions</span>
          <textarea rows={3} {...register("specialInstructions")} className="w-full border rounded px-3 py-2" />
        </label>

        <label className="flex items-center space-x-2 col-span-1">
          <input type="checkbox" {...register("bookingForSomeoneElse")} />
          <span>Booking For Someone Else</span>
        </label>

        <label className="flex items-center space-x-2 col-span-1">
          <input type="checkbox" {...register("agreeNewsletter")} />
          <span>Agree to Newsletter</span>
        </label>

        <div className="col-span-full text-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingUpdateForm;
