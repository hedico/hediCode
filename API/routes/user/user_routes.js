'use strict'

const controller = require('../../controllers/user/user_controller');
const router = require('express').Router();
const jwt = require('../../middleware/jwt');

//GET
router.get('/:username?', jwt.decodeToken, controller.getUsers);

//POST
router.post('', controller.newUser);
router.post('/login', controller.login);
router.post('/decode', controller.decodeToken);

//PUT
router.put('/:username', controller.updateUser);

//DELETE
router.delete('/:username', controller.deleteUser);

module.exports = router;