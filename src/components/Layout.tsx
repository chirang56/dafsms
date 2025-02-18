import React, { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Milk, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  FileText,
  Bell,
  User
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/invoice', icon: FileText, label: 'Invoice' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
          <div className="flex items-center mb-8 justify-between">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <Milk className="h-8 w-8" />
              DairyAdmin
            </h2>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X className="h-6 w-6" />
            </button>
          </div>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                    location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`p-4 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Bar */}
        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 ml-4">
            <input
              type="search"
              className="w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6 text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Admin User</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;