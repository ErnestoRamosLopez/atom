const express = require('express');
const route = express.Router();

const cartRoutes = require('./cart');
const statsRoutes = require('./stats');

route.use('/carts', cartRoutes);
route.use('/stats', statsRoutes);

module.exports = route;