const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const submissions = []; // Temporary storage

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.send('<h2 style="color:red;">All fields are required!</h2><a href="/">Go Back</a>');
    }

    submissions.push({ name, email, message });
    res.render('success', { name, email, message });
});

app.get('/submissions', (req, res) => {
    res.render('submissions', { submissions });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
