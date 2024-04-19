import { doc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {

    const [currentPage, setCurrentPage] = useState(0);

    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passworsRef = useRef();

    const registerHandler = async (e) => {
        e.preventDefault();

        setCurrentPage(1)

        const userCredintials = {
            email: emailRef.current.value,
            password: passworsRef.current.value,
            username: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
            name: {
                firstname: firstNameRef.current.value,
                lastname: lastNameRef.current.value
            }
        }

        try {
            await createUserWithEmailAndPassword(auth, userCredintials.email, userCredintials.password)
                .then(res => {
                    updateProfile(res.user, {
                        displayName: userCredintials.username
                    })
                })
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    return (
        <div className='container'>
            <h1>Register</h1>

            <div className='form-container'>
                <form onSubmit={registerHandler} className='card product-card'>
                    <input ref={emailRef} type="emial" placeholder='Emal address' />
                    <input ref={firstNameRef} type="text" placeholder='First Name' />
                    <input ref={lastNameRef} type="text" placeholder='Last Name' />
                    <input ref={passworsRef} type="password" placeholder='Password' />

                    <input type='submit' className='button' value={"submit"} />
                </form>
            </div>
        </div>
    )
}

export default Register