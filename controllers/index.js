const Books = require('../models/books');
const People = require('../models/peoples');
const AdminBlog = require('../models/blogs');
const Category = require('../models/categoriesbook');

module.exports = {
    async homePage(req, res) {
        const categories = await Category.find({});
        const books = await Books.aggregate([{$limit: 8}]);
        const peoples = await People.aggregate([{$limit: 12}]);
        const blogs = await AdminBlog.aggregate([{$limit: 4}]);
        res.render('home', { title: 'Readers Club', books, peoples, categories, blogs });
    }
}
