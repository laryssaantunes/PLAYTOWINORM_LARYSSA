module.exports = (sequelize, DataTypes) => {
    const Conquista = sequelize.define('Conquista', {
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
    
    Conquista.associate = (models) => {
      Conquista.belongsTo(models.Jogo, {
        foreignKey: 'jogoId',
        as: 'jogo'
      });
    };
    
    return Conquista;
  };