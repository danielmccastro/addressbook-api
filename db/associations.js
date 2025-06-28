const User = require("../model/userModel");
const Contact = require("../model/contactModel");

function setAssociations() {
    User.hasMany(Contact, { foreignKey: "id_user" });
    Contact.belongsTo(User, { foreignKey: "id_user" });
}

module.exports = setAssociations;