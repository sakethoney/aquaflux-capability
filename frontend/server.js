const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4200;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

app.use(express.json());

app.get('/api/frontend-message', async (req, res) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/hello`);
    const data = await response.json();
    res.json({ message: data.message || 'No backend message returned' });
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
