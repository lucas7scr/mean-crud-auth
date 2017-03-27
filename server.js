//carregando as variáveis ambiente
require('dotenv').config();

//dependências
const express   = require('express'),
  app            = express(),
  porta          = process.env.PORT || 8080;
  expressLayouts = require('express-ejs-layouts'),
  mongoose       = require('mongoose'),
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  flash          = require('connect-flash'),
  expressValidator = require('express-validator');

//configurando a aplicação
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,   
  cookie: { maxAge: 60000 },
  resave: false,            //força a sessão a ser salva
  saveUninitialized: false  //não salva o q não foi modificado
}));
app.use(flash());

//apontando o express.js onde procurar pelos arquivos estáticos do css usando o 'static'
//app.use(express.static(__dirname + '/public'));

//setando o ejs como template padrão
app.set('view engine', 'ejs');
app.use(expressLayouts);

//conexão com o mongodb
mongoose.connect(process.env.DB_URI);

//usar bodyParser para pegar informação do form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

//configurando as rotas 
app.use(require('./app/routes'));

//start server com o express
app.listen(porta, () => {
    console.log(`Aplicação rodando em http://localhost:${porta}`);
});