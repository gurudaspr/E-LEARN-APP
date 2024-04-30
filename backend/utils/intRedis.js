// Import createClient function from 'redis'
import { createClient } from 'redis';


const client = createClient({
    password: 'RMG0aTc7kscR5EFxqOZFOSsL36N8YzNL',
    socket: {
        host: 'redis-13892.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 13892
    }
});

client.setMaxListeners(15); 


client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('ready', () => {
    console.log('Client connected to Redis and ready to use');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('end', () => {
    console.log('Client disconnected from Redis');
});

process.on('SIGINT', () => {
    client.quit();
});

export default client;
