import React, { useRef } from 'react'
import axiosClient from '../axiosClient';
import axios from 'axios';

const Register = () => {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passworsRef = useRef();

    const registerHandler = async (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passworsRef.current.value,
            username: firstNameRef.current.value,
            name: {
                firstname: firstNameRef.current.value,
                lastname: lastNameRef.current.value
            }
        }

        console.log(payload);

        try {
            fetch('https://fakestoreapi.com/users', {
                method: "POST",
                body: JSON.stringify(payload)
            })
                .then(res => res.json())
                .then(json => console.log(json))
        } catch (err) {
            console.log("ERROR is: ", err);
        }
    }

    return (
        <div className='container'>
            <h1>Register</h1>

            <form onSubmit={registerHandler} className='card product-card'>
                <input ref={emailRef} type="emial" placeholder='Emal address' />
                <input ref={firstNameRef} type="text" placeholder='First Name' />
                <input ref={lastNameRef} type="text" placeholder='Last Name' />
                <input ref={passworsRef} type="password" placeholder='Password' />

                <button type='submit'>register</button>
            </form>
        </div>
    )
}

export default Register