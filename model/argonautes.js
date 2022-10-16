const mongoose = require('mongoose');

const argonautesSchema = mongoose.Schema(
    
    {nom: { type: 'string', required: true}},
    {timestamps: true}
)


module.exports = mongoose.model('argonautes', argonautesSchema);