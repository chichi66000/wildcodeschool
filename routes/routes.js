const express = require('express');
const router = express.Router();

const argonauteCtrl = require('../controller/argonaute');

router.post('/', argonauteCtrl.postArgonaute);
router.get('/', argonauteCtrl.getAllArgonautes);
router.delete('/', argonauteCtrl.deleteArgonaute);

module.exports = router;