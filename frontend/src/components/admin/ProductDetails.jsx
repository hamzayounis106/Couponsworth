import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchedData = [
      {
        id: 1,
        storeName: 'Tech Store',
        logoURL: 'https://techstore.com',
        websiteURL: 'https://techstore.com',
        categories: 'Electronics, Gadgets',
        description: 'A store that sells top-tier electronics and gadgets.',
      },
      {
        id: 2,
        storeName: 'Fashion Hub',
        logoURL: 'https://techstore.com',
        websiteURL: 'https://fashionhub.com',
        categories: 'Clothing, Accessories',
        description: 'Trendy fashion and accessories for everyone.',
      },
    ];

    setProducts(fetchedData);
  }, []);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <Fragment>
      <div className='max-w-6xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg'>
        {/* Header */}
        <h1 className='text-center text-3xl font-bold text-gray-700 mb-6'>
          Product Details Section
        </h1>

        {/* Static Table */}
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-200 text-gray-700'>
                <th className='border border-gray-300 px-4 py-2'>ID</th>
                <th className='border border-gray-300 px-4 py-2'>Store Name</th>
                <th className='border border-gray-300 px-4 py-2'>Logo</th>
                <th className='border border-gray-300 px-4 py-2'>
                  Website URL
                </th>
                <th className='border border-gray-300 px-4 py-2'>Categories</th>
                <th className='border border-gray-300 px-4 py-2'>
                  Description
                </th>
                <th className='border border-gray-300 px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className='border border-gray-300 px-4 py-2 text-center'>
                      {product.id}
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      {product.storeName}
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      <img
                        src={product.logoURL}
                        alt={product.storeName}
                        className='h-12 w-12 object-cover rounded'
                      />
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      <a
                        href={product.websiteURL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:underline'
                      >
                        {product.websiteURL}
                      </a>
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      {product.categories}
                    </td>
                    <td className='border border-gray-300 px-4 py-2'>
                      {product.description}
                    </td>
                    <td className='border border-gray-300 px-4 py-2 flex gap-2'>
                      <Link
                        to={`/edit-product/${product.id}`}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan='7'
                    className='text-center py-4 text-gray-500 font-semibold'
                  >
                    No product details found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
