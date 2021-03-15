const redis = require('redis');
const keys = require('./keys');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();

const fib = (index) => {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2)
}

redisPublisher.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(+message))
});

redisPublisher.subscribe('insert')