import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

const SingleStoreAdmin = ({ store, onEdit, onDelete }) => {
  return (
    <div
      key={store._id}
      className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg"
    >
      <img
        src={store.logo}
        alt={`${store.name} logo`}
        className="object-cover w-full h-40"
      />
      <div className="flex flex-col justify-between flex-grow p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {store.name}
        </h2>
        <p className="mt-1 text-sm text-gray-600 truncate">
          {store.description}
        </p>
        <a
          href={`https://${store.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-sm underline "
        >
          Visit Website
        </a>
        <div className="mt-3">
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full shadow-sm transition-colors duration-300 ${{
              Active: "bg-green-100 text-green-800",
              Inactive: "bg-red-100 text-red-800",
            }[store.status] || "bg-gray-100 text-gray-800"}`}
          >
            {store.status}
          </span>
        </div>
        <div className="mt-4">
          <ul className="pl-5 mt-2 text-sm text-gray-600 list-disc">
            <li>Free Shipping: {store?.freeShipping ? "Yes" : "No"}</li>
            <li>Trending: {store.isTrending ? "Yes" : "No"}</li>
            <li>Member Discount: {store.memberDiscount ? "Yes" : "No"}</li>
            <li>Military Discount: {store.militaryDiscount ? "Yes" : "No"}</li>
          </ul>
        </div>
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => onEdit(store)}
            className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 border rounded "
          >
            <FiEdit className="mr-2" />
          </button>
          <button
            onClick={() => onDelete(store._id)}
            className="flex items-center px-3 py-2 text-sm font-medium text-red-600 border border-red-600 rounded "
          >
            <FiTrash className="mr-2" /> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleStoreAdmin;
