const { Router } = require('express');
const contactRoutes = require('./contact.routes');

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy.' });
});

router.use('/contact', contactRoutes);

module.exports = router;
