const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    publishedDate: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    author:{
        type: String,
        default: ""
    },
    Buylink:{
        type: String,
        default: ""
    },
    image:{
        type: String,
        default: ""
    },
    category:{
        type: String,
        default: ""
    },
    slug:{
        type: String,
        default: ""
    },
    rating:{
        type: Number,
        default: 0
    },
    recommendedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'Peoples'
    }],
});
const Books = mongoose.model('Books', BookSchema);
module.exports = Books; 

