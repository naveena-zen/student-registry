const Student = require('../models/studentModel');

exports.getStudents = async (req, res) => {
  try {
    res.status(200).json(await Student.find());
  } catch (e) { res.status(404).json({ message: e.message }); }
};

exports.getspecStudent = async (req, res) => {
  try {
    res.status(200).json(await Student.findOne({ roll: req.params.roll }));
  } catch (e) { res.status(404).json({ message: e.message }); }
};

exports.createstudent = async (req, res) => {
  try {
    res.status(201).json(await Student.create(req.body));
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.updatestudent = async (req, res) => {
  try {
    res.status(200).json(await Student.findByIdAndUpdate(req.params.roll, req.body, { new: true }));
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.deletestudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.roll);
    res.status(200).json({ message: 'Deleted' });
  } catch (e) { res.status(400).json({ message: e.message }); }
};