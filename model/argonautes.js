const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const argonautesSchema = mongoose.Schema(
    
    {nom: { type: 'string', required: true}},
    {timestamps: true}
)

// argonautesSchema.plugins(uniqueValidator)

module.exports = mongoose.model('argonautes', argonautesSchema);