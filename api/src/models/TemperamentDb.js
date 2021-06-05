const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperamentDb', {
    ID: {
      type: DataTypes.UUID,
      allowNull: false,
      primarykey: true
    },
    nameT: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
};
