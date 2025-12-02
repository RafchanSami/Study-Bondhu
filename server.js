const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./backend/utils/db');
const http = require('http');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { on } = require('events');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./backend/routes/authRoutes'));
app.use('/api/chat', require('./backend/routes/chatRoutes'));
app.use('/api/drawing', require('./backend/routes/drawingRoutes'));
app.use('/api/schedule', require('./backend/routes/scheduleRoutes'));
app.use('/api/group', require('./backend/routes/groupRoutes'));

app.get('/', (req, res) => {
  res.send('📡 StudyBondhu API is running...');
});

// Error handler middleware
app.use(errorHandler);

// ✅ Create HTTP server properly
const server = http.createServer(app);

// Start server
const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

