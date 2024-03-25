const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Usuario = db.afterDefine("Usuario", {
    nickname:{
        type: DataTypes.STRING,
        required: true,
    },
    nome: {
        Type: DataTypes.STRING,
        required: true,
    }
});

module.exports = Usuario;