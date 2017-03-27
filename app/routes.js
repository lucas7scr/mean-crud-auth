//criando uma nova rota
const express      = require('express'),
  router           = express.Router(),
  mainController   = require('./controllers/main.controller'),
  timeController = require('./controllers/time.controller');

//exportando a rota
module.exports = router;

//definir as rotas
//principais rotas
router.get('/', mainController.showHome);

//rotas de eventos
router.get('/time',       timeController.listarTodos);

//visualizar eventos
//router.get('/time/seed',  timeController.seedtime);

//criar eventos
router.get('/time/incluir',  timeController.listarAposCriar);
router.post('/time/incluir', timeController.incluirTime);

//editar eventos
router.get('/time/:slug/editar', timeController.listarAposEditar);
router.post('/time/:slug',     timeController.editarTime);

//deletar eventos
router.get('/time/:slug/deletar', timeController.excluirTime);

//visualizar somente 1 evento
router.get('/time/:slug', timeController.listarTime);