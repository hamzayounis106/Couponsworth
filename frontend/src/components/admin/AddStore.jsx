import { Fragment } from 'react';

const AddStore = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <section className='bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-8'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-700'>
          Add New Store
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Store Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>
                Store Name
              </label>
              <input
                type='text'
                placeholder='Enter Store Name'
                className='p-3 border rounded w-full focus:ring focus:ring-green-300'
              />
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>
                Logo URL
              </label>
              <input
                type='text'
                placeholder='Logo URL'
                className='p-3 border rounded w-full focus:ring focus:ring-green-300'
              />
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>
                Website URL
              </label>
              <input
                type='text'
                placeholder='Website URL'
                className='p-3 border rounded w-full focus:ring focus:ring-green-300'
              />
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-1'>
                Status
              </label>
              <select className='p-3 border rounded w-full focus:ring focus:ring-green-300'>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-2'>
              Categories
            </label>
            <div className='flex flex-wrap gap-4'>
              <label className='flex items-center space-x-2'>
                <input type='checkbox' />
                <span> A</span>
              </label>
              <label className='flex items-center space-x-2'>
                <input type='checkbox' />
                <span>B</span>
              </label>
            </div>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Description
            </label>
            <textarea
              placeholder='Store description here'
              rows='4'
              className='p-3 border rounded w-full focus:ring focus:ring-green-300'
            ></textarea>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Additional Details
            </label>
            <textarea
              placeholder='Promotional Information'
              rows='3'
              className='p-3 border rounded w-full focus:ring focus:ring-green-300'
            ></textarea>
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-1'>
              Points to Know (comma-separated)
            </label>
            <input
              type='text'
              placeholder='e.g., Free Shipping, Member Discounts'
              className='p-3 border rounded w-full focus:ring focus:ring-green-300'
            />
          </div>

          <div>
            <label className='block text-gray-700 font-medium mb-2'>
              Promotions
            </label>
            <div className='flex flex-wrap gap-4'>
              <label className='flex items-center space-x-2'>
                <input type='checkbox' />
                <span>Free Shipping is Trending</span>
              </label>
              <label className='flex items-center space-x-2'>
                <input type='checkbox' />
                <span>Member Discount</span>
              </label>
              <label className='flex items-center space-x-2'>
                <input type='checkbox' />
                <span>Special Promotion</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className='flex justify-end space-x-4'>
            <button
              type='submit'
              className='bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded transition font-medium'
            >
              Create Store
            </button>
            <button
              type='button'
              className='bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded transition font-medium'
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default AddStore;
