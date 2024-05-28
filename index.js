const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

// Create your own certificate for https otherwise weather and location won't work!
const httpsOptions = {
  key: fs.readFileSync('server.key', { passphrase: '' }),
  cert: fs.readFileSync('server.crt')
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
