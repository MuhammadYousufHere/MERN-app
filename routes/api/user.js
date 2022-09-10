const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../model/User');

// using express routes
const router = express.Router();

// @route  POST api/user
// @desc   Register user
// @access Public

router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please enter your valid email').isEmail(),
        check(
            'password',
            'Password is not correct, it should be 6 or more characters long'
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // send back bad response json
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        // should setup middleware first
        const { name, email, password } = req.body;

        try {
            // see if client exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    msg: 'User already exists, Please try again with another email.',
                });
            }
            //Get user gravatar
            let avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            user = new User({
                name,
                email,
                avatar,
                password,
            });

            //Encrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // return jsonwebtoken

            const payload = {
                user: {
                    id: user.id,
                },
            };
            jsonwebtoken.sign(
                payload,
                config.get('jwtSecret'),
                // optional but recommended, set it to 1hr in production build
                { expiresIn: 36000 },
                (error, token) => {
                    if (error) throw error;
                    // can also send something else like user id
                    res.json({
                        token,
                        name: user.name,
                        avatar: user.avatar,
                        email: user.email,
                    });
                }
            );
            // res.send('User Registered!');
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
