import React from 'react'

const InputItem = ({label, placeholder,type, data, setFormInput, fieldName}) => {
    const changeHandler = (e)=> {
        setFormInput({
            ...data,
            [fieldName]: e.target.value
        })
    }
  return (
    <div className='flex flex-col gap-2'>
        <label className='text-[1rem]'>{label}</label>
        <input type={`${type==='text' ? 'text':'password'}`} placeholder={placeholder} className='bg-white py-4 px-2 w-[20rem] sm:w-[30rem] border-2'
        onChange={changeHandler}
        />
    </div>
  )
}

export default InputItem