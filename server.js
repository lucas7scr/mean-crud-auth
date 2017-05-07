require('dotenv').config();

//dependências
const express          = require('express'),              
      app              = express(),
      port             = process.env.PORT || 8080,
      expressLayouts   = require('express-ejs-layouts'),
      mongoose         = require('mongoose'),
      bodyParser       = require('body-parser'),
      session          = require('express-session'),
      cookieParser     = require('cookie-parser'),
      flash            = require('connect-flash'),
      expressValidator = require('express-validator'),
      passport         = require('passport'),
      LocalStrategy    = require('passport-local').Strategy;

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,   
  cookie: { maxAge: 60000 },
  resave: true,            
  saveUninitialized: true  
}));

//connect flash
app.use(flash()); //msgs flash

//arquivos publicos acessiveis ao browser
app.use(express.static(__dirname + '/public'));

//templating com EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

//conexão com o mongodb
mongoose.connect(process.env.DB_URI);

//interpretando as informações submetidas de algum formulario com o bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //transformando as requisiçõe json em um objeto
app.use(expressValidator());

//passport
app.use(passport.initialize());
app.use(passport.session());

//variável global USUARIO
app.use(function (req, res, next){
  res.locals.usuario = req.usuario || null;
  next();
});

//middleware p/ requisições das rotas da aplicação
app.use(require('./app/routes'));

//start server
app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
});