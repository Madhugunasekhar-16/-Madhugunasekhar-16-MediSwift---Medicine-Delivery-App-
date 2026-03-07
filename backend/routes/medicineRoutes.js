const express = require("express");
const router = express.Router();

const { addMedicine, getAllMedicines, updateMedicine, deleteMedicine } = require("../controllers/medicineController.js");
const { protect, adminOnly } = require("../middleware/authMiddleware.js");

//addmedicine for admin
router.post("/", protect, adminOnly, addMedicine );

//getmedicines for public
router.get("/", getAllMedicines);

//update medicine
router.put("/:id", protect, adminOnly, updateMedicine);


//delete medicine
router.delete("/:id", protect, adminOnly, deleteMedicine);


module.exports = router;
