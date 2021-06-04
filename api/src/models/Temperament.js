const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    ID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
};
