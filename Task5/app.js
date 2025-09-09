const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
let submissions = []; // Temporary in-memory storage

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For JSON API requests
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// UI Routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/submissions', (req, res) => {
    res.render('submissions');
});

// API Routes
app.get('/api/submissions', (req, res) => {
    res.json(submissions);
});

app.post('/api/submissions', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const newSubmission = { id: Date.now(), name, email, message };
    submissions.push(newSubmission);
    res.json({ success: true, submission: newSubmission });
});

app.delete('/api/submissions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    submissions = submissions.filter(sub => sub.id !== id);
    res.json({ success: true });
});

app.put('/api/submissions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, message } = req.body;
    let updated = false;

    submissions = submissions.map(sub => {
        if (sub.id === id) {
            updated = true;
            return { ...sub, name, email, message };
        }
        return sub;
    });

    if (!updated) return res.status(404).json({ error: 'Submission not found' });
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
