const Time = require('../models/time');

module.exports = {
  listarTodos: listarTodos,
  listarTime: listarTime,
  seedTimes: seedTimes,
  listarAposIncluir: listarAposIncluir,
  incluirTime: incluirTime,
  listarAposEditar: listarAposEditar,
  editarTime: editarTime,
  excluirTime: excluirTime
}

/*================= FUNÇÃO P/ LISTAR TODOS TIMES ===================*/

function listarTodos(req, res) { 
  Time.find({}, (err, times) => {
    if (err) {
      res.status(404);
      res.send('Time não encontrado!');
    }

    res.render('pages/times', { 
      times: times,
      success: req.flash('success')
    });
  });
}

/*================= FUNÇÃO P/ LISTAR O TIME APÓS CLICAR EM VISUALIZAR ===================*/

function listarTime(req, res) {
  Time.findOne({ slug: req.params.slug }, (err, time) => {
    if (err) {
      res.status(404);
      res.send('Time não encontrado!');
    }

    res.render('pages/single', { 
      time: time,
      success: req.flash('success')
    });
  });
}

function seedTimes(req, res) {
  const times = [
    { nome: 'Sport Club do Recife', descricao: 'Maior do Brasil' },
    { nome: 'Santa Cruz', descricao: 'Menor de Recife' },
    { nome: 'Nautico', descricao: 'Fracasso Total' },
    { nome: 'Salgueiro', descricao: 'Maior do Interior' }
  ];

  Time.remove({}, () => {
    for (time of times) {
      var newTime = new Time(time);
      newTime.save();
    }
  });

  res.send('Database att!');
}

/*================= FUNÇÃO P/ LISTAR O TIME CADASTRADO ===================*/

function listarAposIncluir(req, res) {
  res.render('pages/incluir', {
    errors: req.flash('errors')
  });
}

/*================= FUNÇÃO P/ INCLUIR TIME ===================*/

function incluirTime(req, res) {
  //validação
  req.checkBody('nome', 'Preencha o campo Nome').notEmpty();
  req.checkBody('descricao', 'Preencha o campo Descrição').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/times/incluir');
  }

  const time = new Time({
    nome: req.body.nome,
    descricao: req.body.descricao
  });

  time.save((err) => {
    if (err) throw err;

    req.flash('success', 'Cadastrado com sucesso!');
    res.redirect(`/times/${time.slug}`);
  });
}

/*================= FUNÇÃO P/ LISTAR O TIME EDITADO ===================*/

function listarAposEditar(req, res) {
  Time.findOne({ slug: req.params.slug }, (err, time) => {
    res.render('pages/editar', {
      time: time,
      errors: req.flash('errors')
    });
  });
}

/*================= FUNÇÃO P/ EDITAR TIME ===================*/

function editarTime(req, res) {
  //validação
  req.checkBody('nome', 'Preencha o campo Nome').notEmpty();
  req.checkBody('descricao', 'Preencha o campo Descrição').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/times/${req.params.slug}/editar`);
  }

    Time.findOne({ slug: req.params.slug }, (err, time) => {
    time.nome        = req.body.nome;
    time.descricao = req.body.descricao;

    time.save((err) => {
      if (err)
        throw err;

      req.flash('success', 'Atualizado com sucesso!');
      res.redirect('/times');
    });
  });

}

/*================= FUNÇÃO P/ EXCLUIR TIME ===================*/

function excluirTime(req, res) {
  Time.remove({ slug: req.params.slug }, (err) => {
    req.flash('success', 'Deletado com sucesso!');
    res.redirect('/times');
  });
}