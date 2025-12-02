const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Rota para cadastro
app.post('/cadastro', (req, res) => {
    const { nome_usuario, email, senha } = req.body;

    if(!nome_usuario || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const query = 'INSERT INTO usuarios (nome_usuario, email, senha) VALUES (?, ?, ?)';
    db.query(query, [nome_usuario, email, senha], (err, result) => {
        if(err) {
            console.error('Erro ao cadastrar usuário:', err);
            return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        }

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// Rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if(!email || !senha){
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    db.query(query, [email, senha], (err, results) => {
        if(err){
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ message: 'Erro ao realizar login' });
        }

        if(results.length > 0){
            res.status(200).json({ message: 'Login realizado com sucesso!' });
        } else {
            res.status(401).json({ message: 'E-mail ou senha incorretos' });
        }
    });
});
