import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const Coupons = () => {
  return (
    <Fragment>
      <div className='flex'>
        <div className='flex flex-col'>
          <div className='p-6'>
            <h1 className='text-4xl font-bold text-center mb-6'> Coupons</h1>

            <div className='flex justify-center space-x-4 mb-6'>
              <Link
                to={'/admin/Coupons/addCoupons'}
                className='bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded transition'
              >
                Add Coupons
              </Link>
            </div>
          </div>
          <ProductDetails />
        </div>
      </div>
    </Fragment>
  );
};

export default Coupons;
