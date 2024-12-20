import { v2 } from "cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";
import Store from "../models/StoreModel.js";
// Retrieve a store by name and calculate dynamic fields
const getStoreByName = async (req, res) => {
  try {
    const store = await Store.findOne({ name: req.params.name }).populate(
      "alternatives"
    );
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Calculate dynamic fields
    const totalCoupons = store.coupons.length;
    const activeCoupons = store.coupons.filter(
      (coupon) => !coupon.expiryDate || new Date(coupon.expiryDate) > new Date()
    ).length;
    const bestDiscount = Math.max(
      ...store.coupons.map((coupon) => coupon.discount || 0),
      0
    );

    res.status(200).json({
      store: {
        ...store.toObject(),
        totalCoupons,
        activeCoupons,
        bestDiscount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching store", error });
  }
};

// controllers/StoreController.js

const createStore = async (req, res) => {
  try {
    const {
      name,
      url,
      description,
      couponsIds,
      status,
      additionalDetails,
      pointsToKnow,
      freeShipping,
      isTrending,
      memberDiscount,
      militaryDiscount,
    } = req.body;
    const file = req.files?.image;
    console.log("file: ", file);
    console.log("name", name);
    console.log("couponsIds", couponsIds);
    console.log("memberDiscount", memberDiscount);
    if (!name || !url) {
      return res.status(400).json({ message: "Name and URL are required" });
    }

    const fileBase64 = `data:${file.mimetype};base64,${file.data.toString(
      "base64"
    )}`;

    let logoUrl = null;

    try {
      const result = await v2.uploader.upload(fileBase64, {
        folder: "User Profiles",
        resource_type: "auto",
      });
      logoUrl = result.secure_url;
    } catch (error) {
      return res.status(500).json({ message: "Error uploading image", error });
    }

    const newStore = new Store({
      name,
      logo: logoUrl,
      url,
      description,
      couponsIds,
      status,
      additionalDetails,
      pointsToKnow,
      freeShipping,
      isTrending,
      memberDiscount,
      militaryDiscount,
    });

    await newStore.save();

    res
      .status(201)
      .json({ message: "Store created successfully", store: newStore });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Store already exists with this name",
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all stores with sorting and calculate dynamic fields
// const getStores = async (req, res) => {
//   try {
//     const { sortBy } = req.query;
//     console.log("sort By: ", sortBy);
//     let sortOrder = {};
//     if (sortBy === "name") sortOrder = { name: 1 };
//     else if (sortBy === "category") sortOrder = { category: 1 };
//     else if (sortBy === "status") sortOrder = { status: 1 };
//     else sortOrder = { name: 1 };

//     const stores = await Store.find().sort(sortOrder);
//     console.log(stores);
//     const enrichedStores = stores.map((store) => {
//       const totalCoupons = store.coupons.length;
//       const activeCoupons = store.coupons.filter(
//         (coupon) =>
//           !coupon.expiryDate || new Date(coupon.expiryDate) > new Date()
//       ).length;
//       const bestDiscount = Math.max(
//         ...store.coupons.map((coupon) => coupon.discount || 0),
//         0
//       );

//       return {
//         ...store.toObject(),
//         totalCoupons,
//         activeCoupons,
//         bestDiscount,
//       };
//     });

//     res.status(200).json({ stores: enrichedStores });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching stores", error });
//   }
// };

const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    console.log(stores);
    res.status(200).json({ success: true, stores: stores });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching stores", error });
  }
};

// Retrieve a store by ID
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found" });
    }
    res.status(200).json({ success: true, store: store });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching store",
      error: error.message,
    });
  }
};

const updateStore = async (req, res) => {
  try {
    const {
      name,
      logo,
      url,
      description,
      category,
      categoryIconUrl, // Include categoryIconUrl in the update
      tags,
      status,
      rating,
      reviewCount,
      verified,
      region,
      popularityScore,
      contactInfo,
      totalCoupons,
      activeCoupons,
      bestDiscount,
      totalDeals,
      history,
      promotionalInfo,
      pointsToKnow,
      freeShipping,
      memberDiscount,
      militaryDiscount,
      faq,
      alternatives,
      popularStores,
      coupons,
      featuredCoupons,
      recommendedCoupons,
      isTrending,
    } = req.body;

    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      {
        name,
        logo,
        url,
        description,
        category,
        categoryIconUrl, // Add it here
        tags,
        status,
        rating,
        reviewCount,
        verified,
        region,
        popularityScore,
        contactInfo,
        totalCoupons,
        activeCoupons,
        bestDiscount,
        totalDeals,
        history,
        promotionalInfo,
        pointsToKnow,
        freeShipping,
        memberDiscount,
        militaryDiscount,
        faq,
        alternatives,
        popularStores,
        coupons,
        featuredCoupons,
        recommendedCoupons,
        isTrending,
      },
      { new: true, runValidators: true }
    );

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res
      .status(200)
      .json({ message: "Store updated successfully", store: updatedStore });
  } catch (error) {
    res.status(500).json({ message: "Error updating store", error });
  }
};

// Add coupons to a store
const addCoupons = async (req, res) => {
  try {
    const { id } = req.params;
    const { coupons } = req.body;

    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    store.coupons.push(...coupons);
    await store.save();

    res.status(200).json({ message: "Coupons added successfully", store });
  } catch (error) {
    res.status(500).json({ message: "Error adding coupons", error });
  }
};

// Delete a store by ID
const deleteStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting store", error });
  }
};

// Filter stores by name or category
const filterStores = async (req, res) => {
  try {
    const { filterBy, value } = req.query;

    let query = {};
    if (filterBy === "name") query = { name: new RegExp("^" + value, "i") };
    else if (filterBy === "category")
      query = { category: new RegExp("^" + value, "i") };

    const stores = await Store.find(query);
    res.status(200).json({ stores });
  } catch (error) {
    res.status(500).json({ message: "Error filtering stores", error });
  }
};

// Search stores or coupons
const searchStores = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query)
      return res.status(400).json({ message: "Search query is required" });

    const stores = await Store.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { "coupons.code": { $regex: query, $options: "i" } },
        { "coupons.description": { $regex: query, $options: "i" } },
        { faq: { $regex: query, $options: "i" } },
        { history: { $regex: query, $options: "i" } },
        { "alternatives.name": { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({ stores });
  } catch (error) {
    res.status(500).json({ message: "Error searching stores", error });
  }
};

export {
  createStore,
  getStores,
  getStoreByName,
  getStoreById,
  updateStore,
  deleteStore,
  filterStores,
  searchStores,
  addCoupons,
};
