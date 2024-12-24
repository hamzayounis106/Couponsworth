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
      <aside className='flex-shrink-0 w-64 p-4 text-white bg-purple-800 shadow-lg'>
        <h1 className='mb-4 text-xl font-bold text-center text-white'>
          Admin Dashboard
        </h1>
        <nav>
          <ul className='space-y-2'>
            {/* Sidebar menu links */}
            <li>
              <Link
                to='/admin/manage-users'
                className='flex items-center px-3 py-2 space-x-2 transition-colors rounded-lg hover:bg-purple-700'
              >
                <span>Manage Users</span>
              </Link>
            </li>
            <li>
              <Link
                to='/admin/store'
                className='flex items-center px-3 py-2 space-x-2 transition-colors rounded-lg hover:bg-purple-700'
              >
                <span>Manage Stores</span>
              </Link>
            </li>
            <li>
              <Link
                to='/admin/categories'
                className='flex items-center px-3 py-2 space-x-2 transition-colors rounded-lg hover:bg-purple-700'
              >
                <span>Manage Categories</span>
              </Link>
            </li>
            <li>
              <Link
                to='/admin/messages'
                className='flex items-center px-3 py-2 space-x-2 transition-colors rounded-lg hover:bg-purple-700'
              >
                <span>Manage Messages</span>
              </Link>
            </li>
            <li>
              <Link
                to='/admin/coupons'
                className='flex items-center px-3 py-2 space-x-2 transition-colors rounded-lg hover:bg-purple-700'
              >
                <span>Manage Coupons</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-4 overflow-y-auto bg-purple-100'>
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
