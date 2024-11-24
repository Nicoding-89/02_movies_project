import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { pool } from './config/db.config.js';

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// General middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
  origin: FRONTEND_URL,
  methods: 'GET,POST'
}));

app.get('/', (req, res) => {
  res.send('Wena compare')
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const connectToDatabase = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Database connected');
  } catch (err) {
    console.error('Error connecting to the Database: ', err);
  };
};

connectToDatabase();