require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.log('URI Missing');
    process.exit(1);
}

if (!uri.startsWith('mongodb+srv://')) {
    console.log('URI does not start with mongodb+srv://');
}

if (uri.includes('<password>')) {
    console.log('URI contains placeholder <password>');
}

const parts = uri.split('@');
if (parts.length < 2) {
    console.log('URI missing @ symbol (credentials/host separator)');
} else {
    console.log('URI Format seems correct (contains @)');
}

console.log('URI Length:', uri.length);
