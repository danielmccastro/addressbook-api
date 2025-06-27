const express = require('express');
const router = express.Router();

const contactController = require('../controller/contactController');
const userController = require('../controller/userController');
const authenticate = require('../middleware/authMiddleware');

router.get("/", (req, res) => res.json({ message: "Welcome to the addressbook API" }));

router.get("/contacts", authenticate, contactController.contactRead);
router.post("/contacts", authenticate, contactController.contactCreate);
router.get("/contacts/:id_contact", authenticate, contactController.contactReadOne);
router.put("/contacts/:id_contact", authenticate, contactController.contactUpdate);
router.delete("/contacts/:id_contact", authenticate, contactController.contactDelete);

router.post("/users", userController.userCreate);
router.post("/login", userController.userLogin);
router.get("/users/:id_user", authenticate, userController.userRead);
router.put("/users/:id_user", authenticate, userController.userUpdate);
router.delete("/users/:id_user", authenticate, userController.userDelete);

module.exports = router;