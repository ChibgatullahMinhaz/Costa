import React, { useState } from 'react';
import { Search, MapPin, User, Car, Clock } from 'lucide-react';
const ManualAssignment = () => {
    const [selectedDriver, setSelectedDriver] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  const availableDrivers = [
    { id: '1', name: 'Ahmed Hassan', vehicle: 'Toyota Corolla', location: 'Dhanmondi', distance: '0.5 km' },
    { id: '2', name: 'Mahmud Rahman', vehicle: 'Honda Civic', location: 'Gulshan', distance: '1.2 km' },
    { id: '3', name: 'Karim Uddin', vehicle: 'Nissan Sunny', location: 'Uttara', distance: '2.1 km' },
  ];

  const handleAssignment = () => {
    if (!selectedDriver || !pickupLocation || !dropoffLocation || !customerPhone) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Manual assignment created:', {
      driver: selectedDriver,
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      customer: customerPhone,
      notes
    });
    
    // Reset form
    setSelectedDriver('');
    setPickupLocation('');
    setDropoffLocation('');
    setCustomerPhone('');
    setNotes('');
    
    alert('Trip assigned successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Manual Trip Assignment</h3>
          <p className="text-gray-600">Assign trips to drivers manually</p>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assignment Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Phone *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+8801XXXXXXXXX"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Enter pickup address"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dropoff Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder="Enter destination address"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions..."
                  rows={3}
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>
            </div>

            {/* Available Drivers */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Available Drivers</h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    onClick={() => setSelectedDriver(driver.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDriver === driver.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-green-100 text-green-700">
                            {driver.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{driver.name}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Car className="h-3 w-3" />
                            <span>{driver.vehicle}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{driver.location}</p>
                        <p className="text-xs text-gray-500">{driver.distance} away</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleAssignment}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white ring-offset-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <Clock className="h-4 w-4" />
              Assign Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualAssignment;