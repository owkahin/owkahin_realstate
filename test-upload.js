const fs = require('fs');
const path = require('path');

async function testUpload() {
    const filePath = path.join(__dirname, 'test-image.txt');
    fs.writeFileSync(filePath, 'This is a test file content simulating an image.');

    const formData = new FormData();
    const file = new Blob([fs.readFileSync(filePath)], { type: 'text/plain' });
    formData.append('file', file, 'test-image.txt');

    try {
        const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const json = await response.json();
            console.log('✅ Upload successful:', json);
        } else {
            console.error('❌ Upload failed:', response.status, response.statusText);
            const text = await response.text();
            console.error('Response:', text);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        fs.unlinkSync(filePath);
    }
}

testUpload();
