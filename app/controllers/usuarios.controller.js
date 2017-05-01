/*================= FUNÇÃO P/ REGISTRAR USUÁRIO ===================*/

const Usuario = require('../models/usuario');

module.exports = {
    registrarUsuario: registrarUsuario
}

function registrarUsuario(req, res){
    //validação
    req.checkBody('nome', 'Favor preencher o nome').notEmpty();
    req.checkBody('email', 'Favor preencher o email').notEmpty();
    req.checkBody('email', 'Favor inserir e-mail válido').notEmpty();
    req.checkBody('username', 'Favor inserir nome de usuário').notEmpty();
    req.checkBody('senha', 'Favor preencher sua senha').notEmpty();
    req.checkBody('senha2', 'As senhas não coincidem!').equals(req.body.senha);

    const errors = req.validationErrors();
    if(errors){
        req.flash('errors', errors.map(err => err.msg));
        return res.direct('/usuarios/registrar');   
    }

    const novoUsuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        username: req.body.username,
        senha: req.body.senha
    })

    Usuario.criarUsuario(novoUsuario, function(err, usuario){
        if(err) throw err
        console.log(usuario)
    })

    req.flash('sucess', 'Usuário registrado com sucesso')
    //res.redirect('/usuarios/login')

  
}