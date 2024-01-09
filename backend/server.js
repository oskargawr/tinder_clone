const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000
app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));
app.use(bodyParser.json());
const dbo = require('./db/conn');


app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`serwer chodzi na porcie: ${port}`);
});
