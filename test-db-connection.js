require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log('Testing MongoDB connection...');
console.log('URI defined:', !!uri);

if (!uri) {
    console.error('MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

mongoose.connect(uri)
    .then(() => {
        console.log('Successfully connected to MongoDB!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Connection failed:', err);
        process.exit(1);
    });
