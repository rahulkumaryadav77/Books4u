const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/middleware');
const { bookCategory, updateCategory, deleteCategory, addBookCategory, getAllBooks, recommendedBooks, bookForm, newBooks, getBookByCat, bookDetails, editBook, updateBook, deleteBook } = require('../controllers/books');

// router.get('/addCategory', bookCategory);
router.post('/addCategory', asyncErrorHandler(addBookCategory));
router.put('/updateCategory/:catId', asyncErrorHandler(updateCategory));
router.delete('/deleteCategory/:catId', asyncErrorHandler(deleteCategory))

router.get('/addBooks', bookForm);
router.get('/allBooks', asyncErrorHandler(getAllBooks));
router.get('/mostRecommendedBooks', asyncErrorHandler(recommendedBooks));
router.post('/newBooks', asyncErrorHandler(newBooks));
router.get('/allBooks/:category', getBookByCat);
router.get('/allBooks/:category/:slug', asyncErrorHandler(bookDetails));
router.get('/editBook/:slug', asyncErrorHandler(editBook));
router.put('/updateBook/:slug', asyncErrorHandler(updateBook));
router.delete('/deleteBook/:slug', asyncErrorHandler(deleteBook));

module.exports = router;

