const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = class userController {
    static async userCreate(req, res) {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            email: email,
            password: hashedPassword
        }
        try {
            await User.create(user);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async userRead(req, res) {
        const id_user_param = parseInt(req.params.id_user);
        const id_user_token = req.decoded.id_user;
        if (isNaN(id_user_param)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        if (id_user_param !== id_user_token) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        if (id_user_param === id_user_token) {
            try {
                const user = await User.findByPk(id_user);
                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

    }

    static async userUpdate(req, res) {
        id_user_param = parseInt(req.params.id_user);
        id_user_token = req.decoded.id_user;

        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            email: email,
            password: hashedPassword
        }

        if (isNaN(id_user_param)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        if (id_user_param !== id_user_token) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        if (id_user_param === id_user_token) {
            try {
                const user = await User.update(user, { where: { id_user: id_user_param } });
                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    }

    static async userDelete(req, res) {
        id_user_param = parseInt(req.params.id_user);
        id_user_token = req.decoded.id_user;
        if (isNaN(id_user_param)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        if (id_user_param !== id_user_token) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        if (id_user_param === id_user_token) {
            try {
                const user = await User.destroy({ where: { id_user: id_user_param } });
                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    }

    static async userLogin(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email: email } });

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, { expiresIn: "1d" });
                    res.status(200).json({ auth: true, token: token });
                } else {
                    res.status(401).json({ error: "Invalid credentials" });
                }
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}