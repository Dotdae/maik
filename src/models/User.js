const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const UserSchema = new Schema({

    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}

});

// Cypher.

UserSchema.methods.encryptPassword = async (password) => {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));;

}

UserSchema.methods.matchPassword = function(password) {
    
    return bcrypt.compareSync(password, this.password);

}

module.exports = mongoose.model('User', UserSchema);