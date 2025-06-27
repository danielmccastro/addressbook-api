const Sequelize = require('sequelize');
const database = require('../db/db');
const User = require('./userModel');

const Contact = database.define("contact", {
    id_contact: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone_number: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { database, modelname: "contact", tablename: "contact" });

Contact.belongsTo(User, { foreignKey: "id_user" });

module.exports = Contact;