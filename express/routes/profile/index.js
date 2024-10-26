const express = require('express');
const route = express.Router();

const cartRoutes = require('./cart');
const statsRoutes = require('./stats');
const wishlistRoutes = require('./wishlist');
const addressRoutes = require('./address');

route.use('/carts', cartRoutes);
route.use('/stats', statsRoutes);
route.use('/wishlist', wishlistRoutes);
route.use('/address', addressRoutes);

module.exports = route;