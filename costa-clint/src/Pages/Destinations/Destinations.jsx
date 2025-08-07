const Destinations = () => {
  const destinations = [
    {
      name: "Manuel Antonio",
      airport: "SJO",
      image:
        "https://centralamericaairports.com/wp-content/uploads/2023/08/Costa-Rica-Juan-Santamaria-International-Airport-SJO-MROC.jpeg",
    },
    {
      name: "Tamarindo",
      airport: "LIR",
      image:
        "https://res.cloudinary.com/vacationscostarica-com/image/upload/v1650823626/tamarindo_diria_beachfront_overview_guanacaste_7945a0a8c0.jpg",
    },
    {
      name: "La Fortuna",
      airport: "SJO",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgVa8u8LPTLI9gvT2aa8IvgFNes1RMjT0nDQ&s",
    },
    {
      name: "San José",
      airport: "SYQ",
      image:
        "https://www.visitcostarica.com/sites/default/files/2024-09/Aurola-15-San-Jose.jpg",
    },
  ];

  return (
    <section className="min-h-screen px-6 py-16 my-10 text-gray-900 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-12 text-4xl font-bold text-center">
          Popular Destinations
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {destinations.map((d, i) => (
            <div key={i} className="overflow-hidden shadow-md rounded-xl">
              <img
                src={d.image}
                alt={d.name}
                className="object-cover w-full h-48"
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
