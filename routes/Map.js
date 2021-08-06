const router = require('express').Router();
const zipcode = require('../controllers/map');


router.get('/getAll', zipcode.getAddress);

router.post('/addAddress', zipcode.addAddress);

module.exports = router;
