const express = require('express');
const route = express.Router();

const cartRoutes = require('./cart');
const statsRoutes = require('./stats');
const wishlistRoutes = require('./wishlist');

route.use('/carts', cartRoutes);
route.use('/stats', statsRoutes);
route.use('/wishlist', wishlistRoutes);

module.exports = route;