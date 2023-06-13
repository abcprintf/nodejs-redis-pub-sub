const express = require('express');
const port = 3002;
const app = express();

/**
 * include redis
 */
const { redisConnect } = require('./lib/redis');
const subscriber = redisConnect();

const items = [];
/**
 * subscribe to channel
 */
subscriber.subscribe('publishItem', (message) => {
    console.log(message);
    items.push(JSON.parse(message));
});

app.get('/', (req, res) => res.status(200).json({ message: `Redis is running on port: ${port}` }));
app.get('/subscribe', (req, res) => {
    res.status(200).json({ items: items });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});