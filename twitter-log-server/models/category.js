var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    trend: {
        type: Boolean,
    },
    tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Categories', categorySchema);