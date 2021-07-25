const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({
	email: {
        type: String,
        unique: true,
        required: true
    }
});

adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;