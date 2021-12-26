var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const emotionSchema = new Schema({
    emotion: {
        type: String,
        enum: ['joy', 'sadness', 'disgust', 'fear', 'anger', 'neutral'],
        default: 'neutral'
    },
    note: {
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
    emotions: [emotionSchema],
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Tweets', tweetSchema);