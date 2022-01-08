var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: { type: String },
    intensity: { type: Number, min: 0, max: 10, default: 10 }
}, {
    timestamps: true
});


const tweetSchema = new Schema({
    tweet: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date(),
    },
    author: {
        type: String,
    },
    bio: {
        type: String,
    },
    hashtag: {
        type: String,
        required: true,
    },
    emotions: {
        type: String,
        enum: ['joy', 'sadness', 'disgust', 'fear', 'anger', 'neutral'],
        default: 'neutral'
    },
    reviews: [reviewSchema]
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Tweets', tweetSchema);