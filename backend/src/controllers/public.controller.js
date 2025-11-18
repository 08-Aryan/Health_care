// backend/src/controllers/public.controller.js

// Example: simple public endpoints controller
const express = require('express');

// Health check endpoint
const healthCheck = (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is up and running!' });
};

// Info endpoint
const getInfo = (req, res) => {
  res.status(200).json({
    appName: 'Healthcare App',
    version: '1.0.0',
    author: 'Your Name',
    description: 'Public API endpoints'
  });
};

// Export controller functions
module.exports = {
  healthCheck,
  getInfo
};
