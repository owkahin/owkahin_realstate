require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log('Testing connection to:', uri ? uri.replace(/:([^:@]+)@/, ':****@') : 'undefined');

if (!uri) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

mongoose.connect(uri)
    .then(() => {
        console.log('✅ SUCCESS: Connected to MongoDB successfully!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ ERROR: Connection failed.');
        console.error('Reason:', err.message);
        if (err.message.includes('bad auth')) {
            console.error('👉 This means your PASSWORD or USERNAME is incorrect.');
        } else if (err.message.includes('bad auth')) {
            console.error('👉 This means your IP address might not be whitelisted in MongoDB Atlas.');
        }
        process.exit(1);
    });
