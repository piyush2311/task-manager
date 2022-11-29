const path = require('path');
const envFile = process.env.NODE_ENV ? '.env.'+process.env.NODE_ENV : '.env';
global.__base = __dirname + '/';
require('dotenv').config({path: path.join('config', envFile)});
const configFile = process.env.NODE_ENV ? 'config.'+process.env.NODE_ENV : 'config.development';
global.config = require('./config/'+configFile);
require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const rtsIndex = require('./routes/index.router');
var app = express();
const helmet = require('helmet');
app.use(helmet());
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
// middleware
var options = {
    //customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
      }
  };
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

app.use(express.static(path.join(__dirname, 'public/dist/task-app')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist/task-app/index.html'));
});

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));