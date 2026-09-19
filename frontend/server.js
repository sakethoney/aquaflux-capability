const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4200;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

app.use(express.json());

// Proxy all /api/* to the backend — mirrors the CloudFront /api/* behaviour in production
app.all('/api/{*path}', async (req, res) => {
  const targetUrl = `${BACKEND_URL}${req.path}${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`;
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: { 'content-type': req.headers['content-type'] || 'application/json' },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({ message: 'Unable to reach backend service', error: String(error) });
  }
});

const distPath = path.join(__dirname, 'dist', 'angular-node-app', 'browser');
app.use(express.static(distPath));

app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server listening on port ${PORT}`);
  console.log(`Backend URL configured as ${BACKEND_URL}`);
});
