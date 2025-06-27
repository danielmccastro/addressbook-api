const express = require('express');
const app = express();
const database = require('./db/db');
const routes = require('./routes/routes');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

try {
    database.sync();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
} catch (error) {
    console.log(`Database synchronization failed: ${error}`);
}