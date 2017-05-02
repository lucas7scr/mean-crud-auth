const Time = require('../models/time');

//exportando todas funções criadas
module.exports = {
  listarTodos: listarTodos,
  listarTime: listarTime,
  alimentarBanco: alimentarBanco,
  exibirFormIncluir: exibirFormIncluir,
  incluirTime: incluirTime,
  exibirFormEditar: exibirFormEditar,
  editarTime: editarTime,
  excluirTime: excluirTime
}

/*================= FUNÇÃO P/ LISTAR TODOS TIMES ===================*/

function listarTodos(req, res) { 
  Time.find({}, (err, times) => {   //tipo um select no mongod (find{})
    if (err) {                      //caso possua erros
      res.status(404);              //essa msg erro 404
      res.send('Time não encontrado!');
    }

    res.render('pages/times', {     //renderizar a página
      times: times,                 //listar os times
      success: req.flash('success') //mensagem de sucesso com o flash
    });
  });
}

/*================= FUNÇÃO P/ LISTAR O TIME APÓS CLICAR EM VISUALIZAR ===================*/

function listarTime(req, res) {
  Time.findOne({ slug: req.params.slug }, (err, time) => { //listar 1 único time (de acordo com oq vc clicar)
    if (err) {                                             //caso possua erros
      res.status(404);                                     //essa msg erro 404
      res.send('Time não encontrado!');
    }

    res.render('pages/single', {     //renderizar a página                              
      time: time,                    //listar os times
      success: req.flash('success')  //mensagem de sucesso com o flash
    });
  });
}

/*================= FUNÇÃO P/ EXIBIR O FORMULÁRIO DE INCLUSÃO ===================*/

function exibirFormIncluir(req, res) {
  res.render('pages/incluir', {   //renderizando a pag incluir
    errors: req.flash('errors')   //msgs de erro com o FLASH :D
  });
}

/*================= FUNÇÃO P/ INCLUIR TIME ===================*/

function incluirTime(req, res) {
  //validação
  req.checkBody('nome', 'Preencha o campo Nome').notEmpty();
  req.checkBody('descricao', 'Preencha o campo Descrição').notEmpty();

  const errors = req.validationErrors();              //express-validator in action
  if (errors) {                                      
    req.flash('errors', errors.map(err => err.msg));  
    return res.redirect('/times/incluir');
  }

  const time = new Time({            //objeto Time
    nome: req.body.nome,
    descricao: req.body.descricao
  });

  time.save((err) => {              //save no mongodb (tipo um insert)
    if (err) throw err;             //se tiver erro mostra ae

    req.flash('success', 'Cadastrado com sucesso!');   //msgs flash :O
    res.redirect(`/times/${time.slug}`);               //redirect p/ o time q acabou de adicionar (com SLUG)
  });
}

/*================= FUNÇÃO P/ EXIBIR O FORMULÁRIO EDITAR ===================*/

function exibirFormEditar(req, res) {
  Time.findOne({ slug: req.params.slug }, (err, time) => {    //findOne com slug (ou seja, select no time q vc quer editar)
    res.render('pages/editar', {                              ////renderizando a pag incluir
      time: time,
      errors: req.flash('errors')                             //msgs de erro com o FLASH :D
    });
  });
}

/*================= FUNÇÃO P/ EDITAR TIME ===================*/

function editarTime(req, res) {
  //validação
  req.checkBody('nome', 'Preencha o campo Nome').notEmpty();
  req.checkBody('descricao', 'Preencha o campo Descrição').notEmpty();

  const errors = req.validationErrors();              //express-validator in action
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/times/${req.params.slug}/editar`); //redirect p/ o time q vc quer editar (com SLUG)
  }

    Time.findOne({ slug: req.params.slug }, (err, time) => { //findOne com slug (ou seja, select no time q vc quer editar)
    time.nome        = req.body.nome;                        //pegndo o nome
    time.descricao = req.body.descricao;                     //pegando a desc

    time.save((err) => {                                     //save no mongodb (tipo um insert)
      if (err) throw err;                                    //se tiver erro mostra ae

      req.flash('success', 'Atualizado com sucesso!');       //msgs flash :O
      res.redirect('/times');                                //redirect p/ o time q acabou de adicionar (com SLUG)
    });
  });

}

/*================= FUNÇÃO P/ EXCLUIR TIME ===================*/

function excluirTime(req, res) {
  Time.remove({ slug: req.params.slug }, (err) => {          //remove (ou seja, delete no mongoDB com SLUG)
    req.flash('success', 'Deletado com sucesso!');           //msgs flash :O
    res.redirect('/times');                                  //redirect
  });
}

/*================= FUNÇÃO P/ REALIZAR CADASTROS NO MONGODB ===================*/

function alimentarBanco(req, res) {
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

  res.send('times inseridos rs');
}