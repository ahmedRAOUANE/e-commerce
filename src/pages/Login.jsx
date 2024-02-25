import React, { useRef } from 'react'

const Login = () => {
    const emailRef = useRef();
    const passworsRef = useRef();

    const subnitHandler = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passworsRef.current.value,
        }

        console.log(payload);

        // axiosClient.post('/users', payload);
    }
    return (
        <div className='container'>
            <h1>login</h1>

            <form onSubmit={subnitHandler} className='card product-card'>
                <input ref={emailRef} type="emial" placeholder='Emal address' />
                <input ref={passworsRef} type="password" placeholder='Password' />

                <button type='submit'>register</button>
            </form>
        </div>
    )
}

export default Login