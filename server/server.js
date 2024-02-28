import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();

app.use(express.json())

app.use(cors())

if (!process.env.JWT_SECRET) {
    console.error("JWT secret key is missing.");
    process.exit(1);
}

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`)
            console.log("Connected to Database")
        })
    })
    .catch((error) => {
        console.log(error)
    })

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: Number,
        default: null,
    },
    complaints: {
        type: [String],
        default: [],
    },
    hostel: {
        type: String,
        default: null,
    },
    feedback: {
        type: String,
        default: null,
    },
    rating: {
        type: Number,
        default: null,
    },
}, {
    collection: 'users'
});

let wardenSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
}, {
    collection: 'wardens'
});

let adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
}, {
    collection: 'admins'
});

const User = new mongoose.model('User', userSchema);
const Warden = new mongoose.model('Warden', wardenSchema);
const Admin = new mongoose.model('Admin', adminSchema);

app.post('/signup', async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var userType = req.body.userType;

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        let user;
        if (userType === 'student') {
            user = await User.findOne({ username: username });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const newUser = new User({
                username,
                password: hashedPassword,
                userType,
            });
            await newUser.save();
        } else if (userType === 'warden') {
            user = await Warden.findOne({ username: username });
            if (user) {
                return res.status(400).json({ message: 'Warden already exists' });
            }
            const newWarden = new Warden({
                username,
                password: hashedPassword,
                userType,
            });
            await newWarden.save();
        }
        else if (userType === 'admin') {
            user = await Admin.findOne({ username: username });
            if (user) {
                return res.status(400).json({ message: 'Admin already exists' });
            }
            const newAdmin = new Admin({
                username,
                password: hashedPassword,
                userType,
            });
            await newAdmin.save();
        } else {
            return res.status(400).json({ message: 'Invalid user type' });
        }

        res.json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Cannot sign up' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password, userType } = req.body;

    try {
        let user, warden, admin;

        if (userType === 'student') {
            user = await User.findOne({ username });
        } else if (userType === 'warden') {
            warden = await Warden.findOne({ username });
        } else if (userType === 'admin') {
            user = await Admin.findOne({ username });
        } else {
            return res.status(400).json({ message: 'Invalid user type' });
        }

        if (!user && !warden && !admin) {
            return res.status(400).json({ message: 'Invalid username, password, or user type' });
        }

        const isPasswordValid = await bcrypt.compare(password, user ? user.password : (warden ? warden.password : null));

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ username, userType }, process.env.JWT_SECRET, { expiresIn: '5h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Cannot log in' });
    }
});

app.get('/view-wardens', async (req, res) => {
    try {
        const wardens = await Warden.find();
        res.json(wardens);
    } catch (error) {
        console.error('Error fetching wardens:', error.message);
        res.status(500).json({ message: 'Error fetching wardens' });
    }
});

app.get('/view-students', async (req, res) => {
    try {
        const students = await User.find();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error.message);
        res.status(500).json({ message: 'Error fetching wardens' });
    }
});

app.post('/allot-room', async (req, res) => {
    const { studentId, roomNumber, hostel } = req.body;

    if (roomNumber == '') {
        return res.status(400).json({ message: 'Noroom' });
    }
    if (roomNumber < 1) {
        return res.status(400).json({ message: 'Roomgreaterthan0' });
    }
    if (hostel == '') {
        return res.status(400).json({ message: 'Nohostel' });
    }
    if (!hostel.includes('M')) {
        return res.status(400).json({ message: 'Nom' });
    }

    try {
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.roomNumber = roomNumber;
        student.hostel = hostel;
        await student.save();

        res.json({ message: 'Room allotted successfully' });
    } catch (error) {
        console.error('Error allotting room:', error.message);
        res.status(500).json({ message: 'Error allotting room' });
    }
});

app.get('/view-room', async (req, res) => {
    try {
        const username = req.query.username;
        const student = await User.findOne({ username: username });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ username: student.username, roomNumber: student.roomNumber, hostel: student.hostel });
    } catch (error) {
        console.error('Error fetching room:', error.message);
        res.status(500).json({ message: 'Error fetching room' });
    }
});

app.post('/complaints', async (req, res) => {
    const { username, complaint } = req.body;
    let err = 1;
    if (complaint == '') {
        return res.status(400).json({ message: err });
    }
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.complaints.push(complaint);
        await user.save();

        res.json({ message: 'Complaint filed successfully' });
    } catch (error) {
        console.error('Error filing complaint:', error.message);
        res.status(500).json({ message: 'Error filing complaint' });
    }
});

app.post('/feedback', async (req, res) => {
    const { username, feedback } = req.body;
    let err = 1;
    if (feedback == '') {
        return res.status(400).json({ message: err });
    }
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.feedback = feedback;
        await user.save();

        res.json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error.message);
        res.status(500).json({ message: 'Error submitting feedback' });
    }
});

app.get('/view-complaints', async (req, res) => {
    try {
        const students = await User.find();
        res.json(students);
    } catch (error) {
        console.error('Error fetching complaints:', error.message);
        res.status(500).json({ message: 'Error fetching complaints' });
    }
});

app.get('/view-feedback', async (req, res) => {
    try {
        const students = await User.find();
        res.json(students);
    } catch (error) {
        console.error('Error fetching feedback:', error.message);
        res.status(500).json({ message: 'Error fetching feedback' });
    }
});

app.post('/rating', async (req, res) => {
    const { username, rating } = req.body;
    let err = 1;
    if (rating > 10 || rating <= 0) {
        return res.status(400).json({ message: err });
    }
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.rating = rating;
        await user.save();
        err = 0;
        res.json({ message: err });
    } catch (error) {
        console.error('Error submitting rating:', error.message);
        res.status(500).json({ message: 'Error submitting rating' });
    }
});

app.get('/analyze', async (req, res) => {
    try {
        const students = await User.find();
        res.json(students);
    } catch (error) {
        console.error('Error fetching complaints:', error.message);
        res.status(500).json({ message: 'Error fetching complaints' });
    }
});

app.put('/updateroom', async (req, res) => {
    const { studentId, roomNumber, hostel } = req.body;
    if (roomNumber == '') {
        return res.status(400).json({ message: 'Noroom' });
    }
    if (roomNumber < 1) {
        return res.status(400).json({ message: 'Roomgreaterthan0' });
    }
    if (hostel == '') {
        return res.status(400).json({ message: 'Nohostel' });
    }
    if (!hostel.includes('M')) {
        return res.status(400).json({ message: 'Nom' });
    }
    try {
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.roomNumber = roomNumber;
        student.hostel = hostel;
        await student.save();

        res.json({ message: 'Room information updated successfully' });
    } catch (error) {
        console.error('Error updating room information:', error.message);
        res.status(500).json({ message: 'Error updating room information' });
    }
});
