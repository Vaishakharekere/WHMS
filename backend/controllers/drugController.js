exports.getDrugs = (req, res) => {
  res.json({ message: "Drug controller working!" });
};
exports.addDrug = (req, res) => {
  res.json({ message: "Drug added successfully!" });
};
exports.updateDrug = (req, res) => {
  res.json({ message: "Drug updated successfully!" });
};
exports.deleteDrug = (req, res) => {
  res.json({ message: "Drug deleted successfully!" });
};
exports.getDrugById = (req, res) => {
  res.json({ message: `Drug with ID ${req.params.id} fetched successfully!` });
};
exports.getDrugsByCategory = (req, res) => {
  res.json({ message: `Drugs in category ${req.params.category} fetched successfully!` });
};
exports.getDrugsByName = (req, res) => {
  res.json({ message: `Drugs with name ${req.params.name} fetched successfully!` });
};
exports.getDrugsByManufacturer = (req, res) => {
  res.json({ message: `Drugs by manufacturer ${req.params.manufacturer} fetched successfully!` });
};
exports.getDrugsByDosageForm = (req, res) => {
  res.json({ message: `Drugs with dosage form ${req.params.dosageForm} fetched successfully!` });
};
