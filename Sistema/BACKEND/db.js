// Importar o MySQL
const mysql = require('mysql');

// Criar a conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',     // Servidor do MySQL
    user: 'root',          // Usuário do MySQL
    password: '',          // Senha do MySQL
    database: 'gourmetify' // Nome do Banco de Dados
});

// Conectar ao banco
db.connect((err) => {
    if (err) {
        console.error(' Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log(' Conectado ao banco de dados MySQL!');
});

// Exportar a conexão para ser usada em outros arquivos
module.exports = db;
