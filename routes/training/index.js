var express = require('express');
var router = express.Router();
const { 
    create_module,
    create_chunk,
    get_module,
    get_all_modules
} = require('../../controllers/training')

router.get('/all', get_all_modules)
router.get('/:id', get_module)
router.post('/create', create_module)

router.post('/:id/chunk/create', create_chunk)

module.exports = router;
