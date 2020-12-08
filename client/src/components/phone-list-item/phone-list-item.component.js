import React from 'react';
import axios from 'axios'

import useToggle from "../../hooks/useToggle";
import './phone-list-item.styles.css';

const PhoneListItem = ({contact, setContacts}) => {
    const { name, surname, email, address, called, phoneNumber, _id } = contact
    const [call, setCall] = useToggle(called)
    async function updateCall(id, isCall) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let objectCalled = {called: !isCall}
            
            const res = await axios.put(`http://localhost:3001/${id}`, objectCalled, config);
            //set errors array
            setContacts(res.data)
        } catch (error) {
            console.log("failed to update")
        }
    }
    
    const onCall = (e, id, isCall) => {
        setCall();
        updateCall(id, isCall)
    }

    return (
        <div className='phone-list-item'>
            <div className='item-details'>
                <span>{name}</span>
                <span>{surname}</span>
                <span>{phoneNumber}</span>
                <span>{email}</span>
                <span>{address}</span>
                <span onClick={(e)=> onCall(e, _id, call)}>{call ? <span style={{color: "green"}}>&#10004;</span> : <span style={{color: "yellow"}}>&#9742;</span> }</span>
            </div>
        </div>
    )
}

export default PhoneListItem;
