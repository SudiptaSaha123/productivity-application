import React, { useState } from 'react'
import InputItem from '../components/InputItem'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
const Signin = () => {
  const [formInput, setFormInput] = useState({
    username: "",
    password: ""
  })

  const navigate = useNavigate()
  const submitHandler = async(event) => {
    event.preventDefault()
    const { username, password } = formInput
    try{
      const response = await axios.post('http://localhost:3000/api/users/signin', {username, password})
      localStorage.setItem('token', response.data.token)
      navigate('/home')
    }catch(error){
      const errorMessage = error.response.data.message || 'An error occurred';
      toast.error(errorMessage);
    }
  }
  return (
    
    <div className='flex flex-row items-center justify-center'>
      <div className='bg-black text-white w-fit h-[50%] sm:w-[50%] sm:min-h-screen text-center hidden sm:flex flex-col justify-center items-start pl-20'>
        <h1 className='lowercase text-[2.6rem]'>Increase Your <span className='font-bold'>Productivity</span></h1>
        <h1 className='lowercase text-[1.3rem] mt-4'>track your <span className='font-semibold text-[1.5rem]'>todos & notes</span> in single place</h1>
      </div>
      <div className='flex mt-20 sm:mt-0 mx-auto flex-col '>
        <form onSubmit={submitHandler} className='flex flex-col gap-5'>
          <InputItem label={"Username"} placeholder={"Enter username"} type="text" data = {formInput} setFormInput={setFormInput} fieldName='username'/>
          <InputItem label={"Password"} placeholder={"Enter password"} type="password" data = {formInput} setFormInput={setFormInput} fieldName='password'/>
          <button type='submit' className='bg-black text-white text-center px-10 py-2'>SIGN IN</button>
        </form>
        <div className='mt-6 uppercase text-center'>Don't have an account? <Link to='/signup' className='font-semibold'>Sign Up</Link></div>
      </div>
      <Toaster/>
    </div>
    
  )
}

export default Signin