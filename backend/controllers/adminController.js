const Order = require("../models/orderModel");
const Medicine = require("../models/medicineModel");
const User = require("../models/user");

const getDashboardStats = async (req, res) => {
  try {

    const totalOrders = await Order.countDocuments();
    const totalMedicines = await Medicine.countDocuments();
    const totalUsers = await User.countDocuments();

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;

    res.status(200).json({
      totalOrders,
      totalMedicines,
      totalUsers,
      totalRevenue
    });

  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardStats };