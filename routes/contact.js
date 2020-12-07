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
        let contacts = await Contact.find();

        if(Object.values(req.query).length !== 0) {
            const value = JSON.parse(req.query.call.valueOf());
            const foundNumbers = contacts.filter(db => db.called === value);
            return res.json(foundNumbers)
        }
        
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


// @desc update Call CLIENT / UPDATE
// @route => /
// @type PUT

router.put('/:id', async (req, res) =>{
    const {
        called
    } = req.body;
    try {
        
        let contact = await Contact.findById(req.params.id)
        if(!contact) {
                return res.status(400).json({msg: `There is no contact with ${req.params.id}`})
            }
        contact.called = called;

        await contact.save();

        res.json(contact);
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;