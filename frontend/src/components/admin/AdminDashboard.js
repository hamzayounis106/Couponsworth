import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Messages from './Messages';
import CategoryManagement from './CategoryManagement';
import ManageStores from './ManageStores';
import ManageUsers from './ManageUsers';
import Store from './Store';
import Coupons from './Coupons';
import AddStore from './AddStore';
import DeletStore from './DeletStore';
import Addcoupons from './Addcoupons';

const AdminDashboard = () => {
  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <aside className='bg-purple-800 w-64 text-white p-4 shadow-lg flex-shrink-0'>
        <h1 className='text-xl font-bold mb-4 text-center text-white'>
          Admin Dashboard
        </h1>
        <nav>
          <ul className='space-y-2'>
            {/* Sidebar menu links */}
            <li>
              <Link
                to='/admin/manage-users'
                className='flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors'
              >
                <span>Manage Users</span>
              </Link>
            </li>
            <li>
              <Link
                to='/admin/store'
                className='flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors'
              >
                <span>Manage Stores</span>
              </Link>
            </li>
            <li>
              <Link
                to='/admin/categories'
                className='flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors'
              >
                <span>Manage Categories</span>
              </Link>
            </li>
            <li>
              <Link
                to='/admin/messages'
                className='flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors'
              >
                <span>Manage Messages</span>
              </Link>
            </li>
            <li>
              <Link
                to='/admin/coupons'
                className='flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors'
              >
                <span>Manage Coupons</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 bg-purple-100 p-4 overflow-y-auto'>
        <Routes>
          <Route path='/manage-users' element={<ManageUsers />} />
          <Route path='/store' element={<ManageStores />} />
          <Route path='/categories' element={<CategoryManagement />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/coupons' element={<Coupons />} />
          <Route path='/store/add-store' element={<AddStore />} />
          <Route path='/store/deletstore' element={<DeletStore />} />
          <Route path='/coupons/addcoupons' element={<Addcoupons />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
