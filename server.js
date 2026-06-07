const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = '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';

app.get('/', (req, res) => res.send('Ali AI Twin Proxy OK'));

app.post('/', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: req.body.system || '',
        messages: req.body.messages || []
      })
    });
    const data = await response.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Proxy running'));
