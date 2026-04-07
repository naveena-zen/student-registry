const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// ─── Database Connection ───────────────────────────────────────────────────────
const connect = mongoose.connect('mongodb://127.0.0.1:27017/test');

// ─── Student Model ─────────────────────────────────────────────────────────────
const studentSchema = mongoose.Schema({
  name:          { type: String,   required: true },
  roll:          { type: String,   required: true, unique: true },
  marks:         { type: Number,   required: true },
  subjects:      { type: [String], required: true },
  registered_on: { type: Date,     default: new Date() }
});
const Student = mongoose.model('studentdata', studentSchema);

// ─── Controllers ───────────────────────────────────────────────────────────────
const getStudents = async (req, res) => {
  try {
    res.status(200).json(await Student.find());
  } catch (e) { res.status(404).json({ message: e.message }); }
};

const getspecStudent = async (req, res) => {
  try {
    res.status(200).json(await Student.findOne({ roll: req.params.roll }));
  } catch (e) { res.status(404).json({ message: e.message }); }
};

const createstudent = async (req, res) => {
  try {
    res.status(201).json(await Student.create(req.body));
  } catch (e) { res.status(400).json({ message: e.message }); }
};

const updatestudent = async (req, res) => {
  try {
    res.status(200).json(
      await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (e) { res.status(400).json({ message: e.message }); }
};

const deletestudent = async (req, res) => {
  try {
    console.log('Delete ID:', req.params.id);
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (e) { res.status(400).json({ message: e.message }); }
};

// ─── Router ────────────────────────────────────────────────────────────────────
const router = express.Router();
router.get('/',       getStudents);
router.get('/:roll',  getspecStudent);
router.post('/',      createstudent);
router.patch('/:id',  updatestudent);
router.delete('/:id', deletestudent);

// ─── App ───────────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/students', router);

connect.then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => console.log('Running on port 3000'));
}).catch(console.log);
