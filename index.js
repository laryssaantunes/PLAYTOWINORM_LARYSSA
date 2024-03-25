require("dotenv").config();
const coon = require("./db/conn");

const Usuario = require("./models/Usuario");

const express = require("express");
const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.get("/usuarios/novo", (req, res) => {
    res.sendFile('${__dirname}/views/formUsuario.html');
});

app.post("/usuario/novo", async (req, res) => {
    const nickname = req.body.nickname;
    const nome = req.body.nome;

    const dadosUsuario = {
        nickname,
        nome,
    }

    const usuario = await Usuario.create(dadosUsuario);

    res.send("Usuário inserido sob o id" + usuario.id)
})

    app.listan(8000);

conn
.sync()
.then(()=>{
    console.log("conectado e sincronizado!");
})
.catch( (err) =>{
    console.log("Ocorreu um erro:" +  err)
});
