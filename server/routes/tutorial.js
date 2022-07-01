const express = require("express");
const router = express.Router();
const tutorialController = require("../controllers/tutorial.controller");

router.post('/', tutorialController.create);
router.get('/', tutorialController.findAll);
router.post('/published', tutorialController.findAllPublished);
router.post('/:id', tutorialController.findOne);
router.post('/:id', tutorialController.update);
router.post('/:id', tutorialController.delete);
router.post('/', tutorialController.deleteAll);

module.exports = router