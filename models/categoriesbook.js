const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriebookSchema = new Schema({
    title:{ 
        type: String,
        default:"",
    }, 
    slug: {
        type: String,
        default: ""
    }
});
module.exports = mongoose.model('bookCategory', CategoriebookSchema);