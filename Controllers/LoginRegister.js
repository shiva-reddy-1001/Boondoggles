const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

const {User} = require("../Models/UserModel");

const generateAccessToken = data => {
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: process.env.TOKEN_LIFE});
    return token;
};

const register = (req, res) => {
    // Check if username already exists
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal server error");
        } else if (user) {
            res.status(400).send("Username already exists");
        } else {
            User.findOne({username: req.body.username}, (err, user) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Internal server error");
                } else if (user) {
                    res.status(400).send("Username already exists");
                } else {
                    // Hash password
                    bcrypt.hash(req.body.password, saltRounds, (err_hash, hashPassword) => {
                        if (err_hash) {
                            console.error(err_hash);
                            res.status(500).send("Internal server error");
                        } else {
                            const user = new User({
                                username: req.body.username,
                                password: hashPassword,
                                email: req.body.email,
                                role: req.body.role,
                                name: req.body.name,
                            });
                            // Save user to database
                            user.save(err_save => {
                                if (err_save) {
                                    console.error(err_save);
                                    res.status(500).send("Internal server error");
                                } else {
                                    res.end();
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if username exists
    User.findOne({username: username}, (err, foundUser) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal server error");
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, (err_cmp, result) => {
                    if (err_cmp) {
                        console.error(err_cmp);
                        res.status(500).send("Internal server error");
                    } else if (result) {
                        // Password matched
                        const accessToken = generateAccessToken({name: username, role: foundUser.role});
                        res.send({username: username, accessToken: accessToken, role : foundUser.role});
                    } else {
                        res.status(401).send("Please provide a valid username and password.");
                    }
                });
            } else {
                res.status(401).send("Please provide a valid username and password.");
            }
        }
    });
};

const verify = (req, res) => {
    res.send(req.currentUserName);
};

module.exports = { register, verify, login };