const express = require("express");
const recordRoutes = express.Router();
const dbo = require('../db/conn');
const { v4: uuidv4 } = require('uuid');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


recordRoutes.route('/test').get((req, res) => {
    res.send('hello');
});

recordRoutes.route('/signup').post(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const { email, password } = req.body;

    const generatedUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const existingUser = await db_connect.collection("users").findOne({ email: email });

    try {
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        } else {
            const sanitizedEmail = email.toLowerCase();

            const insertedUser = await db_connect.collection("users").insertOne({
                _id: generatedUserId,
                email: sanitizedEmail,
                hashed_password: hashedPassword,
            });

            const token = jwt.sign(insertedUser, sanitizedEmail, {
                expiresIn: '1h'
            })

            res.status(201).json({ token: token, userId: insertedUser, email: sanitizedEmail })
        }
    }
    catch (err) {
        console.error(err);
    }
});

recordRoutes.route('/get_all_users').get(async function (req, res) {
    let db_connect = dbo.getDb("tinder");
    try {
        let result = await db_connect.collection("users").find().toArray();
        res.json(result);
    } catch (err) {
        console.error(err);
    }
})

recordRoutes.route('/delete_all_users').delete(async function (req, res) {
    let db_connect = dbo.getDb("tinder");
    try {
        let result = await db_connect.collection("users").deleteMany();
        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

recordRoutes.route('/login').post(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const { email, password } = req.body;

    const existingUser = await db_connect.collection("users").findOne({ email });
    console.log(existingUser);

    try {
        if (!existingUser) {
            res.status(400).json({ message: "User does not exist" });
        } else {
            const isPasswordCorrect = await bcrypt.compare(password.toString(), existingUser.hashed_password.toString());

            if (!isPasswordCorrect) {
                res.status(400).json({ message: "Invalid credentials" });
            } else {
                const token = jwt.sign(existingUser, email, {
                    expiresIn: '1h'
                })

                res.status(201).json({ token: token, userId: existingUser._id, email: existingUser.email })
            }
        }
    }
    catch (err) {
        console.error(err);
    }

});

recordRoutes.route('/update_user').put(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const formData = req.body.formData;

    try {
        const query = { user_id: formData.user_id };
    }
    catch (err) {
        console.error(err);
    }
});



module.exports = recordRoutes;