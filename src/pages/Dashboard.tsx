import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { ShoppingCart, Package, Users, TrendingUp, AlertCircle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const stats = [
    { title: 'Total Sales', value: '$12,456', change: '+12%', icon: ShoppingCart },
    { title: 'Active Orders', value: '45', change: '+5%', icon: Package },
    { title: 'Total Customers', value: '1,234', change: '+8%', icon: Users },
    { title: 'Revenue', value: '$8,234', change: '+15%', icon: TrendingUp },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Fresh Milk 1L', amount: '$24.00', status: 'Delivered' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'Yogurt Pack', amount: '$18.50', status: 'Processing' },
    { id: '#ORD-003', customer: 'Mike Johnson', product: 'Cheese Block', amount: '$32.00', status: 'Pending' },
    { id: '#ORD-004', customer: 'Sarah Wilson', product: 'Butter 500g', amount: '$12.00', status: 'Delivered' },
  ];

  const lowStock = [
    { product: 'Fresh Milk 1L', stock: 15, threshold: 20 },
    { product: 'Greek Yogurt', stock: 8, threshold: 15 },
    { product: 'Cheese Slices', stock: 5, threshold: 10 },
  ];

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [3000, 4500, 4000, 6000, 5500, 7000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  const productPerformance = {
    labels: ['Milk', 'Yogurt', 'Cheese', 'Butter', 'Cream'],
    datasets: [
      {
        label: 'Units Sold',
        data: [450, 320, 280, 200, 180],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
      },
    ],
  };

  const categoryDistribution = {
    labels: ['Dairy', 'Cheese', 'Yogurt', 'Other'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(99, 102, 241, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <span className="text-sm text-green-500">{stat.change}</span>
              </div>
              <stat.icon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
          <Line 
            data={salesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </div>

        {/* Product Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Product Performance</h2>
          <Bar
            data={productPerformance}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3">{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3">{order.product}</td>
                    <td className="py-3">{order.amount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
          <div className="aspect-square">
            <Doughnut 
              data={categoryDistribution}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Low Stock Alert</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lowStock.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <h3 className="font-medium">{item.product}</h3>
                <p className="text-sm text-gray-500">
                  Current stock: {item.stock} units
                  <br />
                  Threshold: {item.threshold} units
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;