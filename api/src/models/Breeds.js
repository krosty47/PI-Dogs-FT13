const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('breeds', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        nameB: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        years: {
            type: DataTypes.STRING,
        },
    });
};
