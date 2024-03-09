const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/excel-upload'); 

const { uploadBrokerExcel } = require('../../utils/broker-excel-dump');
const { getTopBrokers } = require('../../controllers/broker-controller');


router.post('/upload-broker-excel', upload.single('file'), uploadBrokerExcel);

router.get('/top-brokers/:year', getTopBrokers);

module.exports = router;
