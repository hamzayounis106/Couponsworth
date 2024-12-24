import React, { useEffect, useState } from "react";
import useGetCoupons from "../hooks/useGetCoupons";
import useAddStore from "../hooks/useAddStore";

const AddStore = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    logo: null,
    websiteUrl: "",
    description: "",
    selectedCoupons: [],
    status: "active",
    additionalDetails: "",
    pointsToKnow: "",
    freeShipping: false,
    isTrending: false,
    memberDiscount: false,
    militaryDiscount: false,
  });
  const [error, setError] = useState("");
  const { data: allCoupons = [], isLoading: isCouponsFetching } =
    useGetCoupons();

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      // For boolean fields, set true or false based on whether the checkbox is checked
      setFormData({
        ...formData,
        [name]: true,
      });
    } else if (name === "logo") {
      // Handle file input (logo)
      setFormData({
        ...formData,
        logo: files[0],
      });
    } else {
      // For other fields, update as usual
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCouponSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCoupons = allCoupons?.filter((coupon) =>
    coupon.code?.toLowerCase().includes(searchQuery.toLowerCase())
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
  const {
    mutate: addStore,
    isLoading: addingStoreLoading,
    isSuccess: isAddStoreSuccess,
    isError: isAddStoreError,
    error: addStoreError, // capture the error directly
  } = useAddStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.selectedCoupons.length === 0) {
      setError("Please select at least one coupon");
      return;
    }
    if (formData.logo === null) {
      setError("Please upload a logo");
      return;
    }
    if (formData.websiteUrl === "") {
      setError("Please enter a website URL");
      return;
    }
    if (formData.description === "") {
      setError("Please enter a description");
      return;
    }
    if (formData.pointsToKnow === "") {
      setError("Please enter points to know");
      return;
    }

    const storeData = new FormData();
    storeData.append("storeName", formData.storeName);
    storeData.append("logo", formData.logo);
    storeData.append("websiteUrl", formData.websiteUrl);
    storeData.append("description", formData.description);
    storeData.append("selectedCoupons", formData.selectedCoupons);
    storeData.append("status", formData.status);
    storeData.append("additionalDetails", formData.additionalDetails);
    storeData.append("pointsToKnow", formData.pointsToKnow);
    storeData.append("freeShipping", formData.freeShipping);
    storeData.append("isTrending", formData.isTrending);
    storeData.append("memberDiscount", formData.memberDiscount);
    storeData.append("militaryDiscount", formData.militaryDiscount);
    console.log(formData.selectedCoupons);
    setError("");
    // Add the store and handle success/error callbacks directly
    addStore(storeData, {
      onSuccess: () => {
        console.log("storeData",storeData);
        console.log("Store details submitted successfully!");
        // You can reset or update UI here if necessary
      },
      onError: (error) => {
        console.log("",storeData);
        console.error("Error uploading store:", error);
        setError(addStoreError.message);
      },
    });
  };

  // Handling loading and success/error state outside of the submit function
  if (addingStoreLoading) {
    console.log("Uploading store...");
  } else if (isAddStoreSuccess) {
    console.log("Store uploaded successfully!");
  } else if (isAddStoreError) {
    console.log("Error uploading store:", addStoreError);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Add New Store
        </h2>
        {error && (
          <p className="p-3 text-sm text-center text-red-500 bg-red-100 rounded-lg">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Store Name
            </label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              placeholder="Enter store name"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400"
            />
          </div>

          {/* Upload Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Upload Logo
            </label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400"
            />
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Website URL
            </label>
            <input
              type="text"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="Enter website URL"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400"
            />
          </div>

          {/* Status (Radio Buttons) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Status
            </label>
            <div className="flex items-center mt-2 space-x-4">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === "Active"}
                  onChange={handleChange}
                  className="text-purple-600 focus:ring-purple-400"
                />
                <span>Active</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleChange}
                  className="text-purple-600 focus:ring-purple-400"
                />
                <span>Inactive</span>
              </label>
            </div>
          </div>

          {/* Coupons Modal Trigger */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Selected Coupons
            </label>
            <button
              type="button"
              onClick={() => setShowCouponModal(true)}
              className="w-full py-3 mt-1 text-white transition bg-purple-600 rounded-lg shadow-md hover:bg-purple-700"
            >
              {formData.selectedCoupons.length > 0
                ? `${formData.selectedCoupons.length} Coupons Selected`
                : "Select Coupons"}
            </button>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the store"
              rows="3"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400"
            ></textarea>
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Additional Details
            </label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder="Additional information about the store"
              rows="2"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400"
            ></textarea>
          </div>

          {/* Points to Know */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Points to Know
            </label>
            <input
              type="text"
              name="pointsToKnow"
              value={formData.pointsToKnow}
              onChange={handleChange}
              placeholder="e.g., Free returns, Discounts"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-400"
            />
          </div>

          {/* Boolean Options */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Free Shipping", name: "freeShipping" },
              { label: "Trending", name: "isTrending" },
              { label: "Member Discount", name: "memberDiscount" },
              { label: "Military Discount", name: "militaryDiscount" },
            ].map((option) => (
              <label
                key={option.name}
                className="flex items-center space-x-3 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  name={option.name}
                  checked={formData[option.name]}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-400"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            {error && (
              <p className="p-3 text-sm text-center text-red-500 bg-red-100 rounded-lg">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 mt-4 text-white transition bg-purple-600 rounded-lg shadow-md hover:bg-purple-700"
            >
              {" "}
              {addingStoreLoading ? "Loading......" : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Coupons Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 transition-all duration-300 transform scale-95 bg-white rounded-lg shadow-xl hover:scale-100">
            <button
              onClick={() => setShowCouponModal(false)}
              className="absolute text-gray-600 top-4 right-4 hover:text-gray-800 focus:outline-none"
            >
              &times;
            </button>
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
              Select Coupons
            </h3>

            <input
              type="text"
              placeholder="Search coupons..."
              value={searchQuery}
              onChange={handleCouponSearch}
              className="w-full p-3 mb-4 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />

            <div className="flex flex-col p-3 space-y-3 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-inner max-h-64">
              {isCouponsFetching ? (
                <p className="text-center text-gray-500">Loading coupons...</p>
              ) : filteredCoupons?.length > 0 ? (
                filteredCoupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="flex flex-col p-3 space-y-2 border-b border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">Code:</span>
                      <span className="text-gray-600">{coupon.code}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">
                        Discount:
                      </span>
                      <span className="text-gray-600">{coupon.discount}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">
                        Expiry Date:
                      </span>
                      <span className="text-gray-600">
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">
                        Status:
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          coupon.status === "Active"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {coupon.status}
                      </span>
                    </div>
                    <label className="flex items-center w-full p-3 space-x-4 transition-all duration-200 ease-in-out rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={formData.selectedCoupons.includes(coupon._id)}
                        onChange={() => handleCouponSelection(coupon._id)}
                        className="w-5 h-5 text-purple-600 border-gray-300 rounded-sm focus:ring-2 focus:ring-purple-400"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Select this coupon
                      </span>
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No coupons available.
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowCouponModal(false)}
                className="w-full py-3 text-white transition-all duration-300 transform bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none active:scale-95"
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
