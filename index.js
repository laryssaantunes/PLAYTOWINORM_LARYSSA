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
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//Configuração no express para facilitar a captura de dadpos de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota para carregar o formulário de criação de usuário

app.get("/", (req, res)=> {
res.render("home");
});

app.get("/usuarios", async (req, res) => {
    const usuarios = await Usuario.findAll ({raw: true});
    res.render("usuarios", { usuarios} );
})

app.get("/usuarios/novo", (req, res) => {
   res.render("formUsuario");
});

app.post("/usuarios/novo", async (req, res) => {
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

app.get("/usuarios/:id/update", async (req, res) => {
    const id = parseInt (req.params.id);
    const usuario = await Usuario.findByPk(id, {raw: true});
    res.render("formUsuario",{usuario});
});

app.post("/usuarios/:id/update", async (req, res) => {
    const id = postInt(req.params.id);

    const dadosUsuario = {
        nickname: {id: id},
        nome: req.body.nome,
     }

     const retorno = await Usuario.update(dadosUsuario,
        {where: {id: id},
    });

    if(retorno>0){
        res.redirect("/usuarios");
    } else {
        res.send("Erro ao atualizar usuário")
    }
});

app.post("/usuarios/:id/delete" , async (req, res) => {
    const id = parseInt(req.params.id);  

    
    const retorno = await Usuario.destroy({where: {id: id}});

    if(retorno > 0){
        res.redirect("/usuarios");
    } else {
        res.send("Erro ao excluir usuário");
    }
});


app.get("/jogos" , async (req,res) => {
    const jogos = await Jogo.findAll ({raw: true});
    res.render("jogos" , {jogos});
});

app.get("/jogos/novo" , (req, res ) => {
    res.render('formJogo');
});

app.post("/jogos/novo", async (req, res) => {
    const dadosJogos ={
    nomedojogo:  req.body.nomedojogo,
    plataforma: req.body.plataforma,
    genero: req.body.genero,
    preco: req.body.preco,
    datadenascimento: req.body.datadenascimento,
};
    try {
        const jogos = await Jogo.create(dadosJogos);
        res.send("Jogo inserido sob o id " + jogos.id);
    } catch (err) {
        res.status(500).send("Erro ao criar jogo: " + err.message);
    }
});

app.get("/jogos/:id/update", async (req, res) => {
    const id = parseInt (req.params.id);
    const jogos = await Jogo.findByPk(id, {raw: true});
    res.render("formJogo",{jogos});
});

app.post("/jogos/:id/update", async (req, res) => {
    const id = postInt(req.params.id);

    const dadosJogos = {
        nomedojogo:  req.body.nomedojogo,
         plataforma: req.body.plataforma,
         genero: req.body.genero,
         preco: req.body.preco,
         datadenascimento: req.body.datadenascimento,
     }

     const retorno = await Jogo.update(dadosJogos, {where: {id: id}});

    if(retorno>0){
        res.redirect("/jogos");
    } else {
        res.send("Erro ao atualizar jogo")
    }
});

app.post("/jogos/:id/delete" , async (req, res) => {
    const id = parseInt(req.params.id);  

    
    const retorno = await Jogo.destroy({where: {id: id}});

    if(retorno > 0){
        res.redirect("/jogos");
    } else {
        res.send("Erro ao excluir usuário");
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