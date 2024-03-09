const express = require('express');
const router = express.Router();

const brokerRouter=require('./broker-routes');
const classRouter=require('./class-routes');

router.use('/broker',brokerRouter);
router.use('/class',classRouter);

module.exports = router;