const Sequelize = require("sequelize");
const database = require("../db/db");

const User = database.define("user", {
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, { database, modelname: "user", tablename: "user" });

User.hasMany(Contact, { foreignKey: 'id_user' });

module.exports = User;