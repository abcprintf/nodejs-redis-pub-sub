const express = require('express');
const port = 3001;
const app = express();

/**
 * include redis
 */
const { redisConnect } = require('./lib/redis');
const publisher = redisConnect();

app.get('/', (req, res) => res.status(200).json({ message: `Redis is running on port: ${port}` }));
app.get('/publish', (req, res) => {
    const id = Math.floor(Math.random() * 1000);
    const item = {
        id,
        name: `item-${id}`
    };
    publisher.publish('publishItem', JSON.stringify(item));
    res.status(200).json({ message: 'publish item success.' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});