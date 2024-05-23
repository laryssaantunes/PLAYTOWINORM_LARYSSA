const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Jogo = db.define('Jogo', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plataforma: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  lancamento: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Jogo;
