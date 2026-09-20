require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Health check route — confirms server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/participants', require('./routes/participantRoutes'));
app.use('/api/organizations', require('./routes/organizationRoutes'));
app.use('/api/trials', require('./routes/trialRoutes'));
// app.use('/api/applications', require('./routes/applicationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));