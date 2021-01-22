'use strict'

const controller = require('../../controllers/category/category_controller');
const router = require('express').Router();
const jwt = require('../../middleware/jwt');

//GET
router.get('/:id?', jwt.decodeToken(), controller.getCategories);

//POST
router.post('', controller.newCategory);

module.exports = router;
