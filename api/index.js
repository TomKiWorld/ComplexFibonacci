const keys = require('./keys.js');

// Express App Setup
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  databse: keys.pgDatabse,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on('connect', () => {
  pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.log(err));
});

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

// Express Route Handlers
app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values');
  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

app.post('/values/add', async (req, res) => {
  const { index } = req.body;

  if (!index) {
    return res.status(422).send({ message: 'Missing index, please submit a value.'});
  }

  if (parseInt(index) > 40) {
    return res.status(422).send({ message: 'Index too high, Please submit a number up to 40.'});
  }

  redisClient.hset('values', index, 'Nothing yet!');
  redisPublisher.publish('insert', index);
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

  res.send({ working: true });
});

app.listen(5000, err => {
  console.log('API listening on port 5000');
});
