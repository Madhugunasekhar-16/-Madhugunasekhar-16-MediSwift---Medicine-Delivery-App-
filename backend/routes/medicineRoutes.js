const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { addMedicine, getAllMedicines, getMedicineById, updateMedicine, deleteMedicine } = require("../controllers/medicineController.js");
const { protect, adminOnly } = require("../middleware/authMiddleware.js");

router.get("/", getAllMedicines);
router.get("/:id", getMedicineById); //  needed for EditMedicine page

router.post("/", protect, adminOnly, upload.single("image"), addMedicine); //  single route only

router.put("/:id", protect, adminOnly, upload.single("image"), updateMedicine); //  supports image update

router.delete("/:id", protect, adminOnly, deleteMedicine);

module.exports = router;