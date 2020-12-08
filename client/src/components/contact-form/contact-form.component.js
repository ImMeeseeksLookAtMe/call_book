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

    const [errors, setErrors] = useState([])
    console.log(errors)

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
            setContacts(res.data);
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    }

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createContact(formData);
        
    };

    return (
        <div className='form-and-alerts'>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label>Name
                    <input 
                    className="form-control" 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={e => onChange(e)} 
                    placeholder="Enter your name" 
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
                    />
                    </label>
                </div>
                <input className="submit-btn" type='submit' value='Add Contact'></input>
                
            </form>
            <div className="alerts">
                {
                    errors ? errors.map(error => <div className="error">{error.msg}</div>) : null 
                }
            </div>
        </div>
    )
}

export default ContactForm;
