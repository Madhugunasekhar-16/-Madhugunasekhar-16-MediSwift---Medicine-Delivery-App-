const Medicine = require("../models/medicineModel.js");

const addMedicine = async (req, res) => {
  try {
    const { name, category, description, price, stock, prescriptionRequired, expiryDate } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path; 
    }

    const newMedicine = await Medicine.create({
      name,category, description, price, stock,
      prescriptionRequired, expiryDate,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Medicine is created Successfully",
      medicine: newMedicine,
    });
  } catch (error) {
    console.error("Add Medicine error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json({ count: medicines.length, medicines });
  } catch (error) {
    console.error("Get Medicines Error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.status(200).json(medicine);
  } catch (error) {
    console.error("Get medicine error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine is not found" });

    const imageUrl = req.file ? req.file.path : medicine.image;

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageUrl },
      { new: true }
    );

    res.status(200).json({
      message: "Medicine is updated successfully",
      medicine: updatedMedicine,
    });
  } catch (error) {
    console.error("Update medicine error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    await medicine.deleteOne();
    res.status(200).json({ message: "Medicine deleted Successfully" });
  } catch (error) {
    console.error("Delete Medicine error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addMedicine, getAllMedicines, getMedicineById, updateMedicine, deleteMedicine };