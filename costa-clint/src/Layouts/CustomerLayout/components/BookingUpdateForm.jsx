import React from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchBooking(id) {
  const res = await fetch(`/api/bookings/${id}`);
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
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

  // Use TanStack Query v5 style for useQuery
  const { data: booking, isLoading, isError, error } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => fetchBooking(id),
    enabled: !!id,
  });

  // Use TanStack Query v5 style for useMutation
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

  React.useEffect(() => {
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

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      contactInfo: {
        name: data.contactName,
        email: data.contactEmail,
        phone: data.contactPhone,
      },
    };
    mutation.mutate(updatedData);
  };

  if (isLoading) return <p>Loading booking data...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Update Booking</h2>

      <label>
        Transfer Type:
        <input type="text" {...register("transferType")} />
      </label>

      <label>
        From:
        <input type="text" {...register("from")} />
      </label>

      <label>
        To:
        <input type="text" {...register("to")} />
      </label>

      <label>
        Date:
        <input type="date" {...register("date")} />
      </label>

      <label>
        Time:
        <input type="time" {...register("time")} />
      </label>

      <label>
        Passengers:
        <input type="number" min="1" {...register("passengers")} />
      </label>

      <label>
        Flight Number:
        <input type="text" {...register("flightNumber")} />
      </label>

      <label>
        Vehicle Type:
        <input type="text" {...register("vehicleType")} />
      </label>

      <fieldset>
        <legend>Contact Info</legend>
        <label>
          Name:
          <input type="text" {...register("contactName")} />
        </label>

        <label>
          Email:
          <input type="email" {...register("contactEmail")} />
        </label>

        <label>
          Phone:
          <input type="tel" {...register("contactPhone")} />
        </label>
      </fieldset>

      <label>
        Payment Method:
        <input type="text" {...register("paymentMethod")} />
      </label>

      <label>
        Adults:
        <input type="number" min="0" {...register("adults")} />
      </label>

      <label>
        Children:
        <input type="text" {...register("children")} />
      </label>

      <label>
        Bags:
        <input type="text" {...register("bags")} />
      </label>

      <label>
        Pet:
        <input type="text" {...register("pet")} />
      </label>

      <label>
        Extras:
        <input type="text" {...register("extras")} />
      </label>

      <label>
        Notes:
        <textarea rows={3} {...register("notes")} />
      </label>

      <label>
        Duration (hours):
        <input type="number" min="0" {...register("duration")} />
      </label>

      <label>
        Flight:
        <input type="text" {...register("flight")} />
      </label>

      <label>
        Booking For Someone Else:
        <input type="checkbox" {...register("bookingForSomeoneElse")} />
      </label>

      <label>
        Salutation:
        <input type="text" {...register("salutation")} />
      </label>

      <label>
        Agree Newsletter:
        <input type="checkbox" {...register("agreeNewsletter")} />
      </label>

      <label>
        Special Instructions:
        <textarea rows={3} {...register("specialInstructions")} />
      </label>

      <label>
        Agent Name:
        <input type="text" {...register("agentName")} />
      </label>

      <label>
        Agent Email:
        <input type="email" {...register("agentEmail")} />
      </label>

      <button type="submit" style={{ marginTop: 20 }} disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Booking"}
      </button>
    </form>
  );
}

export default BookingUpdateForm;
