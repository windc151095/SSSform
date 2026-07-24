import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(express.json({ limit: '50mb' }));

const DATA_FILE = path.join(process.cwd(), 'data.json');

// Default initial data
let appData = {
  config: {
    fontSize: 11,
    textColor: '#4b5563',
    fontFamily: "'Google Sans', 'Be Vietnam Pro', sans-serif",
    headingColor1: '#1d4ed8',
    headingColor2: '#ef4444',
    borderColor1: '#1d4ed8',
    borderColor2: '#ef4444',
    borderColor3: '#93c5fd',
    backgroundColor: '#ffffff'
  },
  drafts: {}
};

try {
  if (fs.existsSync(DATA_FILE)) {
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    const parsedData = JSON.parse(rawData);
    appData = { ...appData, ...parsedData };
  }
} catch (e) {
  console.error('Error loading data file:', e);
}

const saveData = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(appData, null, 2));
  } catch (e) {
    console.error('Error saving data file:', e);
  }
};

// API Routes
app.get('/api/config', (req, res) => {
  res.json(appData.config);
});

app.post('/api/config', (req, res) => {
  appData.config = { ...appData.config, ...req.body };
  saveData();
  res.json({ success: true, config: appData.config });
});

app.get('/api/drafts', (req, res) => {
  res.json(Object.values(appData.drafts));
});

app.post('/api/drafts', (req, res) => {
  const { pin, data, timestamp } = req.body;
  if (!pin) {
    return res.status(400).json({ error: 'PIN is required' });
  }
  appData.drafts[pin] = { pin, data, timestamp };
  saveData();
  res.json({ success: true });
});

app.get('/api/drafts/:pin', (req, res) => {
  const draft = appData.drafts[req.params.pin];
  if (draft) {
    res.json(draft);
  } else {
    res.status(404).json({ error: 'Draft not found' });
  }
});

app.delete('/api/drafts/:pin', (req, res) => {
  if (appData.drafts[req.params.pin]) {
    delete appData.drafts[req.params.pin];
    saveData();
  }
  res.json({ success: true });
});

async function startServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
