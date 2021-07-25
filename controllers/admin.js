const Books = require('../models/books');
const People = require('../models/peoples');
const Category = require('../models/categoriesbook');
const AdminBlog = require('../models/blogs');
const User = require('../models/admin');

module.exports = {
    async getRegister(req, res) {
        res.render('admin/adminRegister', { title: 'Register' });
    },
    async postRegister(req, res, next) { 
        try {
            const user = await User.register(new User(req.body), req.body.password);
            req.login(user, function(err) {
                if(err) {
                    req.flash('error', 'Oops, something went wrong !')
                    return res.redirect('/register');
                }
                // req.flash('success', 'Welcome Admin');
                res.redirect('/admin');
            });
        } catch(err) {
            const { username, email } = req.body;
            let error = err.message;
            if (error.includes('duplicate') && error.includes('index: email_1 dup key')) {
                error = 'A user with the given email is already registered !';
            }
            res.render('admin/adminRegister', { title: 'Register', username, email, error })
        }
    },
    async getLogin(req, res) {
        res.render('admin/adminLogin', { title: 'Login' });
    },
    async postLogin(req, res, next) {
        const { username, password } = req.body;
        const { user, error } = await User.authenticate()(username, password);
        if(!user && error) {
            next(error);
            req.flash('error', 'Please enter valid username or password !');
            return res.redirect('/login');
        }
        req.login(user, function(err) {
            if (err) {
                req.flash('error', 'Please enter valid username or password !');
                return res.redirect('/login');
            };
            res.redirect('/admin');
        });
    },
    getLogout(req, res, next) {
        req.logout();
        // req.flash('success', 'Logged out successfully!');
        res.redirect('/');
    },
    async adminDashboard(req, res) {
        const categories = await Category.find({});
        const books = await Books.find({});
        const peoples = await People.find({});
        const blogs = await AdminBlog.find({});
        res.render('admin/dashboard', { title: 'Admin', categories, books, peoples, blogs });
    },
    async adminCategory(req, res) {
        const categories = await Category.find({});
        res.render('admin/category', { title: 'Admin', categories });
    },
    async adminBook(req, res) {
        const books = await Books.find({});
        res.render('admin/book', { title: 'Admin', books });
    },
    async adminPeople(req, res) {
        const people = await People.find({});
        res.render('admin/people', { title: 'Admin', people });
    },
    async adminBlogs(req, res) {
        const blogs = await AdminBlog.find({});
        res.render('admin/blogs', { title: 'Admin', blogs });
    },
    newBlogs(req, res) {
        res.render('blogs/newBlog', { title: 'Blogs' });
    },
    async postBlogs(req, res) {
        const blogs = await new AdminBlog();
        blogs.blogTitle = req.body.title;
        blogs.blogDescription = req.body.description;
        blogs.blogImage = req.body.image;
        blogs.blogAuthor = req.body.author;
        await blogs.save();
        req.flash('success', 'Blog created successfully!');
        res.redirect('/admin/blogs');
    },
    async blogsPage(req, res) {
        const blogs = await AdminBlog.find({ });
        res.render('blogs/blogsPage', { title: "Blogs", blogs });
    },
    async getBlog(req, res) {
        const blog = await AdminBlog.findById(req.params.id);
        res.render('blogs/showBlog', { title: "Blogs", blog });
    },
    async editBlogs(req, res) {
        const blog = await AdminBlog.findById(req.params.blogId);
        res.render('blogs/editBlog', { title: 'Blogs', blog });
    },
    async updateBlog(req, res) {
        const blogs = await AdminBlog.findById(req.params.blogId);
        blogs.blogTitle = req.body.title;
        blogs.blogDescription = req.body.description;
        blogs.blogImage = req.body.image;
        blogs.blogAuthor = req.body.author;
        await blogs.save();
        req.flash('success', 'Blog updated successfully!');
        res.redirect('/admin/blogs');
    },
    async deleteBlog(req, res) {
        await AdminBlog.findByIdAndDelete(req.params.blogId);
        req.flash('success', 'Blog deleted successfully!');
        res.redirect('/admin/blogs');
    }
}