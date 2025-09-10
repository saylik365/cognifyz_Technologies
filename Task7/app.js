const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

// Models
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

const SubmissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    userId: mongoose.Schema.Types.ObjectId
});
const Submission = mongoose.model('Submission', SubmissionSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Auth Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// UI Routes
app.get('/', (req, res) => res.render('index'));
app.get('/submissions', (req, res) => res.render('submissions'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/weather', (req, res) => res.render('weather'));

// Auth Routes
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
});

// CRUD API with DB
app.get('/api/submissions', authMiddleware, async (req, res) => {
    const submissions = await Submission.find({ userId: req.user.id });
    res.json(submissions);
});

app.post('/api/submissions', authMiddleware, async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields required' });
    }

    const newSubmission = new Submission({ name, email, message, userId: req.user.id });
    await newSubmission.save();
    res.json({ success: true, submission: newSubmission });
});

app.delete('/api/submissions/:id', authMiddleware, async (req, res) => {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// Weather API Integration (Fixed for Node.js 18+)
app.get('/api/weather', authMiddleware, async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: 'City is required' });

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();

        console.log("Weather API response:", data); // Debugging

        if (String(data.cod) !== "200") {
            return res.status(400).json({ error: data.message || 'Unable to fetch weather' });
        }

        res.json(data);
    } catch (error) {
        console.error("Weather API error:", error);
        res.status(500).json({ error: error.message || 'Server error fetching weather' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
);
