const express = require('express');
const bodyParser = require('body-parser');



// express app
const app = express();

app.use(express.static('public'));

// parse request content of type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse request content of type application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// simple route
app.get('/', (req, res) => {
    res.json({"message": "Employee Entity Application"});
});

// Employees routes
require('./app/routes/employee.routes.js')(app);

// listening for request on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
