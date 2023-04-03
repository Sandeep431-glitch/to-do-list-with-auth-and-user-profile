// required the mongoose library
const mongoose = require('mongoose');
require('./User');

// creating Schema for the Tasks
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});


const Task = mongoose.model('Task', taskSchema);

// Exporting Schema
module.exports = Task;