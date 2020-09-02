// BASE SETUP
// =============================================================================

const express = require('express');
const allowCrossDomain = require('../utils/cors')
const router = express.Router();
router.use(allowCrossDomain)
module.exports = router