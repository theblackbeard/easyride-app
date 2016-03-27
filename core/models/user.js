'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
	  name: require('../modules/fields/field-name'),
    password: require('../modules/fields/field-password'),
    email: require('../modules/fields/field-email'),
    created_at: require('../modules/fields/field-created_at')
})

UserSchema.pre('save', function (next) {

 var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);