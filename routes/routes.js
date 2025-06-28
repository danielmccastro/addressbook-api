const express = require('express');
const router = express.Router();

const ContactController = require('../controller/contactController');
const UserController = require('../controller/userController');
const authenticate = require('../middleware/authMiddleware');


router.get("/", (req, res) => res.json({ message: "Welcome to the addressbook API" }));

router.get("/contacts", authenticate, ContactController.contactRead);
router.post("/contacts", authenticate, ContactController.contactCreate);
router.put("/contacts/:id_contact", authenticate, ContactController.contactUpdate); 
router.delete("/contacts/:id_contact", authenticate, ContactController.contactDelete);

router.post("/users", UserController.userCreate);
router.post("/login", UserController.userLogin);
router.get("/users/:id_user", authenticate, UserController.userRead);
router.put("/users/:id_user", authenticate, UserController.userUpdate);
router.delete("/users/:id_user", authenticate, UserController.userDelete);

module.exports = router;