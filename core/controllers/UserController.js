'use strict';
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../../config/config')



exports.index = (req, res) => {
  User.find({}, (err, data)=> {
    if(err) return res.json({success: false, msg: err})
    res.json(data);  
  })
}

exports.store = (req, res) => {
	 const obj = req.body;
   User.create(obj, (err, data) => {
     if(err) return res.json({success: false, msg: err.errmsg})
     res.json({success: true, msg: 'Usuario Cadastrado com Sucesso!.'});
   });
}

exports.show = (req, res) => {
  const query = req.params.userid
        User.findById(query, (err, data) => {
            if(err) return res.json({success: false, msg: err.errmsg})
            res.json(data);
  });
}

exports.update = (req, res) => {
  const query = req.params.userid;
  const mod = req.body;
  User.update(query, mod, { runValidators: true}, (err, data) => {
     if(err) return res.json({success: false, msg: err})
     res.json({success: true, msg: 'Usuario Atualizado com Sucesso!.'});
  })
}

exports.delete = (req, res) => {
    const query = {_id : req.params.userid};
     User.remove(query, (err, data) => {
        if(err) return res.json({success: false, msg: err})
        res.json({success: true, msg: 'Usuario Deletado com Sucesso!.'});
     })
}

exports.auth = (req, res) => {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.send({success: false, msg: 'Erro na autenticação. Usuario não existente'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Erro na autenticação: Senha incorreta.'});
        }
      });
    }
  });
}