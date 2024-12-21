import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const Addcoupons = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    logoUrl: '',
    websiteUrl: '',
    status: 'active',
    categories: [],
    description: '',
    additionalDetails: '',
    pointsToKnow: '',
    promotions: [],
  });

  const [categoriesList, setCategoriesList] = useState([]); // Dynamic categories from API
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories from the API
  const getAllData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/categories`
      );
      setCategoriesList(res.data); // Assuming the API returns an array of categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [key]: checked
        ? [...prev[key], value]
        : prev[key].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/coupons`,
        formData
      );
      console.log('Coupon created:', res.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error creating coupon:', error);
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className='flex items-start'>
        <section className='bg-white w-[60%] p-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-8'>
          <h2 className='text-3xl font-bold mb-6 text-center text-gray-700'>
            Add New Coupons
          </h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Store Name
                </label>
                <input
                  type='text'
                  name='storeName'
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder='Enter Store Name'
                  className='p-3 border rounded w-full focus:ring focus:ring-purple-300'
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Logo URL
                </label>
                <input
                  type='text'
                  name='logoUrl'
                  value={formData.logoUrl}
                  onChange={handleChange}
                  placeholder='Logo URL'
                  className='p-3 border rounded w-full focus:ring focus:ring-purple-300'
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Website URL
                </label>
                <input
                  type='text'
                  name='websiteUrl'
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder='Website URL'
                  className='p-3 border rounded w-full focus:ring focus:ring-purple-300'
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-1'>
                  Status
                </label>
                <select
                  name='status'
                  value={formData.status}
                  onChange={handleChange}
                  className='p-3 border rounded w-full focus:ring focus:ring-purple-300'
                >
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
                {categoriesList.map((category) => (
                  <label
                    key={category.id}
                    className='flex items-center space-x-2'
                  >
                    <input
                      type='checkbox'
                      value={category.name}
                      checked={formData.categories.includes(category.name)}
                      onChange={(e) => handleCheckboxChange(e, 'categories')}
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-1'>
                Description
              </label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Store description here'
                rows='4'
                className='p-3 border rounded w-full focus:ring focus:ring-purple-300'
              ></textarea>
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-1'>
                Additional Details
              </label>
              <textarea
                name='additionalDetails'
                value={formData.additionalDetails}
                onChange={handleChange}
                placeholder='Promotional Information'
                rows='3'
                className='p-3 border rounded w-full focus:ring focus:ring-purple-300'
              ></textarea>
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-1'>
                Points to Know (comma-separated)
              </label>
              <input
                type='text'
                name='pointsToKnow'
                value={formData.pointsToKnow}
                onChange={handleChange}
                placeholder='e.g., Free Shipping, Member Discounts'
                className='p-3 border rounded w-full focus:ring focus:ring-purple-300'
              />
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-2'>
                Promotions
              </label>
              <div className='flex flex-wrap gap-4'>
                {['Free Shipping', 'Member Discount', 'Special Promotion'].map(
                  (promo) => (
                    <label key={promo} className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        value={promo}
                        checked={formData.promotions.includes(promo)}
                        onChange={(e) => handleCheckboxChange(e, 'promotions')}
                      />
                      <span>{promo}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className='flex justify-end space-x-4'>
              <button
                type='submit'
                disabled={isLoading}
                className={`bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded transition font-medium ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Creating...' : 'Create Coupon'}
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
      </div>
    </Fragment>
  );
};

export default Addcoupons;
