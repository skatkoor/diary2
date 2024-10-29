import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = createClient({
  url: process.env.DATABASE_URL || "postgresql://diarybotneondb_owner:k1ACUnwmYe0z@ep-frosty-mountain-a8an45qk.eastus2.azure.neon.tech/diarybotneondb?sslmode=require"
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Health check endpoint
app.get('/api/health', (_, res) => res.send('OK'));

// API Routes
app.post('/api/diary', async (req, res) => {
  try {
    const { userId, content, mood } = req.body;
    const result = await db.execute({
      sql: 'INSERT INTO diary_entries (id, user_id, content, mood) VALUES (?, ?, ?, ?)',
      args: [crypto.randomUUID(), userId, content, mood]
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create diary entry' });
  }
});

app.get('/api/diary/:userId', async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM diary_entries WHERE user_id = ? ORDER BY created_at DESC',
      args: [req.params.userId]
    });
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch diary entries' });
  }
});

// Serve index.html for all other routes (SPA support)
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});