const express = require('express');
const router = express.Router();
const { auth } = require('../utils');

const {climaController} = require('../controllers');

router.get('/', climaController.getAll);
router.post('/', auth(), climaController.createClima);


router.get('/:modelId', climaController.getClima);
router.put('/:modelId', climaController.updateClima);
router.delete('/:modelId', climaController.deleteClima);




module.exports = router;