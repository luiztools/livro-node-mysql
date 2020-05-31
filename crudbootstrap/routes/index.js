var express = require('express');
var router = express.Router();

/* GET new page. */
router.get('/new', function(req, res, next) {
  res.render('new', { title: "Cadastro de Cliente", result: {}, action: "/new" });
})

/* POST new page. */
router.post('/new', function(req, res, next) {
  const nome = req.body.nome
  const idade = !req.body.idade ? null : parseInt(req.body.idade);
  const uf = req.body.uf
  global.db.insertCliente({nome, idade, uf}, (error) => {
      if(error) { return res.redirect('/?erro=' + error); }
      res.redirect('/?new=true')
  })
})

/* GET edit page. */
router.get('/edit/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  global.db.selectCliente(id, (error, results) => {
    if(error) { return res.redirect('/?erro=' + error); }
    res.render('new', { title: 'Edição de Cliente', result: results[0], action: '/edit/' + id });
  })
})

/* POST edit page. */
router.post('/edit/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const idade = !req.body.idade ? null : parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.updateCliente(id, {nome, idade, uf}, (error) => {
      if(error) { return res.redirect('/?erro=' + error); }
      res.redirect('/?edit=true')
  })
})

/* GET delete page. */
router.get('/delete/:id', function(req, res) {
  const id = parseInt(req.params.id);
  global.db.deleteCliente(id, (error) => {
    if(error) { return res.redirect('/?erro=' + error); }
    res.redirect('/?delete=true')
  })
})

/* GET home page. */
router.get('/', function(req, res) {
  global.db.selectClientes((error, results) => {
    if(error) { return res.redirect('/?erro=' + error); }
    res.render('index', { results });
  })
})

module.exports = router;
