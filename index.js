const express = require("express");
const bodyParser = require('body-parser');
const db = require('./config/database');
const Usuario = require('./models/Usuario');
const Jogo = require('./models/Jogo');
const conn = require("./config/database");



require("dotenv").config();
const conn = require("./db/conn");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para carregar o formulário de criação de usuário
app.get("/usuarios/novo", (req, res) => {
    res.sendFile(`${__dirname}/views/formUsuario.html`);
});

// Rota para criar um novo usuário
app.post("/usuario/novo", async (req, res) => {
    const { nickname, nome } = req.body;
    const dadosUsuario = { nickname, nome };

    try {
        const usuario = await Usuario.create(dadosUsuario);
        res.send("Usuário inserido sob o id " + usuario.id);
    } catch (err) {
        res.status(500).send("Erro ao criar usuário: " + err.message);
    }
});

// Sincroniza o banco de dados e inicia o servidor
conn.sync()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}!`);
        });
    })
    .catch((err) => {
        console.log("Ocorreu um erro ao sincronizar o banco de dados: " + err);
    });

// Conexão com o banco de dados
db.authenticate()
    .then(() => console.log('Conexão com o banco de dados estabelecida...'))
    .catch(err => console.error('Erro ao conectar com o banco de dados:', err));

// Rotas para APIs
app.post('/api/usuarios', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/jogos', async (req, res) => {
    try {
        const jogo = await Jogo.create(req.body);
        res.status(201).json(jogo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});







