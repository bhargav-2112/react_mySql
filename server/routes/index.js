const express = require('express');
const router = express.Router();
const tutorialRouter = require('./tutorial');

router.get('/', (req, res) => {
    res.json({message:"test page"});
});
router.use("/tutorials", tutorialRouter);

module.exports = router