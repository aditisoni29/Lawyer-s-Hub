const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
const libraryRoutes = require('./api/library');
const casesRoutes = require('./api/cases');
const lawyersRoutes = require('./api/lawyers');

app.use('/api/library', libraryRoutes);
app.use('/api/cases', casesRoutes);
app.use('/api/lawyers', lawyersRoutes);

// Chat endpoint
app.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    // Simple echo bot logic, replace with your own logic
    const botResponse = `You said: ${userMessage}`;
    res.json({ response: botResponse });
});

// Serve the HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/library', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/library.html'));
});

// Add other routes as needed

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
