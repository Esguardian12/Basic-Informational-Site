const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    let filePath = '';
    let statusCode = 200;

    // Match the requested URL to the correct HTML file
    switch (req.url) {
        case '/':
            filePath = path.join(__dirname, 'index.html');
            break;
        case '/about':
            filePath = path.join(__dirname, 'about.html');
            break;
        case '/contact-me':
            filePath = path.join(__dirname, 'contact-me.html');
            break;
        default:
            filePath = path.join(__dirname, '404.html');
            statusCode = 404;
            break; 
    }

    // Read and serve the matched HTML file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
            return;
        }

        res.writeHead(statusCode, {'Content-Type' : 'text/html' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})