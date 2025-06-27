const Contact = require("../model/contactModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = class contactController {
    static async contactCreate(req, res) {
        const { first_name, last_name, email, phone_number, address } = req.body;
        try {
            const contact = await Contact.create(
                {
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    address,
                    id_user: req.user.id_user
                }
            );
            res.status(201).json(contact);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async contactRead(req, res) {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const contacts = await Contact.findAll({ where: { id_user: req.user.id_user } });
            res.status(200).json(contacts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async contactUpdate(req, res) {
        const { first_name, last_name, email, phone_number, address } = req.body;
        const { id_contact } = req.params;

        try {
            const [updatedRowsCount] = await Contact.update(
                {
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    address
                },
                {
                    where:
                    {
                        id_contact,
                        id_user: req.user.id_user
                    }
                }
            );
            if (updatedRowsCount === 0) {
                return res.status(404).json({ error: 'Contact not found' });
            }
            const contact = await Contact.findOne(
                {
                    where:
                    {
                        id_contact,
                        id_user: req.user.id_user
                    }
                }
            );
            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async contactDelete(req, res) {
        const { id_contact } = req.params;

        try {
            const deletedRowsCount = await Contact.destroy(
                {
                    where:
                    {
                        id_contact,
                        id_user: req.user.id_user
                    }
                }
            );
            if (deletedRowsCount === 0) {
                return res.status(404).json({ error: 'Contact not found or not authorized' });
            }
            res.status(200).json({ message: 'Contact deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}