const express            = require('express'),
      router             = express.Router(),
      mainController     = require('./controllers/main.controller'),
      timesController    = require('./controllers/times.controller');
      usuariosController = require('./controllers/usuarios.controller.js')

module.exports = router;

router.get('/', mainController.paginaInicial);

router.get('/times',       timesController.listarTodos);

router.get('/times/seed',  timesController.seedTimes);

router.get('/times/incluir',  timesController.listarAposIncluir);
router.post('/times/incluir', timesController.incluirTime);

router.get('/times/:slug/editar', timesController.listarAposEditar);
router.post('/times/:slug',     timesController.editarTime);

router.get('/times/:slug/deletar', timesController.excluirTime);

router.get('/times/:slug', timesController.listarTime);

router.post('/usuarios/registrar', usuariosController.registrarUsuario);