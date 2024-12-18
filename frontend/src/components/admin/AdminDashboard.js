import React, { useState } from 'react';
import ManageUsers from './ManageUsers';
import ManageStores from './ManageStores';
// import ManageCoupons from "./ManageCoupons";
import CategoryManagement from './CategoryManagement';
import Messages from './Messages'; // Import Messages component
import {
  FiUsers,
  FiShoppingBag,
  FiFolderPlus,
  FiMail,
  FiTag,
} from 'react-icons/fi'; // Import icons
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [view, setView] = useState('users');

  return (
    <div className='admin-dashboard'>
      <div className='admin-dashboard-header'>
        <h1>Admin Dashboard</h1>
      </div>
      <div className='admin-dashboard-buttons'>
        <button onClick={() => setView('users')}>
          <FiUsers /> Manage Users
        </button>
        <Link to={'/admin/store'}>
          <button
            className='bg-blue-800 px-4 py-2 rounded'
            onClick={() => setView('stores')}
          >
            <FiShoppingBag /> Manage Stores
          </button>
        </Link>
        <Link to={'/admin/coupons'}>
          <button
            className='bg-blue-800 px-4 py-2 rounded'
            onClick={() => setView('stores')}
          >
            <FiShoppingBag /> Manage coupons
          </button>
        </Link>
        <button onClick={() => setView('categories')}>
          <FiFolderPlus /> Manage Categories
        </button>
        <button onClick={() => setView('messages')}>
          <FiMail /> Manage Messages
        </button>
      </div>
      <div className='admin-dashboard-content'>
        {view === 'users' && <ManageUsers />}
        {view === 'stores' && <ManageStores />}
        {/* {view === "coupons" && <ManageCoupons />} */}
        {view === 'categories' && <CategoryManagement />}
        {view === 'messages' && <Messages />}
      </div>
    </div>
  );
};

export default AdminDashboard;
