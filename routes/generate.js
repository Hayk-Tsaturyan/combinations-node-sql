const express = require('express');
const router = express.Router();
const {combinationController} = require("../controllers/combinationController")


router.post('/generate', combinationController.createCombinations);

module.exports = router;