const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/excel-upload'); 

const { uploadClassExcel} = require('../../utils/class-excel-dump');

router.post('/upload-class-excel', upload.single('file'), uploadClassExcel);

module.exports = router;
