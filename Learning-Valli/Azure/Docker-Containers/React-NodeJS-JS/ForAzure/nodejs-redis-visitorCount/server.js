const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// Create a Redis client
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

// Connect to Redis server
client.on('connect', function() {
  console.log('Connected to Redis...');
});

// Initialize the visitor count
client.setnx('visits', 0);

// Define a route to display the number of visits
app.get('/', (req, res) => {
  client.incr('visits', (err, visits) => {
    if (err) {
      return res.status(500).send('Error incrementing visits');
    }
    res.send(`Ola! The number of visits is now: ${visits}`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});