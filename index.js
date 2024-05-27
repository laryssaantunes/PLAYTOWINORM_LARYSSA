//Importação de módulos
require("dotenv").config();
const express = require("express");
const conn = require("./db/conn");
const Usuario = require('./models/Usuario');
const Jogo = require('./models/Jogo');
const exphbs = require("express-handlebars");


//Instanciaçao do servidor
const app = express();

//Vinculação do Handlebars ao Express 
app.engine("handelebars", exphbs.engine());
app.set("view engine", "handlebars");

//Configuração no express para facilitar a captura de dadpos de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para carregar o formulário de criação de usuário

app.get("/", (req, res)=> {
res.render("home");
});

app.get("/usuario", async (req, res) => {
    const usuario = await Usuario.findAll ({raw: true});
    res.render("usuarios", { usuarios} );
})

app.get("/usuarios/novo", (req, res) => {
   res.render("formUsuario");
});

app.get("/jpogo/novo" , (req, res ) => {
    res.sendFile('${__dirname}/views/formJogo.html');
});

app.post("/usuario/novo", async (req, res) => {
    const dadosUsuario ={
    nickname:  req.body.nickname,
    nome: req.body.nome,
};
        
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







