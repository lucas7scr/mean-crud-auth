//criando uma nova rota
const express      = require('express'),
  router           = express.Router(),
  mainController   = require('./controllers/main.controller'),
  timesController  = require('./controllers/times.controller');

//exportando a rota
module.exports = router;

//definir as rotas
//principais rotas
router.get('/', mainController.paginaInicial);

//rotas de eventos
router.get('/times',       timesController.listarTodos);

//visualizar eventos
router.get('/times/seed',  timesController.seedTimes);

//criar eventos
router.get('/times/incluir',  timesController.listarAposIncluir);
router.post('/times/incluir', timesController.incluirTime);

//editar eventos
router.get('/times/:slug/editar', timesController.listarAposEditar);
router.post('/times/:slug',     timesController.editarTime);

//deletar eventos
router.get('/times/:slug/deletar', timesController.excluirTime);

//visualizar somente 1 evento
router.get('/times/:slug', timesController.listarTime);