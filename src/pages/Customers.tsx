import React, { useEffect, useState } from 'react';
import { UserPlus, Mail, Phone, MapPin } from 'lucide-react';
import { fetchCustomers, addCustomer } from '../services/supabaseService';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', location: '', status: 'Active' });

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    getCustomers();
  }, []);

  const handleAddCustomer = async () => {
    try {
      const addedCustomer = await addCustomer(newCustomer);
      setCustomers([...customers, ...addedCustomer]);
      setNewCustomer({ name: '', email: '', phone: '', location: '', status: 'Active' });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <button
          onClick={handleAddCustomer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <UserPlus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Add Customer Form */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Location"
            value={newCustomer.location}
            onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
                <p className="font-semibold">{customer.orders || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="font-semibold">{customer.totalSpent || '$0.00'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Order</p>
                <p className="font-semibold">{customer.lastOrder || 'N/A'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;
