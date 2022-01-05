var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: {
        type: String,
    },
    username: {
        type: String,
    }
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
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Tweets', tweetSchema);