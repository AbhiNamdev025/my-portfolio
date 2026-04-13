const { Router } = require('express');
const validate = require('../middlewares/validate');
const { postContact } = require('../controllers/contact.controller');
const { contactSchema } = require('../validators/contact.validator');

const router = Router();

router.post('/', validate(contactSchema), postContact);

module.exports = router;
