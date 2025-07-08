import { Link } from "react-router";
import { Lock } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md text-center bg-white shadow-lg rounded-2xl p-10">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <Lock size={40} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page. <br />
          Please contact the administrator if you believe this is a mistake.
        </p>

        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
