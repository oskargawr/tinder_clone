const { MongoClient } = require("mongodb");
const Db = process.env.MONGO_URI;

const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _db;

module.exports = {
    connectToServer: async function (callback) {
        try {
            await client.connect();
            _db = client.db("tinder");
            console.log("Successfully connected to MongoDB.");
            if (callback) {
                callback(null);
            }
        } catch (err) {
            console.error(err);
            if (callback) {
                callback(err);
            }
        }
    },

    getDb: function () {
        return _db;
    },
};
