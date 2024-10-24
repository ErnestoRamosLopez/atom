const users = require('./routes/users');
const login = require('./routes/login');
const products = require('./routes/products');
const profile = require('./routes/profile');
const management = require('./routes/management');
const shipping = require('./routes/shipping-carriers');
const orders = require('./routes/orders');
const discounts = require('./routes/discounts');

const express = require('express');
var jsonServer = require('json-server');
var cors = require('cors');
const cookieParser = require("cookie-parser");
const validateAccessToken = require('./middleware/validateToken');

const app = express();
//app.use(cors({ origin: 'http://localhost:3000', exposedHeaders: ['x-total-count'], credentials: true }));
app.use(cors({ origin: 'https://neon-raindrop-61e490.netlify.app', exposedHeaders: ['x-total-count'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 3001;

app.use('/api/db', jsonServer.router('./express/json-server/db.json'));

//public use
app.use('/api/auth', login);
app.use('/api/products', products);

//protected
app.use('/api/users', validateAccessToken, users);
app.use('/api/profile', validateAccessToken, profile);
app.use('/api/management', validateAccessToken, management);
app.use('/api/shipping-carriers', validateAccessToken, shipping);
app.use('/api/orders', validateAccessToken, orders);
app.use('/api/discounts', validateAccessToken, discounts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});