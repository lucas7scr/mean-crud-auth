const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const usuarioSchema = mongoose.Schema({
    username:{
        type: String,
        index:true
    },
    senha:{
        type:String
    },
    email:{
        type: String
    },
    name:{
        type:String
    }
});

var Usuario = module.exports = mongoose.model('Usuario', usuarioSchema);

//encriptografando a senha
//https://www.npmjs.com/package/bcryptjs
module.exports.criarUsuario = function(novoUsuario, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(novoUsuario.senha, salt, function(err, hash){
            novoUsuario.senha = hash;
            novoUsuario.save(callback);   
        });
    });
}

//find no mongodb para pegar o username
module.exports.getUsuarioByUsername = function(username, callback){
    var query = {username: username};
    Usuario.findOne(query, callback);
}

//find no mongodb para pegar o id do usuario
module.exports.getUsuarioById = function(id, callback){
    Usuario.findById(id, callback);
}

//comparando as senhas com o bcrypt
module.exports.compararSenha = function(candidatoSenha, hash, callback){
    bcrypt.compare(candidatoSenha, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch)
    })
}
