import React, { useEffect } from 'react';
import axios from 'axios';

const PhoneList = () => {
    useEffect(() => {
        async function fetchData() {
            try {
            const res = await axios.get("http://localhost:3001/");
            console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])
    return (
        <div>
            <p>this is Phone list</p>
        </div>
    )
}

export default PhoneList;
