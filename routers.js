const express = require('express');
const router = express.Router();
const Act = require('./controllers/students');

router.get('/', Act.getStudents);
router.get('/:roll', Act.getspecStudent);
router.post('/', Act.createstudent);
router.patch('/:roll', Act.updatestudent);
router.delete('/:roll', Act.deletestudent);

module.exports = router;