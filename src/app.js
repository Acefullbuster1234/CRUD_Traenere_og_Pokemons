const express = require('express');
const logger = require('./middleware/logger');
const trainerRoutes = require('./routes/trainerRoutes');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/trainers', trainerRoutes);

module.exports = app;