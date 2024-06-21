import User from '../models/user.js';

const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    },
    // Add more methods as needed
};

export default userController;
