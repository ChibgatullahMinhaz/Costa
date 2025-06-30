import React from "react";

const BookingDetails = () => {
  return (
    <div className="bg-white font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
     
        <h2 className="font-bold text-gray-900 text-lg mb-6">
          Pay and Ready to Go!
        </h2>

        <main className="flex flex-col lg:flex-row gap-6">
          {/* Left Side */}
          <section className="flex-1 space-y-6">
            {/* Ride Info */}
            <article>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">
                  Ride Info
                </h3>
                <button className="text-orange-400 text-xs font-semibold flex items-center space-x-1">
                  <span>Modify</span>
                  <i className="fas fa-pen text-[10px]" aria-hidden="true"></i>
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-2">2025-07-02, Wed</p>
              <div className="rounded border border-gray-300 overflow-hidden mb-2">
                <iframe
                  className="w-full h-36"
                  frameBorder="0"
                  loading="lazy"
                  scrolling="no"
                  src="https://maps.google.com/maps?q=new%20york&t=&z=10&ie=UTF8&iwloc=&output=embed"
                  title="Map showing route from John F. Kennedy International Airport to Newark Liberty International Airport"
                ></iframe>
              </div>
              <ul className="text-xs text-gray-500 space-y-1">
                <li className="flex items-center space-x-2">
                  <i
                    className="fas fa-clock text-gray-400 text-[10px]"
                    aria-hidden="true"
                  ></i>
                  <span>06:05 AM</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i
                    className="fas fa-map-marker-alt text-gray-400 text-[10px]"
                    aria-hidden="true"
                  ></i>
                  <span>John F. Kennedy International Airport</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i
                    className="fas fa-map-marker-alt text-gray-400 text-[10px]"
                    aria-hidden="true"
                  ></i>
                  <span>Newark Liberty International Airport</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i
                    className="fas fa-route text-gray-400 text-[10px]"
                    aria-hidden="true"
                  ></i>
                  <span>Estimated at 211 miles and 3h 1 minutes</span>
                </li>
              </ul>
            </article>

            {/* Contact Form */}
            <form className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Contact Information
                </label>
                <p className="text-[10px] text-red-600 font-semibold bg-red-100 border border-red-600 rounded px-2 py-0.5 mb-1 w-max">
                  Your name is required
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="border border-red-600 rounded px-2 py-1 text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  placeholder="Name*"
                  required
                  type="text"
                />
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  required
                >
                  <option disabled value="">
                    select
                  </option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                </select>
                <input
                  className="border border-gray-300 rounded px-2 py-1 text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  placeholder="Email*"
                  required
                  type="email"
                />
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  required
                >
                  <option disabled value="">
                    select
                  </option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+91</option>
                  <option>+61</option>
                </select>
                <select className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-400">
                  <option disabled value="">
                    select
                  </option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+91</option>
                  <option>+61</option>
                </select>
                <input
                  className="border border-gray-300 rounded px-2 py-1 text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  placeholder="Social Media"
                  type="text"
                />
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <input className="w-3 h-3" id="newsletter" type="checkbox" />
                <label htmlFor="newsletter">
                  I agree to subscribe to info/newsletter for the latest
                  discounts, promotions, and updates.
                </label>
              </div>
            </form>

            {/* Special Instructions */}
            <section className="border border-gray-300 rounded p-3 text-xs text-gray-600">
              <h3 className="font-semibold mb-1">
                Special Instructions (Optional)
              </h3>
              <p>
                Please fill in your additional requests. We will do our best to
                coordinate, but please understand if we can't meet them.
              </p>
            </section>
          </section>

          {/* Right Side */}
          <aside className="w-full max-w-sm space-y-6">
            <section className="border border-gray-300 rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900 text-xs">
                  Comfort Sedan
                </h3>
                <button className="text-orange-400 text-xs font-semibold flex items-center space-x-1">
                  <span>Modify</span>
                  <i className="fas fa-pen text-[10px]" aria-hidden="true"></i>
                </button>
              </div>
              <p className="text-gray-500 text-[10px] mb-2">
                Toyota Camry or similar
              </p>
              <div className="flex items-center space-x-3 mb-2">
                <img
                  alt="Black silhouette side view of a sedan car"
                  className="w-20 h-7 object-contain"
                  src="https://placehold.co/80x30/png?text=Sedan+Car+Silhouette"
                />
                <div className="text-[10px] text-gray-500 space-x-2 flex items-center">
                  <span>
                    <i className="fas fa-user"></i> Max. 3
                  </span>
                  <span>
                    <i className="fas fa-suitcase"></i> Max. 3
                  </span>
                </div>
              </div>
            </section>

            <section className="border border-gray-300 rounded p-3 space-y-3 text-xs">
              <div>
                <p className="text-gray-500">Vehicle service</p>
                <p className="text-right text-orange-400 font-semibold">
                  -- USD 216.00
                </p>
              </div>
              <div className="flex justify-between items-center font-semibold text-orange-500">
                <span>Total</span>
                <span>USD 216.00</span>
              </div>
              <div className="text-gray-500">
                <p className="mb-1">
                  Do you have a coupon?
                  <a className="text-orange-400 underline" href="#">
                    Enter it here!
                  </a>
                </p>
                <input
                  className="w-full border border-orange-400 rounded px-2 py-1 text-[10px] text-orange-400 placeholder-orange-400 mb-1"
                  placeholder="Enter your coupon"
                  type="text"
                />
                <button
                  className="bg-orange-400 text-white text-[10px] font-semibold rounded px-3 py-1 mb-1"
                  type="button"
                >
                  Apply
                </button>
                <p className="text-[8px] text-gray-400 italic">
                  The coupon code cannot be empty
                </p>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-gray-500">
                <input className="w-3 h-3" id="nonrefundable" type="checkbox" />
                <label htmlFor="nonrefundable">
                  Make ride non-refundable (save an extra 5% on the whole ride)
                </label>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Payment method</p>
                <label className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    checked
                    className="form-radio text-orange-400"
                    name="payment"
                    type="radio"
                  />
                  <span className="text-[10px] text-gray-700">
                    Credit Card/Debit Card
                  </span>
                </label>
              </div>
              <button
                className="w-full bg-orange-400 text-white text-xs font-semibold rounded py-2 mt-2"
                type="submit"
              >
                Continue to payment
              </button>
              <p className="text-[8px] text-gray-400 mt-2">
                By continuing, you indicate that you have read and agreed to
                Terms and Conditions and Privacy Policy.
              </p>
            </section>
          </aside>
        </main>
      </div>
      <div className="border-t border-orange-400 mt-6"></div>
    </div>
  );
};

export default BookingDetails;
