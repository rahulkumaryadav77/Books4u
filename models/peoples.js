const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    field: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    recomendation: Array
});

module.exports = mongoose.model('Peoples', peopleSchema);