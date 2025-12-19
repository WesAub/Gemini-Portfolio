
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 80; // Default to port 80 for production

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// AWS RDS Connection Configuration
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Multer setup for local file storage on AWS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// 1. Serve Uploaded Images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2. API Routes
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows.map(p => ({
      ...p,
      imageUrl: p.image_url
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', upload.single('image'), async (req, res) => {
  const { title, description, category, year } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : 'https://picsum.photos/800/600';
  try {
    const result = await pool.query(
      'INSERT INTO projects (title, description, category, year, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, category, year, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({ id: 'aws-user-1', email, token: 'aws-token-' + Date.now() });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// 3. Serve Frontend (Production)
// This serves the 'dist' folder created by 'npm run build'
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for React Router (Single Page Application)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

// Initialize Database Table
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        image_url TEXT,
        year TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('RDS Connection Successful: Table Ready');
  } catch (err) {
    console.error('RDS Connection Failed:', err);
  }
};
initDb();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Frontend served from /dist`);
  console.log(`API endpoints available at /api`);
});
