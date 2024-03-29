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
                matches: []
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

// dodaj dopasowanie
recordRoutes.route('/add_match').put(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const { userId, matchedUserId } = req.body;

    try {
        const query = { user_id: userId };
        const updateDocument = {
            $push: {
                matches: {
                    user_id: matchedUserId,
                }
            }
        }
        const result = await db_connect.collection("users").updateOne(query, updateDocument);

        res.json(result);

    }
    catch (err) {
        console.error(err);
    }
});

// znajdz dopasowania
recordRoutes.route('/users').get(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const userIds = JSON.parse(req.query.userIds);

    try {
        const pipeline = [
            {
                '$match': {
                    'user_id': {
                        '$in': userIds
                    }
                }
            },
            {
                '$unwind': '$matches'
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'matches.user_id',
                    'foreignField': 'user_id',
                    'as': 'matchedUser'
                }
            },
            {
                '$unwind': '$matchedUser'
            },
            {
                '$group': {
                    '_id': '$_id',
                    'user_id': { '$first': '$user_id' },
                    'email': { '$first': '$email' },
                    'about': { '$first': '$about' },
                    'dob': { '$first': '$dob' },
                    'first_name': { '$first': '$first_name' },
                    'gender': { '$first': '$gender' },
                    'gender_interest': { '$first': '$gender_interest' },
                    'img_url': { '$first': '$img_url' },
                    'last_name': { '$first': '$last_name' },
                    'location': { '$first': '$location' },
                    'matches': { '$push': '$matchedUser' } 
                }
            }
        ];
        const result = await db_connect.collection("users").aggregate(pipeline).toArray();

        res.send(result);
    } catch (err) {
        console.error(err);
    }
});

// znajdz wiadomosci
recordRoutes.route('/messages').get(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const userId = req.query.userId;
    const correspondingUserId = req.query.correspondingUserId;

    try {
        const query = { from_userId: userId, to_userId: correspondingUserId };
        const result = await db_connect.collection("messages").find(query).toArray();

        res.send(result);
    } catch (err) {
        console.error(err);
    }
});

// wyslij wiadomosc
recordRoutes.route('/message').post(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const { timestamp, from_userId, to_userId, message } = req.body;

    try {
        const result = await db_connect.collection("messages").insertOne({
            timestamp: timestamp,
            from_userId: from_userId,
            to_userId: to_userId,
            message: message
        });

        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

// funkcja testowa - pokaz wszystkie wiadomosci
recordRoutes.route('/get_all_messages').get(function (req, res) {
    let db_connect = dbo.getDb("tinder");
    db_connect.collection("messages").find().toArray()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
        });
});

// usun wiadomosc
recordRoutes.route('/messages/:id').delete(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const messageId = req.params.id;

    try {
        const query = { _id: new ObjectId(messageId) };
        const result = await db_connect.collection("messages").deleteOne(query);

        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

// usun uzytkownika
recordRoutes.route('/delete_user/:id').delete(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const userId = req.params.id;

    try {
        const query = { user_id: userId };
        const result = await db_connect.collection("users").deleteOne(query);

        res.json(result);
    } catch (err) {
        console.error(err);
    }
});

// edycja danych
recordRoutes.route('/edit_user').put(async function (req, res) {
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

// usun match
recordRoutes.route('/matches/:userId/:matchId').delete(function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const userId = req.params.userId;
    const matchId = req.params.matchId;

    const query = { user_id: userId };
    const updateDocument = {
        $pull: {
            matches: {
                user_id: matchId
            }
        }
    }

    db_connect.collection("users").updateOne(query, updateDocument)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
        });
});

// edytuj wiadomosc
recordRoutes.route('/messages/:id').put(function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const messageId = req.params.id;
    const { message } = req.body;

    const query = { _id: new ObjectId(messageId) };
    const updateDocument = {
        $set: {
            message: message
        }
    }

    db_connect.collection("messages").updateOne(query, updateDocument)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
        });
});

// pogrupuj wszystkich wedlug plci
recordRoutes.route('/group_users').get(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    try {
        const pipeline = [
            {
                '$group': {
                    '_id': '$gender',
                    'users': { '$push': '$$ROOT' }
                }
            }
        ];
        const result = await db_connect.collection("users").aggregate(pipeline).toArray();

        res.send(result);
    } catch (err) {
        console.error(err);
    }
});

// policz ile dany uzytkownik ma matchy
recordRoutes.route('/count_matches').get(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    try {
        const pipeline = [
            {
                '$unwind': '$matches'
            },
            {
                '$group': {
                    '_id': '$user_id',
                    'first_name': { '$first': '$first_name' },
                    'matchCount': { '$sum': 1 }
                }
            }
        ];
        const result = await db_connect.collection("users").aggregate(pipeline).toArray();

        res.send(result);
    } catch (err) {
        console.error(err);
    }
});

// znajdz uzytkownikow urodzonych pozniej niz rok podany w params
recordRoutes.route('/users/:year').get(async function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const year = parseInt(req.params.year);

    try {
        const pipeline = [
            {
                $addFields: {
                    dobDate: {
                        $dateFromString: {
                            dateString: "$dob"
                        }
                    }
                }
            },
            {
                $match: {
                    $expr: {
                        $gt: [{ $year: "$dobDate" }, year]
                    }
                }
            }
        ];
        const result = await db_connect.collection("users").aggregate(pipeline).toArray();

        res.send(result);
    } catch (err) {
        console.error(err);
    }
});

// zaladuj uzytkownika - funkcja ladowania z pliku
recordRoutes.route('/load_user').post(async function (req, res) {
    let db_connect = dbo.getDb("tinder");
    const { user } = req.body;
    console.log(user);

    const existingUser = await db_connect.collection("users").findOne({ email: user.email });

    try {
        if (existingUser) {
            console.log("User already exists");
            res.status(201).json({ message: "User already exists" });
        } else {
            const formattedUser = {
                user_id: user.user_id,
                email: user.email,
                hashed_password: user.hashed_password,
                about: user.about,
                dob: user.dob,
                first_name: user.first_name,
                gender: user.gender,
                gender_interest: user.gender_interest,
                img_url: user.img_url,
                last_name: user.last_name,
                location: user.location,
                matches: user.matches
            };

            const result = await db_connect.collection("users").insertOne(formattedUser);

            res.json(result);
        }
    }
    catch (err) {
        console.error(err);
    }
});

// delete one by _id
recordRoutes.route('/delete_user_by_id/:id').delete(function (req, res) {
    let db_connect = dbo.getDb("tinder");

    const userId = req.params.id;

    const query = { _id: new ObjectId(userId) };

    db_connect.collection("users").deleteOne(query)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = recordRoutes;