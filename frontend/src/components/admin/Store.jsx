import { Fragment } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import ProductDetails from './ProductDetails';

import {
  FiFolderPlus,
  FiMail,
  FiShoppingBag,
  FiTag,
  FiUsers,
} from 'react-icons/fi';
import Coupons from './Coupons';

const Store = () => {
  const navItems = [
    {
      id: 'users',
      label: 'Manage Users',
      icon: <FiUsers />,
      path: '/admin/manage-users',
    },
    {
      id: 'stores',
      label: 'Manage Stores',
      icon: <FiShoppingBag />,
      path: '/admin/store',
    },
    {
      id: 'coupons',
      label: 'Manage Coupons',
      icon: <FiTag />,
      path: '/admin/coupons',
    },
    {
      id: 'categories',
      label: 'Manage Categories',
      icon: <FiFolderPlus />,
      path: '/admin/categories',
    },
    {
      id: 'messages',
      label: 'Manage Messages',
      icon: <FiMail />,
      path: '/admin/messages',
    },
  ];

  return (
    <Fragment>
      {/* Add Store Button */}
      <div className='p-6'>
        <h1 className='text-4xl font-bold text-center mb-6'>Store Section</h1>
        <div className='flex justify-center space-x-4 mb-6'></div>
      </div>

      {/* Product Details Section */}
      <ProductDetails />
    </Fragment>
  );
};

export default Store;
