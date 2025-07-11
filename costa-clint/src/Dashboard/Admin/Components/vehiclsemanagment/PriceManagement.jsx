import React, { useState } from 'react';
import { Edit, Save, X, Plus } from 'lucide-react';
const PriceManagement = () => {
    const [editingId, setEditingId] = useState(null);
  const [priceRules, setPriceRules] = useState([
    {
      id: '1',
      vehicleType: 'Economy',
      baseFare: 50,
      perKmRate: 12,
      perMinuteRate: 2,
      surgeMultiplier: 1.5,
      minimumFare: 80
    },
    {
      id: '2',
      vehicleType: 'Premium',
      baseFare: 80,
      perKmRate: 18,
      perMinuteRate: 3,
      surgeMultiplier: 2.0,
      minimumFare: 120
    },
    {
      id: '3',
      vehicleType: 'Luxury',
      baseFare: 150,
      perKmRate: 25,
      perMinuteRate: 5,
      surgeMultiplier: 2.5,
      minimumFare: 200
    }
  ]);

  const [editData, setEditData] = useState({});

  const handleEdit = (rule) => {
    setEditingId(rule.id);
    setEditData({ ...rule });
  };

  const handleSave = () => {
    setPriceRules(prev => 
      prev.map(rule => 
        rule.id === editingId ? { ...editData } : rule
      )
    );
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="space-y-6">
      {/* Current Pricing Rules */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Pricing Rules</h3>
              <p className="text-gray-600">Manage fare rates for different vehicle types</p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white ring-offset-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
              <Plus className="h-4 w-4" />
              Add New Rule
            </button>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-gray-50/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Vehicle Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Base Fare (৳)</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Per KM (৳)</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Per Minute (৳)</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Surge Multiplier</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Min Fare (৳)</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {priceRules.map((rule) => (
                  <tr key={rule.id} className="border-b transition-colors hover:bg-gray-50">
                    <td className="p-4 align-middle">
                      <span className="font-medium text-gray-900">{rule.vehicleType}</span>
                    </td>
                    <td className="p-4 align-middle">
                      {editingId === rule.id ? (
                        <input
                          type="number"
                          value={editData.baseFare}
                          onChange={(e) => setEditData({...editData, baseFare: Number(e.target.value)})}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span>{rule.baseFare}</span>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      {editingId === rule.id ? (
                        <input
                          type="number"
                          value={editData.perKmRate}
                          onChange={(e) => setEditData({...editData, perKmRate: Number(e.target.value)})}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span>{rule.perKmRate}</span>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      {editingId === rule.id ? (
                        <input
                          type="number"
                          value={editData.perMinuteRate}
                          onChange={(e) => setEditData({...editData, perMinuteRate: Number(e.target.value)})}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span>{rule.perMinuteRate}</span>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      {editingId === rule.id ? (
                        <input
                          type="number"
                          step="0.1"
                          value={editData.surgeMultiplier}
                          onChange={(e) => setEditData({...editData, surgeMultiplier: Number(e.target.value)})}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span>{rule.surgeMultiplier}x</span>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      {editingId === rule.id ? (
                        <input
                          type="number"
                          value={editData.minimumFare}
                          onChange={(e) => setEditData({...editData, minimumFare: Number(e.target.value)})}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <span>{rule.minimumFare}</span>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      {editingId === rule.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-green-100 hover:text-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 h-8 w-8"
                          >
                            <Save className="h-4 w-4 text-green-600" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-red-100 hover:text-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 h-8 w-8"
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(rule)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-blue-100 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 h-8 w-8"
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default PriceManagement;