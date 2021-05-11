const express = require('express');
const router = express.Router();


const routerCtrl = require('../controllers/router');

router.get('/', routerCtrl.getAllRoutes);

module.exports = router;
