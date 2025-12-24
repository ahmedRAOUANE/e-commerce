import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef();
    const passworsRef = useRef();


    const navigate = useNavigate();

    const subnitHandler = async (e) => {
        e.preventDefault();

        const userCrdedentials = {
            email: emailRef.current.value,
            password: passworsRef.current.value,
        }

        try {
            await signInWithEmailAndPassword(auth, userCrdedentials.email, userCrdedentials.password)
                .then(() => {
                    navigate("/dashboard")
                })
        } catch (err) {
            console.log("Error", err);
        }
    }
    return (
        <div className='container'>
            <h1>login</h1>

            <form onSubmit={subnitHandler} className='card product-card box column'>
                <input ref={emailRef} type="emial" placeholder='Emal address' />
                <input ref={passworsRef} type="password" placeholder='Password' />

                <input type='submit' className='button' value={"Login"} />
            </form>
        </div>
    )
}

export default Login