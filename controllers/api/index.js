const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const searchRoutes = require('./searchRoutes')

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/search', searchRoutes);

module.exports = router;