const { MongoClient } = require("mongodb");
const Db = process.env.MONGO_URI;

const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err) {
                console.error(err);
            }
            if (db)
            {
                _db = db.db("tinder");
                console.log("Successfully connected to MongoDB.");
            }
            if (callback) {
                return callback(err)
            }
        });
    },

    getDb: function () {
        return _db;
    },
};
