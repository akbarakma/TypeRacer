const router = require('express').Router();
const GlobalController = require('../controllers/GlobalController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/quotes', GlobalController.getQuotes);
router.post('/register', GlobalController.register);
router.post('/login', GlobalController.login);
router.get('/:score', authentication, authorization, GlobalController.addScore);

module.exports = router;