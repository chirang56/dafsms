import React, { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import CustomerModal from '../components/CustomerModal';
import { fetchCustomers, addCustomer, deleteCustomer } from '../services/supabaseService';

function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSaveCustomer = async (customer: { name: string; email: string; phone: string; location: string; status: string }) => {
    setIsAdding(true);
    try {
      const addedCustomer = await addCustomer(customer);
      if (addedCustomer) {
        setCustomers((prev) => [...prev, ...addedCustomer]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <UserPlus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Customer Modal */}
      <CustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveCustomer} 
        isAdding={isAdding} 
      />

      {/* Customer List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold">{customer.name}</h3>
            <p className="text-sm text-gray-600">{customer.email}</p>
            <button 
              onClick={() => deleteCustomer(customer.id).then(loadCustomers)}
              className="text-red-600 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;
