const express            = require('express'),
      router             = express.Router(),
      passport           = require('passport'),
      LocalStrategy      = require('passport-local').Strategy;
      mainController     = require('./controllers/main.controller'),
      timesController    = require('./controllers/times.controller');
      usuariosController = require('./controllers/usuarios.controller.js')

module.exports = router;

router.get('/', usuariosController.usuarioAutenticado, mainController.paginaInicial);

router.get('/times', usuariosController.usuarioAutenticado,timesController.listarTodos);

router.get('/times/incluir', usuariosController.usuarioAutenticado, timesController.exibirFormIncluir);
router.post('/times/incluir', timesController.incluirTime);

router.get('/times/:slug/editar', timesController.exibirFormEditar);
router.post('/times/:slug',     timesController.editarTime);

router.get('/times/:slug/deletar', timesController.excluirTime);

router.get('/times/:slug', timesController.listarTime);

router.get('/times/alimentar',  timesController.alimentarBanco);

router.get('/usuarios/registrar',usuariosController.exibirFormRegistrar);
router.post('/usuarios/registrar', usuariosController.registrarUsuario);

router.get('/usuarios/login', usuariosController.exibirFormLogin);

passport.use(new LocalStrategy(
    function(username, senha, done){
        Usuario.getUsuarioByUsername(username, function(err, usuario){
            if(err) throw err;
            if(!usuario){
                return done(null, false, {message: 'Usuário não cadastrado'});
            }

            Usuario.compararSenha(senha, usuario.senha, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, usuario);
                } else {
                    return done(null, false, {message: 'Senha inválida!'});
                }
            });
        });
    }));

passport.serializeUser(function(usuario, done){
    done(null, usuario.id);
})

passport.deserializeUser(function(id, done){
    Usuario.getUsuarioById(id, function(err, usuario){
        done(err, usuario);
    });
});

router.post('/usuarios/login',
      passport.authenticate('local', {successRedirect:'/', failureRedirect: '/usuarios/login', failureFlash: true}),
      function(req, res){
            res.redirect('/');
      });

router.get('/logout', function(req, res){
      req.logout();
      req.flash('success', 'Você se desconectou!');
      res.redirect('usuarios/login');
});