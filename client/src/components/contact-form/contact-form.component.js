import React, { useState } from 'react';
import axios from 'axios';

import './contact-form.styles.css';

const ContactForm = ({setContacts}) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        address: ''
    });

    const { 
        name, 
        surname, 
        email, 
        phoneNumber, 
        address 
    } = formData;

    async function createContact(contactData) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post(`http://localhost:3001/`, contactData, config);
            setContacts(res.data)
        } catch (error) {
            console.log("failed to update")
        }
    }

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createContact(formData);
        
    };

    return (
        <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <label>Name
                <input 
                className="form-control" 
                type="text" 
                name="name" 
                value={name} 
                onChange={e => onChange(e)} 
                placeholder="Enter your name"
                required 
                />
                </label>
            </div>
            <div className="form-group">
                <label>Surname
                <input 
                className="form-control" 
                type="text" 
                name="surname" 
                value={surname} 
                onChange={e => onChange(e)} 
                placeholder="Enter your surname"
                required 
                />
                </label>
            </div>
            <div className="form-group">
                <label>Email
                <input 
                className="form-control" 
                type="text" 
                name="email" 
                value={email} 
                onChange={e => onChange(e)} 
                placeholder="Enter your email"
                required 
                />
                </label>
            </div>
            <div className="form-group">
                <label>Phone number
                <input 
                className="form-control" 
                type="text" 
                name="phoneNumber" 
                value={phoneNumber} 
                onChange={e => onChange(e)} 
                placeholder="Enter your phone number"
                required 
                />
                </label>
            </div>
            <div className="form-group">
                <label>Address
                <input 
                className="form-control" 
                type="text" 
                name="address" 
                value={address} 
                onChange={e => onChange(e)} 
                placeholder="Enter your address"
                required 
                />
                </label>
            </div>
            <input className="submit-btn" type='submit' value='Add Contact'></input>
        </form>
    )
}

export default ContactForm;
