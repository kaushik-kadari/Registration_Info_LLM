const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb+srv://kaushik321:767187@cluster0.cbz6m0k.mongodb.net/RegInfoLLM?retryWrites=true&w=majority')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.use('/api/auth', authRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));