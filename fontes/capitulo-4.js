//4.1
npm install -g https://github.com/luiztools/express-generator.git

//4.2
express --git workshop

//4.3
cd workshop
npm install

//4.4
npm start

//4.5
const app = require('../app');
const debug = require('debug')('workshop:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//4.6
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const index = require('./routes/index');
const users = require('./routes/users');

//4.7
const app = express();

//4.8
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//4.9
module.exports = app;

//4.10
// códigos…
const index = require('./routes/index');
const users = require('./routes/users');

// mais códigos...

app.use('/', index);
app.use('/users', users);

//4.11
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//4.12
res.render('index', { title: 'Express' });

//4.13
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//4.14
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>

//4.15
res.render('index', { title: 'Express' });

//4.16
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('new', { title: 'Novo Cadastro' });
});

module.exports = router;

//4.17
const new = require('./routes/new);
app.use('/new', new);

//4.18
//coloque todo o conteúdo abaixo dentro de um arquivo index.js
//rode o comando "npm init" na mesma pasta do index.js e apenas aperte Enter para tudo
//rode os comandos "npm install -S express fs" para instalar as dependências
//use o comando "node index" na pasta do index.js para iniciar esse programa
const express = require('express') ; 
const fs = require('fs');  //fs é o módulo file-system, para ler arquivos
const app = express();

app.get('/', processRequest);

function processRequest (request, response) {  
  readText(request, response);
  console.log('requisição terminou');
}

function readText (request, response) {  
  //salve um arquivo teste.txt junto a esse arquivo com qualquer coisa dentro
  fs.readFile('teste.txt', (err, data) => {
    if (err) {
        console.log('erro na leitura');
        return response.status(500).send('Erro ao ler o arquivo.');
      }
    response.write(data);
    response.end();
    console.log('leu arquivo');;
  });

  console.log('Lendo o arquivo, aguarde.');
}

app.listen(3000)