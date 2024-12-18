import Coupon from "../models/CouponsModel.js";
// CREATE - Add a new coupon
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      description,
      expiryDate,
      discount,

      terms,
      validity,
      status,
    } = req.body;

    const newCoupon = new Coupon({
      code,
      description,
      expiryDate,
      discount,
      terms,
      validity,
      status,
    });

    await newCoupon.save();
    if (!newCoupon) {
      return res.status(400).json({ message: "Error creating coupon" });
    }
    return res
      .status(201)
      .json({ message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon code already exists" });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// READ - Get all coupons with optional filters
const getCoupons = async (req, res) => {
  try {
    const { status, storeId, categoryId } = req.query;

    let query = {};
    if (status) query.status = status;
    if (storeId) query.storeId = storeId;
    if (categoryId) query.categoryId = categoryId;

    const coupons = await Coupon.find(query);
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupons", error });
  }
};

// READ - Get a single coupon by ID
const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json({ coupon });
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupon", error });
  }
};

// UPDATE - Update coupon details by ID
// UPDATE - Update coupon details by ID
const updateCoupon = async (req, res) => {
  try {
    const {
      code,
      description,
      expiryDate,
      discount,
      terms,
      status,
    } = req.body;

    // Ensure the fields being updated are part of the schema
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      {
        ...(code && { code }),
        ...(description && { description }),
        ...(expiryDate && { expiryDate }),
        ...(discount && { discount }),
        ...(terms && { terms }),
        ...(status && { status }),
      },
      { new: true, runValidators: true } // Validate the new values
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res
      .status(200)
      .json({ message: "Coupon updated successfully", coupon: updatedCoupon });
  } catch (error) {
    res.status(500).json({ message: "Error updating coupon", error });
  }
};


// DELETE - Delete coupon by ID
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coupon", error });
  }
};

// FILTER - Filter coupons by parameters like status, store, category
const filterCoupons = async (req, res) => {
  try {
    const { status, storeId, categoryId } = req.query;

    let query = {};
    if (status) query.status = status;
    if (storeId) query.storeId = storeId;
    if (categoryId) query.categoryId = categoryId;

    const coupons = await Coupon.find(query);
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({ message: "Error filtering coupons", error });
  }
};

export {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  filterCoupons,
};
