var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    tweet: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweets',
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Categories', categorySchema);