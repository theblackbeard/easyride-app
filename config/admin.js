'use strict'
const express = require('express')
const UserController = require('../core/controllers/UserController')
const config = require('./config')
const jwt = require('jwt-simple')
const User = require('../core/models/user')

module.exports = function(app, passport) {
	app.post('/api/auth', UserController.auth)
	/*MIDDLEWARE PAGE BLOCKED*/
	app.use(passport.authenticate('jwt', { session: false }), (req, res, next) => {
  		let token = getToken(req.headers);
  		if (token) {
	  		let decoded = jwt.decode(token, config.secret);
	  		User.findOne({
	  			 name: decoded.name
	  		}, (err, user) => {
	  			if(err) throw  err;
	  			if(!user)
	  				return res.status(403).send({success: false, msg: 'Falha na Autenticação: Usuario não encontrado'});
	  			else{
	  				next()
	  			}
	  		})
	  	}else{
	  		return res.status(403).send({success: false, msg: 'Token não informado.'});
	  	}	
	});

	app.get('/api/users', UserController.index)
	app.post('/api/users', UserController.store)
	app.get('/api/users/:userid', UserController.show)
	app.put('/api/users/:userid', UserController.update)
	app.delete('/api/users/:userid/delete', UserController.delete)
}

let getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};