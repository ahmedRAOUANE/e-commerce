import React, { useRef } from 'react'
import axiosClient from '../axiosClient';

const Register = () => {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passworsRef = useRef();

    const subnitHandler = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passworsRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value
        }

        console.log(payload);

        axiosClient.post('/users', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className='container'>
            <h1>Register</h1>

            <form onSubmit={subnitHandler} className='card product-card'>
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