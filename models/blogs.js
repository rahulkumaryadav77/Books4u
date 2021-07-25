const mongoose = require('mongoose');

const adminBlogSchema = new mongoose.Schema({
    blogTitle: {
        type: String
    },
    blogDescription: {
        type: String
    },
    blogImage: {
        type: String
    },
    blogAuthor: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const AdminBlog = mongoose.model('AdminBlog', adminBlogSchema);

module.exports = AdminBlog;