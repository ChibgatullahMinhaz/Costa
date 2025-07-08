const About = () => {
  return (
    <section className="min-h-screen bg-white px-6 py-16 text-gray-800">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg">
          Welcome to Costa Rica Transfers — your trusted partner in seamless airport-to-hotel transportation. Our mission is to make travel easy, comfortable, and safe for international visitors in Costa Rica. With real-time flight integration and professionally trained drivers, we ensure timely and personalized transfers.
        </p>
        <p className="text-md text-gray-600">
          From the lush rainforests of La Fortuna to the sunny beaches of Tamarindo, we connect all corners of Costa Rica with precision and care.
        </p>
        <div className="mt-6">
          <img src="https://source.unsplash.com/featured/?costa-rica,travel" alt="Costa Rica" className="w-full rounded-2xl shadow-md" />
        </div>
      </div>
    </section>
  );
};

export default About;
