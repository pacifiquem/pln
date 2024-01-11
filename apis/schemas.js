const mongoose = require('mongoose');

const SharedPickupLinesSchema = new mongoose.Schema({
    sharedBy: String,
    sentTo: String,
    note: String,
    pickup: String
}, {timestamps: true});

module.exports = mongoose.model('SharedPickupLine', SharedPickupLinesSchema);