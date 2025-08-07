const services = [
  {
    title: "Airport Transfers",
    image: "https://elifelimo.com/img/home/airport-transfers.png",
    icon: "✈️",
  },
  {
    title: "Charter Bus Rental",
    image: "https://elifelimo.com/img/home/charter-bus.png",
    icon: "🚌",
  },
  {
    title: "Limo Rental",
    image: "https://elifelimo.com/img/home/limo-rental.png",
    icon: "🚖",
  },
  {
    title: "Global Tourism Transfers",
    image: "https://elifelimo.com/img/home/global-tourism.png",
    icon: "🌍",
  },
  {
    title: "Business Travel Transfers",
    image: "https://elifelimo.com/img/home/business-travel.png",
    icon: "💼",
  },
  {
    title: "Wheelchair Transportation",
    image: "https://elifelimo.com/img/home/wheelchair.png",
    icon: "♿",
  },
  {
    title: "Taxi Hailing – Point to Point",
    image: "https://elifelimo.com/img/home/point-to-point.png",
    icon: "🚕",
  },
  {
    title: "Special Event Transportation",
    image: "https://elifelimo.com/img/home/long-distance-rides.png",
    icon: "🎉",
  },
  {
    title: "Group Transfers",
    image: "https://elifelimo.com/img/home/group-transfer.png",
    icon: "👥",
  },
];

const Services = () => {
  return (
    <section className="px-6 py-12 my-10">
      <h2 className="mb-10 text-3xl font-bold text-center">Our Services</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden shadow-md h-60 rounded-2xl group"
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 transition duration-300 bg-opacity-40 group-hover:bg-opacity-60"></div>
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
              <div>
                <div className="text-4xl">{service.icon}</div>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {service.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
