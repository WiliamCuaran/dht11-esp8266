const mongoose = require('mongoose');
const { Schema } = mongoose;

const sensorschema = new Schema({
 temperature: Number,
 hume: Number,
 created_at: {
     type: Date,
     default: Date.now
 }


});

module.exports = mongoose.model('sensor', sensorschema);