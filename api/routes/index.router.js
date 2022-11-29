const express = require('express');
const router = express.Router();

const ctrTask = require('../controllers/task.controller')
const jwtHelper = require('../config/jwtHelper');

/****************************Task api routes ********************/
router.post('/login', ctrTask.login);
router.get('/dashboard', jwtHelper.verifyJwtToken, ctrTask.dashboard);
router.get('/tasks', jwtHelper.verifyJwtToken, ctrTask.getTask);
router.post('/tasks',jwtHelper.verifyJwtToken, ctrTask.addTask);
router.put('/tasks/:id',jwtHelper.verifyJwtToken, ctrTask.updateTask);
router.delete('/tasks/:id',jwtHelper.verifyJwtToken, ctrTask.deleteTask);


module.exports = router;



