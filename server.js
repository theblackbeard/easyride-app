'use strict'
require('./config/database')
const express 		= require('express')
const app 			= express()
const passport		= require('passport');
const jwt         	= require('jwt-simple');
const bodyParser  	= require('body-parser')
const morgan 		= require('morgan')
const PORT 			= process.env.OPENSHIFT_NODEJS_PORT || 8000
const IP 			= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(passport.initialize());


require('./config/passport')(passport);

require('./config/admin')(app,passport)

app.listen(PORT, IP, function(){
    console.log('Server Opened!' + IP + " " + PORT)
})
