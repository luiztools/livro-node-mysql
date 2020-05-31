//db.js
const mysql = require('mysql');

const connectionString = 'mysql://root:luiztools@localhost:3306/crud'; 
const connection= mysql.createConnection(connectionString); 

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou no MysQL!');
})

function selectClientes(callback){
    connection.query('SELECT * FROM clientes;', callback);
}

function selectCliente(id, callback){  
    const sql = "SELECT * FROM clientes WHERE id=?";
    connection.query(sql, [id], callback);
}

function insertCliente(cliente, callback){
    const sql = "INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);";
    connection.query(sql, [cliente.nome, cliente.idade, cliente.uf], callback);
}

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

function deleteCliente(id, callback){
    connection.query('DELETE FROM clientes WHERE id=?;', [id], callback);
}

module.exports = {selectClientes, selectCliente, insertCliente, updateCliente, deleteCliente}