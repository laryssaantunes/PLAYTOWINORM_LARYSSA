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
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  lancamento: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Jogo;
