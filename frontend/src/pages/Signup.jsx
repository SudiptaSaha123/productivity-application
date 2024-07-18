import React, { useState } from 'react'
import InputItem from '../components/InputItem'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: ""
  })
  const navigate = useNavigate()
  const submitHandler = async(event) => {
    event.preventDefault()
    try{
      const { firstName, lastName, email, username, password } = formInput
      const response = await axios.post('http://localhost:3000/api/users/signup', {firstName, lastName, email, username, password})
      navigate('/signin')
    }
    catch(error){
      const errorMessage = error.response.data.message || 'An error occured'
      toast.error(errorMessage)
    }

  }
  return (
    <div className='flex sm:mt-0 mt-6'>
    <div className='bg-black text-white w-fit h-[50%] sm:w-[50%] sm:min-h-screen text-center hidden sm:flex flex-col justify-center items-start pl-20'>
      <h1 className='lowercase text-[2.6rem]'>Increase Your <span className='font-bold'>Productivity</span></h1>
      <h1 className='lowercase text-[1.3rem] mt-4'>track your <span className='font-semibold text-[1.5rem]'>todos & notes</span> in single place</h1>
    </div>
    <div className='flex justify-between items-center mx-auto'>
      <form onSubmit={submitHandler} className='flex flex-col gap-5'>
        <InputItem label={"First Name"} placeholder={"Enter Firstname"} type="text" data = {formInput} setFormInput={setFormInput} fieldName='firstName'/>
        <InputItem label={"Last Name"} placeholder={"Enter Lastname"} type="text" data = {formInput} setFormInput={setFormInput} fieldName='lastName'/>
        <InputItem label={"Email"} placeholder={"Enter Email"} type="text" data = {formInput} setFormInput={setFormInput} fieldName='email'/>
        <InputItem label={"Username"} placeholder={"Enter username"} type="text" data = {formInput} setFormInput={setFormInput} fieldName='username'/>
        <InputItem label={"Password"} placeholder={"Enter password"} type="password" data = {formInput} setFormInput={setFormInput} fieldName='password'/>
        <button type='submit' className='bg-black text-white text-center px-10 py-2'>SIGN UP</button>
        <div className='mt-2 uppercase text-center'>Already have an account? <Link to='/signin' className='font-semibold'>Sign In</Link></div>

      </form>
    </div>
    <Toaster/>
  </div>
  )
}

export default Signup