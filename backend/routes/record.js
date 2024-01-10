const express = require("express");
const recordRoutes = express.Router();
const dbo = require('../db/conn');
const { v4: uuidv4 } = require('uuid');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// formularz rejestracji
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
                user_id: generatedUserId,
                email: sanitizedEmail,
                hashed_password: hashedPassword,
            });

            const token = jwt.sign(insertedUser, sanitizedEmail, {
                expiresIn: '1h'
            })

            res.status(201).json({ token: token, userId: generatedUserId })
        }
    }
    catch (err) {
        console.error(err);
    }
});

// funkcja testowa - zwraca wszystkich użytkowników
recordRoutes.route('/get_all_users').get(async function (req, res) {
    let db_connect = dbo.getDb("tinder");
    try {
        let result = await db_connect.collection("users").find().toArray();
        res.json(result);
    } catch (err) {
        console.error(err);
    }
})

// funkcja testowa - usuwa wszystkich użytkowników
recordRoutes.route('/delete_all_users').delete(async function (req, res) {
    let db_connect = dbo.getDb("tinder");
    try {
        let result = await db_connect.collection("users").deleteMany();
        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

// formularz logowania
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

                res.status(201).json({ token: token, userId: existingUser.user_id })
            }
        }
    }
    catch (err) {
        console.error(err);
    }

});

// formularz rejestracji
recordRoutes.route('/update_user').put(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const formData = req.body;

    try {
        const query = { user_id: formData.user_id };
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                dob: formData.dob,
                gender: formData.gender,
                gender_interest: formData.gender_interest,
                img_url: formData.img_url,
                about: formData.about,
                location: formData.location,
                matches: formData.matches
            }
        }
        const result = await db_connect.collection("users").updateOne(query, updateDocument);

        res.json(result);

    }
    catch (err) {
        console.error(err);
    }
});

// znajdz uzytkownika - boarding
recordRoutes.route('/get_user').get(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const userId = req.query.userId;

    try {
        const query = { user_id: userId };
        const result = await db_connect.collection("users").findOne(query);

        res.send(result);

    }
    catch (err) {
        console.error(err);
    }
});

// dopasuj uzytkownikow na podstawie plci
recordRoutes.route('/gendered_users').get(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const pref_gender = req.query.gender;

    try {
        const query = { gender: pref_gender };
        const result = await db_connect.collection("users").find(query).toArray();

        res.send(result);
    } catch (err) {
        console.error(err);
    }
});



module.exports = recordRoutes;