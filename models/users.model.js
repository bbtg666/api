var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

 var userSchema = Schema({
     email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
     },
     name: {
        type: String,
        trim: true,
        required: true
     },
     hash_password: {
        type: String
      },
      created: {
        type: Date,
        default: Date.now
      }
 });

 userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
 
 module.exports = mongoose.model("user", userSchema);