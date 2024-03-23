require("dotenv").config();
const coon = require("./db/conn");

conn
.authenticate()
.then(()=>{
    console.log("conectado ao banco de dados com sucesso!");
})
.catch( (err) =>{
    console.log("Ocorreu um erro:" +  err)
});