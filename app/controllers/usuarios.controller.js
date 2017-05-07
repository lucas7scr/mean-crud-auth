const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/usuario');

module.exports = {
    registrarUsuario: registrarUsuario,
    exibirFormRegistrar: exibirFormRegistrar,
    exibirFormLogin: exibirFormLogin,
    usuarioAutenticado: usuarioAutenticado
}

/*================= FUNÇÃO P/ REGISTRAR USUÁRIO ===================*/
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
        return res.redirect('/usuarios/registrar'); 
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

    req.flash('success', 'Você foi registrado e já pode realizar seu login!')
    res.redirect('/usuarios/login') 
}

/*================= FUNÇÃO P/ EXIBIR O FORMULÁRIO DE REGISTRO ===================*/
function exibirFormRegistrar(req, res){
    res.render('pages/registrar', {
        errors: req.flash('errors')
    });
}

/*================= FUNÇÃO P/ EXIBIR O FORMULÁRIO DE LOGIN ===================*/
function exibirFormLogin(req, res){
    res.render('pages/login', {
        errors: req.flash('errors')
    });
}

function usuarioAutenticado(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('usuarios/login');
    }
}