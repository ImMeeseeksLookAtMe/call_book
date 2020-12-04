const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// DB 
const Contact = require('../models/Contact')

// @desc get CLIENTS from DB + FILTER
// @route => /
// @type GET

router.get('/', async (req, res) => {
    try {
        //find all
        const contacts = await Contact.find()

        res.json(contacts)

    } catch (error) {

        res.status(500).send('Server Error')
    }
});

// @desc CREATE CLIENT / UPDATE
// @route => /
// @type POST

router.post('/',
[
    check('name', "Name is Required").not().isEmpty(),
    check('surname', "Surname is Required").not().isEmpty(),
    check('email', "E-mail is Required").not().isEmpty(),
    check('phoneNumber', "Phone number is Required").not().isEmpty(),
    check('address', "Address is Required").not().isEmpty(),
],
 async (req, res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        name,
        surname,
        email,
        phoneNumber,
        address
    } = req.body

    try {
        //find contact by email
        let contact = await Contact.findOne({ email });
        
        if(contact) {
            return res.status(400).json({
                errors: 
                [{ msg: 'Contact already exists'}]
            })
        }

        contact = new Contact({
            name,
            surname,
            email,
            phoneNumber,
            address,
            called: false
        })

        await contact.save();

        res.json(contact);

    } catch (error) {
        
        res.status(500).send('Server Error')
    }
});

module.exports = router;