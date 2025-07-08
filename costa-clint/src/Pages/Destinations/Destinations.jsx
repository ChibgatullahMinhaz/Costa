const Destinations = () => {
  const destinations = [
    {
      name: "Manuel Antonio",
      airport: "SJO",
      image: "https://source.unsplash.com/featured/?manuel-antonio",
    },
    {
      name: "Tamarindo",
      airport: "LIR",
      image: "https://source.unsplash.com/featured/?tamarindo,costa-rica",
    },
    {
      name: "La Fortuna",
      airport: "SJO",
      image: "https://source.unsplash.com/featured/?la-fortuna",
    },
    {
      name: "San José",
      airport: "SYQ",
      image: "https://source.unsplash.com/featured/?san-jose,costa-rica",
    },
  ];

  return (
    <section className="min-h-screen bg-white px-6 py-16 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Popular Destinations
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {destinations.map((d, i) => (
            <div key={i} className="rounded-xl shadow-md overflow-hidden">
              <img
                src={d.image}
                alt={d.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 bg-gray-100">
                <h3 className="text-xl font-semibold">{d.name}</h3>
                <p className="text-sm text-gray-600">
                  Nearby Airport: {d.airport}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
