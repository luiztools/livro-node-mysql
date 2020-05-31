//6.1
mysqld -u root

//6.2
mysql -u root -p

//6.3
SELECT * FROM clientes;

//6.4
INSERT INTO clientes (nome, idade, uf) VALUES ('Luiz', 32, 'RS');	

//6.5
SELECT * FROM clientes WHERE uf='RS'

//6.6
SELECT * FROM clientes WHERE uf='RS' OR uf='SC'

//6.7
SELECT * FROM clientes WHERE uf IN ('RS', 'SC')

//6.8
SELECT * FROM clientes WHERE idade >= 18

//6.9
SELECT * FROM clientes WHERE nome LIKE 'L%'

//6.10
SELECT * FROM clientes WHERE nome LIKE 'L%' AND idade > 18

//6.11
SELECT * FROM clientes WHERE idade > 18 LIMIT 10

//6.12
SELECT * FROM clientes WHERE idade > 18 ORDER BY nome LIMIT 10

//6.13
UPDATE clientes SET nome='Luiz Fernando', uf = 'RS' WHERE id=1;

//6.14
DELETE FROM clientes WHERE id=2

//6.15
npm install mysql

//6.16
ALTER USER 'root'@'localhost' IDENTIFIED BY '';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua-senha-aqui';

//6.17
const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'luiztools',
    database : 'crud'
});

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou no MysQL!');
})

module.exports = { }

//6.18
const connectionString = 'mysql://root:luiztools@localhost:3306/crud'; 
const connection= mysql.createConnection(connectionString); 

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou no MysQL!');
})

module.exports = { }

//6.19
global.db = require('../db')

//6.20
function selectClientes(callback){
    connection.query('SELECT * FROM clientes;', callback);
}

module.exports = { selectClientes }

//6.21
/* GET home page. */
router.get('/', function(req, res) {
    global.db.selectClientes((error, results) => {
        if(error) { return console.log(error); }
        res.render('index', { results });
    })
  })

//6.22
<% if(!results || results.length == 0) { %>
    <tr>
      <td colspan="4">Nenhum cliente cadastrado.</td>
    </tr>
<% } %>

//6.23
<% } else { 
    results.forEach(function(cliente){ %>
      <tr>
        <td style="width:50%"><%= cliente.nome %></td>
        <td style="width:15%"><%= cliente.idade %></td>
        <td style="width:15%"><%= cliente.uf %></td>
        <td><!-- em breve --></td>
      </tr>
    <% }) 
}%>

//6.24
npm start

//6.25
function insertCliente(cliente, callback){
    const sql = "INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);";
    connection.query(sql, [cliente.nome, cliente.idade, cliente.uf], callback);
}

module.exports = { selectClientes, insertCliente }

//6.26
/* POST new page. */
router.post('/new', function(req, res, next) {
    const nome = req.body.nome
    const idade = !req.body.idade ? null : parseInt(req.body.idade);
    const uf = req.body.uf
    global.db.insertCliente({nome, idade, uf}, (error) => {
            if(error) { return console.log(error); }
            res.redirect('/?new=true')
        })
  })

//6.27
<td><a href="/edit/<%= cliente.id %>">Editar</a></td>

//6.28
function selectCliente(id, callback){  
    const sql = "SELECT * FROM clientes WHERE id=?";
    connection.query(sql, [id], callback);
}

module.exports = { selectClientes, selectCliente, insertCliente }

//6.29
/* GET edit page. */
router.get('/edit/:id', function(req, res, next) {
    const id = parseInt(req.params.id);
    global.db.selectCliente(id, (error, results) => {
        if(error) { return console.log(error) }
        res.render('new', { title: 'Edição de Cliente', result: results[0], action: '/edit/' + id });
      })
  })

//6.30
/* GET new page. */
router.get('/new', function(req, res, next) {
    res.render('new', { title: "Cadastro de Cliente", result: {}, action: "/new" });
  })

//6.31
<form action="<%= action %>" method="POST">
    <p>
        <label>Nome: <input type="text" name="nome" value="<%= result.nome %>" /></label>
    </p>
    <p>
        <label>Idade: <input type="number" name="idade" value="<%= result.idade %>" /></label>
    </p>
    <p>
        <label>UF: <select name="uf">
                <% const s = "selected" %>
                <option <% if(result.uf === "RS") { %><%= s %><% } %>>RS</option>
                <option <% if(result.uf === "SC") { %><%= s %><% } %>>SC</option>
                <option <% if(result.uf === "PR") { %><%= s %><% } %>>PR</option>
                <!-- coloque os estados que quiser -->
            </select></label>
    </p>
    <p>
        <a href="/">Cancelar</a> | <input type="submit" value="Salvar" />
    </p>
</form>

//6.32
function updateCliente(id, cliente, callback){
    const sql = "UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?";
    connection.query(sql, [cliente.nome, cliente.idade, cliente.uf, id], callback);
}

module.exports = { selectClientes, selectCliente, insertCliente, updateCliente }

//6.33
/* POST edit page. */
router.post('/edit/:id', function(req, res) {
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const idade = !req.body.idade ? null : parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.updateCliente(id, {nome, idade, uf}, (error) => {
        if(error) { return console.log(error) }
        res.redirect('/?edit=true')
    })
})

//6.34
<td>
   <a href="/edit/<%= cliente.id %>">Editar</a>
   <a href="/delete/<%= cliente.id %>" onclick="return confirm('Tem certeza?');">Excluir</a>
</td>

//6.35
function deleteCliente(id, callback){
    connection.query('DELETE FROM clientes WHERE id=?;', [id], callback);
}

module.exports = { selectClientes, selectCliente, insertCliente, updateCliente, deleteCliente }

//6.36
/* GET delete page. */
router.get('/delete/:id', function(req, res) {
  const id = parseInt(req.params.id);
  global.db.deleteCliente(id, (error) => {
        if(error) { return console.log(error) }
        res.redirect('/?delete=true');
      })
})

//6.37
/* GET home page. */
router.get('/', function(req, res) {
  global.db.selectClientes((error, results) => {
    if(error) { return res.redirect('/?erro=' + error); }
    res.render('index', { results });
  })
})

//6.38
<script>
  if(location.href.indexOf('delete=true') != -1){
      alert('Cliente excluído com sucesso!');
  }
  else if(location.href.indexOf('edit=true') != -1){
      alert('Cliente editado com sucesso!');
  }
  else if(location.href.indexOf('new=true') != -1){
      alert('Cliente cadastrado com sucesso!');
  }
  else if(location.href.indexOf('erro') != -1){
      alert('Ocorreu um erro!');
  }
</script>