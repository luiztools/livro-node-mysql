//7.1
npm init

//7.2
npm i express mysql body-parser

//7.3
const mysql = require('mysql');

const connectionString = 'mysql://root:luiztools@localhost:3306/crud'; 
const connection= mysql.createConnection(connectionString); 

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('Conectou no MySQL!');
})

module.exports = {}

//7.4
global.db = require('./db')
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão

//7.5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//7.6
//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//7.7
//inicia o servidor
app.listen(port);
console.log('API funcionando!');

//7.8
node app

//7.9
function selectClientes(callback){
    connection.query('SELECT * FROM clientes;', callback);
}

module.exports = {selectClientes}

//7.10
// GET /clientes
router.get('/clientes', (req, res) => global.db.selectClientes((err, results) => {
    if(err) res.status(500).json({erro: err });
    else res.json(results);
}))

//7.11
function selectCliente(id, callback){  
    const sql = "SELECT * FROM clientes WHERE id=?";
    connection.query(sql, [id], callback);
}

module.exports = {selectClientes, selectCliente}

//7.12
// GET /clientes/{id}
router.get('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    global.db.selectCliente(id, (err, results) => {
        if(err) res.status(500).json(err);
        else res.json(results[0]);
    })
})

//7.13
function insertCliente(cliente, callback){
    const sql = "INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);";
    connection.query(sql, [cliente.nome, cliente.idade, cliente.uf], callback);
}

module.exports = {selectClientes, selectCliente, insertCliente}

//7.14
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

//7.15
curl -X POST -d "{'nome':'Curl', 'idade': 11, 'uf': 'RJ'}" http://localhost:3000/clientes

//7.16
function updateCliente(id, cliente, callback){
    const sql = "UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?;";
    connection.query(sql, [cliente.nome, cliente.idade, cliente.uf, id], callback);
}

module.exports = {selectClientes, selectCliente, insertCliente, updateCliente}

//7.17
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

//7.18
curl -X PUT -d "{'nome':'Postman', 'idade': 20, 'uf': 'SP'}" http://localhost:3000/clientes/9

//7.19
function updateCliente(id, cliente, callback){
    let sql = "UPDATE clientes SET ";
    const props = Object.entries(cliente);

    for(var i=0; i < props.length; i++){
        const item = props[i];
        if(i !== props.length - 1) //não é o último
            sql += ` ${item[0]}=?,`;
        else
            sql += ` ${item[0]}=? WHERE id=?;`;
    }

    const values = props.map(p => p[1]);
    values.push(id);
    connection.query(sql, values, callback);
}

//7.20
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

//7.21
curl -X PATCH -d "{'idade':53}" http://localhost:3000/clientes/9

//7.22
function deleteCliente(id, callback){
    connection.query('DELETE FROM clientes WHERE id=?;', [id], callback);
}

module.exports = {selectClientes, selectCliente, insertCliente, updateCliente, deleteCliente}

//7.23
// DELETE /clientes/{id}
router.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    global.db.deleteCliente(id, (err) => {
        if(err) res.status(500).json(err);
        else res.json({ message: 'Cliente excluído com sucesso!'})
    })
})

//7.24
curl -X DELETE http://localhost:3000/clientes/9