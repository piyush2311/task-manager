const mongoose = require('mongoose');
var pageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name can\'t be empty'
    },
    completed: {
        type: Boolean,
        required: 'completed can\'t be empty',
        default:false
    },
    created: {
        type: Date, 
        default: Date.now
    },
    updated: {
        type: Date, 
        default: Date.now
    }
},{ versionKey: false });

mongoose.model('Task', pageSchema);