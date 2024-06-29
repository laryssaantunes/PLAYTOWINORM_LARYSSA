const db = require("../db/conn");
const { DataTypes } = require("sequelize");
const Jogo = require("../models/Jogo");

const Conquista = db.define(
  "Conquista",
  {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      jogoId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Jogo',
          key: 'id'
        }
      }
    });
    Conquista.belongsTo(Jogo);
    Jogo.hasMany(Conquista);

    module.exports = Conquista;