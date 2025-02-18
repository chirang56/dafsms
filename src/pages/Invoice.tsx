import React from 'react';
import { Download, Printer, Send } from 'lucide-react';

function Invoice() {
  const invoice = {
    number: 'INV-2024-001',
    date: '2024-02-20',
    dueDate: '2024-03-06',
    company: {
      name: 'Dairy Shop Inc.',
      address: '123 Dairy Street',
      city: 'New York, NY 10001',
      phone: '+1 234-567-8900',
      email: 'contact@dairyshop.com',
    },
    customer: {
      name: 'John Doe',
      company: 'Local Cafe',
      address: '456 Coffee Lane',
      city: 'New York, NY 10002',
      email: 'john@localcafe.com',
    },
    items: [
      { description: 'Fresh Milk 1L', quantity: 50, price: 2.99, total: 149.50 },
      { description: 'Greek Yogurt 500g', quantity: 30, price: 4.50, total: 135.00 },
      { description: 'Cheddar Cheese 250g', quantity: 20, price: 6.99, total: 139.80 },
      { description: 'Butter 500g', quantity: 15, price: 3.99, total: 59.85 },
    ],
    subtotal: 484.15,
    tax: 48.42,
    total: 532.57,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Invoice #{invoice.number}</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5" />
            Download
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Printer className="w-5 h-5" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Send className="w-5 h-5" />
            Send Invoice
          </button>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        {/* Company and Customer Info */}
        <div className="flex justify-between pb-8 border-b">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">{invoice.company.name}</h2>
            <div className="mt-2 text-gray-600">
              <p>{invoice.company.address}</p>
              <p>{invoice.company.city}</p>
              <p>{invoice.company.phone}</p>
              <p>{invoice.company.email}</p>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold">Invoice To:</h3>
            <div className="mt-2 text-gray-600">
              <p className="font-medium">{invoice.customer.name}</p>
              <p>{invoice.customer.company}</p>
              <p>{invoice.customer.address}</p>
              <p>{invoice.customer.city}</p>
              <p>{invoice.customer.email}</p>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-8 py-8 border-b">
          <div>
            <p className="text-gray-600">Invoice Number:</p>
            <p className="font-medium">{invoice.number}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Invoice Date:</p>
            <p className="font-medium">{invoice.date}</p>
          </div>
          <div>
            <p className="text-gray-600">Due Date:</p>
            <p className="font-medium">{invoice.dueDate}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Status:</p>
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              Pending
            </span>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-8">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-4 text-gray-600">Description</th>
                <th className="pb-4 text-gray-600">Quantity</th>
                <th className="pb-4 text-gray-600">Price</th>
                <th className="pb-4 text-right text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody className="border-t">
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{item.description}</td>
                  <td className="py-4">{item.quantity}</td>
                  <td className="py-4">${item.price.toFixed(2)}</td>
                  <td className="py-4 text-right">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-8 w-80 ml-auto">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (10%):</span>
              <span className="font-medium">${invoice.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t font-bold text-lg">
              <span>Total:</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-8 pt-8 border-t">
          <h4 className="font-medium mb-2">Notes:</h4>
          <p className="text-gray-600">
            Thank you for your business. Please make payment within 15 days of receiving this invoice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Invoice;