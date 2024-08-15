const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Jogo = db.define('Jogo', {
  nome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  plataforma: {
    type: DataTypes.STRING,
    allowNull: true
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: true
  },
  preco: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  lancamento: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Jogo;
