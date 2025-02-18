import React from 'react';
import { UserPlus, Mail, Phone, MapPin } from 'lucide-react';

function Customers() {
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234-567-8900',
      location: 'New York, USA',
      orders: 12,
      totalSpent: '$1,234',
      lastOrder: '2024-02-15',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234-567-8901',
      location: 'Los Angeles, USA',
      orders: 8,
      totalSpent: '$876',
      lastOrder: '2024-02-14',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234-567-8902',
      location: 'Chicago, USA',
      orders: 15,
      totalSpent: '$2,345',
      lastOrder: '2024-02-13',
      status: 'Inactive',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <UserPlus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{customer.name}</h3>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {customer.status}
                </span>
              </div>
              <button className="text-blue-600 hover:text-blue-800">View Details</button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{customer.location}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Orders</p>
                <p className="font-semibold">{customer.orders}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="font-semibold">{customer.totalSpent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Order</p>
                <p className="font-semibold">{customer.lastOrder}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;