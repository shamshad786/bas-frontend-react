import React from 'react'
import { Link } from 'react-router-dom'

const register = () => {
  return (
    <div className='register-container'>
    <div className ='register-inner-div'>

    <Link to={'/form'}>From</Link>
        <h1>Register Page</h1>
        <div className='name_div'>
            <label >Name</label>
            <input type="text" placeholder='Enter your Full Name' />
        </div>
        <div className='email_div'>
            <label >E-mail</label>
            <input type="email" placeholder='Enter your E-mail' />
        </div>
        <div className='phone_div'>
            <label >Phone</label>
            <input type="number" placeholder='Enter your phone number' />
        </div>
        <div className='password_div'>
            <label >Password</label>
            <input type="date" />
        </div>
       
    </div>
    </div>
  )
}

export default register