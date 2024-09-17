const users = require('./routes/users');
const login = require('./routes/login');
const products = require('./routes/products');
const profile = require('./routes/profile');
const management = require('./routes/management');
const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', exposedHeaders: ['x-total-count'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', users);
app.use('/api/auth', login);
app.use('/api/products', products);
app.use('/api/profile', profile);
app.use('/api/management', management);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});