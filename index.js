require('dotenv').config();
const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const database = require('./db/db');
const routes = require('./routes/routes');
const setAssociations = require('./db/associations');
const port = 443;

const keyPath = process.env.SSL_KEY_PATH;
const certPath = process.env.SSL_CERT_PATH;

const credentials = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);
setAssociations();

try {
    database.sync().then(() => {
        https.createServer(credentials, app).listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    });

} catch (error) {
    console.log(`Database synchronization failed: ${error}`);
}