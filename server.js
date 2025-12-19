
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the project root using an absolute path
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 80;

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Log configuration status
console.log('--- RDS Connection Debug ---');
console.log('DB_HOST:', process.env.DB_HOST || 'MISSING');
console.log('DB_USER:', process.env.DB_USER || 'MISSING');
console.log('DB_NAME:', process.env.DB_NAME || 'postgres');
console.log('---------------------------');

if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_PASSWORD) {
  console.error('FATAL ERROR: Database credentials (DB_USER, DB_HOST, or DB_PASSWORD) are missing in .env file.');
  console.error('The server will start, but database features will fail.');
}

// AWS RDS Connection Configuration
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD,
  port: 5432,
  // RDS requires SSL for most configurations
  ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : false
});

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows.map(p => ({
      ...p,
      imageUrl: p.image_url
    })));
  } catch (err) {
    console.error('Error fetching projects:', err.message);
    res.status(500).json({ error: 'Database error' });
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
    console.error('Error creating project:', err.message);
    res.status(500).json({ error: 'Database error' });
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

// Serve Frontend from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Frontend build not found. Please run "npm run build".');
    }
  }
});

const initDb = async () => {
  if (!process.env.DB_HOST || !process.env.DB_USER) return;
  
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
    console.log('SUCCESS: Connected to RDS and verified table.');
  } catch (err) {
    console.error('ERROR: RDS Connection failed during init:', err.message);
  }
};

initDb();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
