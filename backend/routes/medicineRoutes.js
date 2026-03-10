const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { addMedicine, getAllMedicines, getMedicineById, updateMedicine, deleteMedicine } = require("../controllers/medicineController.js");
const { protect, adminOnly } = require("../middleware/authMiddleware.js");

router.get("/", getAllMedicines);
router.get("/:id", getMedicineById); 

router.post("/", protect, adminOnly, upload.single("image"), addMedicine); 

router.put("/:id", protect, adminOnly, upload.single("image"), updateMedicine); 

router.delete("/:id", protect, adminOnly, deleteMedicine);

module.exports = router;