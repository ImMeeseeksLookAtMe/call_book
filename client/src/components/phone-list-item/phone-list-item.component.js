import React from 'react';
import './phone-list-item.styles.css';

const PhoneListItem = () => {
    return (
        <div className='phone-list-item'>
            <div className='item-details'>
                <span>name</span>
                <span>surname</span>
                <span>number</span>
                <span>address</span>
            </div>
        </div>
    )
}

export default PhoneListItem;
