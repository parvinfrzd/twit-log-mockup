const express = require('express');
const router = express.Router();
const CategoryCtrl = require('../controllers/categories');

router.get('/category', CategoryCtrl.newCategory);
router.post('/category', CategoryCtrl.createCategory);
router.post('/tweets/:id/category', CategoryCtrl.addToCategory);

module.exports = router;
