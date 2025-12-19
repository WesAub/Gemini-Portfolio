
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// AWS RDS Connection Configuration
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false // Required for AWS RDS SSL connections
  }
});

app.use(cors());
app.use(express.json());

// Initialize Database Table (Run once)
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
    console.log('RDS Table initialized');
  } catch (err) {
    console.error('RDS Initialization Error:', err);
  }
};
initDb();

// API Routes
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  const { title, description, category, year, imageUrl } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projects (title, description, category, year, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, category, year, imageUrl || 'https://picsum.photos/800/600']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auth Mock for AWS RDS
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // In a real app, check against a 'users' table in RDS
  if (email && password) {
    res.json({ id: 'aws-user-1', email, token: 'mock-aws-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port} (Connecting to RDS at ${process.env.DB_HOST})`);
});
