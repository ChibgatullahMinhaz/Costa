import { Car, Circle } from "lucide-react";

const TimelineInfo = ({ from, duration }) => {
  return (
    <div className="flex items-start gap-4 space-y-4">
      {/* Left side: vertical line with dot and car */}
      <div className="flex flex-col  items-center relative">
        {/* Dot at top */}
        <Circle className="w-4 h-4 text-blue-600" />
        {/* Vertical line */}
       <div  className="border-l-2 border-base-300 h-10 my-1">
    
       </div>

        {/* Car icon at bottom */}
        <Car className="text-blue-600 text-lg mt-1" />
      </div>

      {/* Right side: content */}
      <div className="space-y-4">
        <p className="text-gray-800 font-medium">From: {from}</p>
        <p className="text-gray-600">Service time: {duration} hours</p>
      </div>
    </div>
  );
};

export default TimelineInfo;
