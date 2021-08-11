const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isAdmin } = require('../middleware/middleware');
const { getRegister, postRegister, getLogin, postLogin, getLogout, adminDashboard, adminCategory, adminBook, adminPeople, adminBlogs, newBlogs, postBlogs, blogsPage, getBlog, editBlogs, updateBlog, deleteBlog } = require('../controllers/admin');

/* GET /register */
//router.get('/register', getRegister);
  
/*POST /register */
//router.post('/register', asyncErrorHandler(postRegister));
  
/* GET /login */
router.get('/login', getLogin);
  
/* POST /login */
router.post('/login', asyncErrorHandler(postLogin));
  
/* GET /logout */
router.get('/logout', getLogout);

router.get('/admin', isAdmin, asyncErrorHandler(adminDashboard));
router.get('/admin/category', isAdmin, asyncErrorHandler(adminCategory));
router.get('/admin/book', isAdmin, asyncErrorHandler(adminBook));
router.get('/admin/people', isAdmin, asyncErrorHandler(adminPeople));

router.get('/admin/blogs', isAdmin, asyncErrorHandler(adminBlogs));

router.get('/newBlogs', isAdmin, newBlogs);

router.post('/adminBlogs', isAdmin, asyncErrorHandler(postBlogs));

router.get('/blogs', asyncErrorHandler(blogsPage));

router.get('/blogs/:id', asyncErrorHandler(getBlog));

router.get('/editBlogs/:blogId', isAdmin, asyncErrorHandler(editBlogs));

router.put('/updateBlog/:blogId', isAdmin, asyncErrorHandler(updateBlog));

router.delete('/deleteBlog/:blogId', isAdmin, asyncErrorHandler(deleteBlog));


module.exports = router;

