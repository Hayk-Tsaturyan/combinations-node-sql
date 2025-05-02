const express = require('express');
const db = require('./db');
const generateRoute = require('./routes/generate');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/api/v1/', generateRoute);

app.listen(PORT, async () => {
  try {
    const connection = await db.getConnection();
    
    await connection.ping();
    console.log('✅ Connected to MySQL database.');
    connection.release();
  } catch (err) {
    console.error('❌ Failed to connect to the MySQL database:', err.message);
    process.exit(1);
  }

  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});