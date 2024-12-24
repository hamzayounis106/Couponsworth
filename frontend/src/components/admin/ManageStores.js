import React, { useState, useEffect } from "react";
import StoreForm from "./StoreForm";
import SingleStoreAdmin from "./SingleStoreAdmin";
import "./ManageStores.css";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import useGetStores from "../hooks/useGetStores";
import useDeleteStore from "../hooks/useDeleteStore";
import CustomModal from "../Model";

const ManageStores = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [view, setView] = useState("list");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterShipping, setFilterShipping] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);

  const { data: allStores, isLoading, isError, error } = useGetStores();
  const deleteStoreMutation = useDeleteStore();

  useEffect(() => {
    if (allStores) {
      setStores(allStores);
      setFilteredStores(allStores);
    }
  }, [allStores]);

  const handleEdit = (store) => {
    setSelectedStore(store);
    setView("form");
  };

  const handleDelete = (id) => {
    setStoreToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (storeToDelete) {
      deleteStoreMutation.mutate(storeToDelete, {
        onSuccess: () => {
          setStores((prev) => prev.filter((store) => store._id !== storeToDelete));
          setFilteredStores((prev) => prev.filter((store) => store._id !== storeToDelete));
        },
      });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterStores(query, filterStatus, filterShipping);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    filterStores(searchQuery, status, filterShipping);
  };

  const handleShippingFilter = (shippingStatus) => {
    setFilterShipping(shippingStatus);
    filterStores(searchQuery, filterStatus, shippingStatus);
  };

  const filterStores = (query, status, shippingStatus) => {
    let filtered = stores;

    if (query) {
      filtered = filtered.filter((store) =>
        store.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status !== "All") {
      filtered = filtered.filter((store) => store.status === status);
    }

    if (shippingStatus !== "All") {
      filtered = filtered.filter(
        (store) =>
          (shippingStatus === "Free Shipping" && store.freeShipping) ||
          (shippingStatus === "Paid Shipping" && !store.freeShipping)
      );
    }

    setFilteredStores(filtered);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 manage-stores">
      {view === "list" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Manage Stores</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search stores..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <FiSearch className="absolute text-gray-500 top-2 right-2" />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => handleFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select
                value={filterShipping}
                onChange={(e) => handleShippingFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="All">All Shipping</option>
                <option value="Free Shipping">Free Shipping</option>
                <option value="Paid Shipping">Paid Shipping</option>
              </select>
              <Link to="/admin/store/add-store">
                <button className="flex items-center px-4 py-2 text-sm text-white bg-blue-500 rounded shadow hover:bg-blue-600">
                  <AiOutlinePlus className="mr-2" /> Add Store
                </button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredStores?.map((store) => (
              <SingleStoreAdmin
                key={store._id}
                store={store}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
      {view === "form" && (
        <StoreForm
          store={selectedStore}
          onClose={() => {
            setSelectedStore(null);
            setView("list");
          }}
        />
      )}
      
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        message="Are you sure you want to delete this store?"
      />
    </div>
  );
};

export default ManageStores;
