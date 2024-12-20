import React, { useState } from 'react';

const AddStore = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    logoUrl: '',
    websiteUrl: '',
    description: '',
    selectedCoupons: [],
    status: 'active',
    additionalDetails: '',
    pointsToKnow: '',
    freeShipping: false,
    isTrending: false,
    memberDiscount: false,
    militaryDiscount: false,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const coupons = Array.from({ length: 50 }, (_, i) => ({
    id: `coupon${i + 1}`,
    name: `Coupon ${i + 1}`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const mockUpload = new Promise((resolve) => {
        setTimeout(() => {
          resolve(`https://example.com/uploads/${file.name}`);
        }, 1500);
      });

      const imageUrl = await mockUpload;
      setFormData({ ...formData, logoUrl: imageUrl });
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCouponSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCouponSelection = (couponId) => {
    if (formData.selectedCoupons.includes(couponId)) {
      setFormData({
        ...formData,
        selectedCoupons: formData.selectedCoupons.filter(
          (id) => id !== couponId
        ),
      });
    } else {
      setFormData({
        ...formData,
        selectedCoupons: [...formData.selectedCoupons, couponId],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Store details submitted successfully!');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl'>
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
          Add New Store
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Store Name */}
          <div>
            <label className='block text-sm font-medium text-gray-600'>
              Store Name
            </label>
            <input
              type='text'
              name='storeName'
              value={formData.storeName}
              onChange={handleChange}
              placeholder='Enter store name'
              className='w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400'
            />
          </div>

          {/* Upload Logo */}
          <div>
            <label className='block text-sm font-medium text-gray-600'>
              Upload Logo
            </label>
            <input
              type='file'
              onChange={handleImageUpload}
              className='w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400'
            />
            {isUploading && (
              <p className='text-sm text-purple-500 mt-2'>Uploading...</p>
            )}
            {formData.logoUrl && (
              <div className='mt-3'>
                <img
                  src={formData.logoUrl}
                  alt='Uploaded Logo'
                  className='h-16 w-auto rounded shadow-md'
                />
              </div>
            )}
          </div>

          {/* Website URL */}
          <div>
            <label className='block text-sm font-medium text-gray-600'>
              Website URL
            </label>
            <input
              type='text'
              name='websiteUrl'
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder='Enter website URL'
              className='w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400'
            />
          </div>

          {/* Status (Radio Buttons) */}
          <div>
            <label className='block text-sm font-medium text-gray-600'>
              Status
            </label>
            <div className='flex items-center space-x-4 mt-2'>
              <label className='flex items-center space-x-2 text-gray-700'>
                <input
                  type='radio'
                  name='status'
                  value='active'
                  checked={formData.status === 'active'}
                  onChange={handleChange}
                  className='text-purple-600 focus:ring-purple-400'
                />
                <span>Active</span>
              </label>
              <label className='flex items-center space-x-2 text-gray-700'>
                <input
                  type='radio'
                  name='status'
                  value='inactive'
                  checked={formData.status === 'inactive'}
                  onChange={handleChange}
                  className='text-purple-600 focus:ring-purple-400'
                />
                <span>Inactive</span>
              </label>
            </div>
          </div>

          {/* Coupons Modal Trigger */}
          <div>
            <label className='block text-sm font-medium text-gray-600'>
              Selected Coupons
            </label>
            <button
              type='button'
              onClick={() => setShowCouponModal(true)}
              className='w-full mt-1 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition'
            >
              {formData.selectedCoupons.length > 0
                ? `${formData.selectedCoupons.length} Coupons Selected`
                : 'Select Coupons'}
            </button>
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium text-gray-600'>
              Description
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Brief description of the store'
              rows='3'
              className='w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400'
            ></textarea>
          </div>

          {/* Additional Details */}
          <div>
            <label className='block text-sm font-medium text-gray-600'>
              Additional Details
            </label>
            <textarea
              name='additionalDetails'
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder='Additional information about the store'
              rows='2'
              className='w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400'
            ></textarea>
          </div>

          {/* Points to Know */}
          <div>
            <label className='block text-sm font-medium text-gray-600'>
              Points to Know
            </label>
            <input
              type='text'
              name='pointsToKnow'
              value={formData.pointsToKnow}
              onChange={handleChange}
              placeholder='e.g., Free returns, Discounts'
              className='w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400'
            />
          </div>

          {/* Boolean Options */}
          <div className='grid grid-cols-2 gap-4'>
            {[
              { label: 'Free Shipping', name: 'freeShipping' },
              { label: 'Trending', name: 'isTrending' },
              { label: 'Member Discount', name: 'memberDiscount' },
              { label: 'Military Discount', name: 'militaryDiscount' },
            ].map((option) => (
              <label
                key={option.name}
                className='flex items-center space-x-3 text-sm text-gray-700'
              >
                <input
                  type='checkbox'
                  name={option.name}
                  checked={formData[option.name]}
                  onChange={handleCheckboxChange}
                  className='h-4 w-4 text-purple-600 focus:ring-purple-400'
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          {/* Submit Button */}
          <div className='mt-6'>
            <button
              type='submit'
              className='w-full py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition'
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Coupons Modal */}
      {showCouponModal && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative'>
            <button
              onClick={() => setShowCouponModal(false)}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
            >
              &times;
            </button>
            <h3 className='text-xl font-bold text-gray-800 mb-4'>
              Select Coupons
            </h3>
            <input
              type='text'
              placeholder='Search coupons...'
              value={searchQuery}
              onChange={handleCouponSearch}
              className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring focus:ring-purple-400'
            />
            <div className='max-h-64 overflow-y-auto bg-green-700 flex flex-col justify-center border border-gray-300 rounded-lg p-3'>
              {filteredCoupons.map((coupon) => (
                <label
                  key={coupon.id}
                  className='flex items-center space-x-2 py-1 hover:bg-gray-100 cursor-pointer'
                >
                  <input
                    type='checkbox'
                    checked={formData.selectedCoupons.includes(coupon.id)}
                    onChange={() => handleCouponSelection(coupon.id)}
                    className='text-purple-600 focus:ring-purple-400'
                  />
                  <span className='text-gray-700 w-[10vw]'>{coupon.name}</span>
                </label>
              ))}
            </div>
            <div className='mt-4'>
              <button
                onClick={() => setShowCouponModal(false)}
                className='w-full py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition'
              >
                Save Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStore;
