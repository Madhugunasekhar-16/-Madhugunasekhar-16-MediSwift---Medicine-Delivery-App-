const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const { addMedicine, getAllMedicines, updateMedicine, deleteMedicine } = require("../controllers/medicineController.js");
const { protect, adminOnly } = require("../middleware/authMiddleware.js");

//addmedicine for admin
router.post("/", protect, adminOnly, addMedicine );

router.post("/", protect, adminOnly, upload.single("image"), addMedicine);

//getmedicines for public
router.get("/", getAllMedicines);

//update medicine
router.put("/:id", protect, adminOnly, updateMedicine);


//delete medicine
router.delete("/:id", protect, adminOnly, deleteMedicine);


module.exports = router;
