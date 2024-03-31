const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://kavi:2803@form.dkuglp0.mongodb.net/?retryWrites=true&w=majority&appName=form', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define schema and model for user
const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    email: String,
    phoneNumber: Number,
    password: String,
    confirmPassword: String,
    gender: String,
    accept: String

});

const User = mongoose.model('User', userSchema);

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Route for registration form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for registration form submission
app.post('/register', async (req, res) => {
    const { fullName, username, email, phoneNumber, password, confirmPassword, gender, accept } = req.body;

    try {
        // Create new user
        const newUser = new User({
            fullName,
            username,
            email,
            phoneNumber,
            password,
            confirmPassword,
            gender,
            accept
        });
        await newUser.save();
        res.sendFile(path.join(__dirname, 'success.html'));
    } catch (err) {
        console.log(err);
        res.status(500).send('Registration Failed');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

