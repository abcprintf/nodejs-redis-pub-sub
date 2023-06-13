const { createClient } = require('redis');

const redisClient = createClient({
    host: 'localhost',
    port: 6379
});
redisClient.connect().catch(console.error)

const redisConnect = () => {
    return redisClient;
};

module.exports = {
    redisConnect,
};