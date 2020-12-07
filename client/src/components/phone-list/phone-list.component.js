import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useToggle from '../../hooks/useToggle';

import './phone-list.styles.css';

import PhoneListItem from '../phone-list-item/phone-list-item.component';
import ContactForm from '../contact-form/contact-form.component';

const PhoneList = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useToggle(false);
    const [sortCalled, setSortCalled] = useToggle(false);
    console.log(contacts)
    async function fetchData() {
            try {
            const res = await axios.get(`http://localhost:3001/?call=${sortCalled}`);
            setContacts(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }

    useEffect(() => {
        fetchData();
    }, [setContacts, sortCalled])
    return (
        <div className='phone-list-container'>
            <div className='title-row'>
                <span>name</span>
                <span>surname</span>
                <span>phone number</span>
                <span>e-mail</span>
                <span>address</span>
                <span>call?<span onClick={()=> setSortCalled()}>
                    {
                    sortCalled ? 
                        <span style={{color: "green"}}>&#10004;</span> 
                            : 
                        <span style={{color: "yellow"}}>&#9742;</span> 
                    }
                </span></span>
            </div>
            {
                contacts.map(contact => <PhoneListItem key={contact._id} contact={contact}/>)
            }
            <div onClick={() => setNewContact()}>Add new Contact</div>
            {
                newContact ? <ContactForm /> : null
            }
        </div>
    )
}

export default PhoneList;
