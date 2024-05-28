const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const app = express();

const httpsOptions = {
  key: fs.readFileSync('key.pem', { passphrase: '1111' }),
  cert: fs.readFileSync('cert.pem')
};

const httpsServer = https.createServer(httpsOptions, app);

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Quik is running @ http://localhost:${PORT}`);
  console.log('Thank you for choosing Quik Kiosk');
});
