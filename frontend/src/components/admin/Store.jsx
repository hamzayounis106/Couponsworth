import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const Store = () => {
  return (
    <Fragment>
      <div className='p-6'>
        <h1 className='text-4xl font-bold text-center mb-6'>Admin Store</h1>

        <div className='flex justify-center space-x-4 mb-6'>
          <Link
            to={'/admin/store/addstore'}
            className='bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded transition'
          >
            Add Store
          </Link>
        </div>
      </div>
      <ProductDetails />
    </Fragment>
  );
};

export default Store;
