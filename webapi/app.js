//app.js
global.db = require('./db');
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão

app.use(require('cors')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

// GET /clientes
router.get('/clientes', (req, res) => global.db.selectClientes((err, results) => {
    if(err) res.status(500).json({erro: err });
    else res.json(results);
}))

// GET /clientes/{id}
router.get('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    global.db.selectCliente(id, (err, results) => {
        if(err) res.status(500).json(err);
        else res.json(results[0]);
    })
})

// POST /clientes
router.post('/clientes', (req, res) => {
    const nome = req.body.nome
    const idade = !req.body.idade ? null : parseInt(req.body.idade);
    const uf = req.body.uf
    global.db.insertCliente({nome, idade, uf}, (err) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente cadastrado com sucesso!'})
    })
})

// PUT /clientes/{id}
router.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome
    const idade = !req.body.idade ? null : parseInt(req.body.idade);
    const uf = req.body.uf
    global.db.updateCliente(id, {nome, idade, uf}, (err) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente atualizado com sucesso!'})
    })
})

// PATCH /clientes/{id}
router.patch('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const cliente = {};
    if(req.body.hasOwnProperty("nome")) cliente.nome = req.body.nome;
    if(req.body.hasOwnProperty("idade")) cliente.idade = parseInt(req.body.idade);
    if(req.body.hasOwnProperty("uf")) cliente.uf = req.body.uf;
    
    global.db.updateCliente(id, cliente, (err) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente atualizado com sucesso!'})
    })
})

// DELETE /clientes/{id}
router.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    global.db.deleteCliente(id, (err) => {
        if(err) res.status(500).json(err);
        else res.json({ message: 'Cliente excluído com sucesso!'})
    })
})

app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
