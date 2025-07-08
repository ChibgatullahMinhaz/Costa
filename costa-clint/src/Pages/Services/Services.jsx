const Services = () => {
  const services = [
    {
      title: "Airport Transfers",
      desc: "Reliable and punctual pickups and drop-offs from SJO, LIR, and SYQ airports.",
    },
    {
      title: "Hotel-to-Hotel Rides",
      desc: "Private rides between hotels and resorts across Costa Rica.",
    },
    {
      title: "Flight Monitoring",
      desc: "We track your flight in real-time to adjust pick-up times for delays or early arrivals.",
    },
    {
      title: "Multilingual Support",
      desc: "English and Spanish-speaking drivers and support staff.",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
