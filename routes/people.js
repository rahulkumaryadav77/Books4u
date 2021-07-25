const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/middleware');
const { getAllPeople, peopleForm, newPeople, peopleDetails, editPeople, updatePeople, deletePeople } = require('../controllers/people');
  
router.get('/addPeople', peopleForm);
router.get('/allPeople', asyncErrorHandler(getAllPeople));
router.post('/newPeople', asyncErrorHandler(newPeople));
router.get('/allPeople/:name', asyncErrorHandler(peopleDetails));
router.get('/editPeople/:name', asyncErrorHandler(editPeople));
router.put('/updatePeople/:name', asyncErrorHandler(updatePeople));
router.delete('/deletePeople/:name', asyncErrorHandler(deletePeople));


module.exports = router;