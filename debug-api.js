const fs = require('fs');

async function check() {
  try {
    const res = await fetch('http://localhost:3000/api/properties');
    const text = await res.text();
    console.log('Status:', res.status);
    fs.writeFileSync('debug-error.txt', text);
  } catch (error) {
    console.error(error);
  }
}

check();
