var express = require('express');
var router = express.Router();
const tweetsCtrl = require('../controllers/tweets')


router.get('/new', tweetsCtrl.addTweet);
router.get('/', tweetsCtrl.showTweet);
router.get('/:id', tweetsCtrl.index);
router.post('/', tweetsCtrl.createTweet);
router.get('/:id/edit', tweetsCtrl.update);
router.put('/:id', tweetsCtrl.editTweet);
router.delete('/:id', tweetsCtrl.deleteTweet);

module.exports = router;
