import React from 'react'

const Login = () => {
  return (
    <>
    <div className='flex justify-center mt-10 font-bold text-3xl'>
        <h1>Login</h1>
      </div>

      <div className='flex justify-center mt-6'>
        <form 
          action="" 
          className='flex flex-col justify-center items-center bg-gray-50 border border-gray-50 rounded-lg shadow-lg p-8 w-[350px] h-[400px]'
        >
          <label htmlFor='username' className='font-semibold'>Username</label>
          <input type="text" className='border rounded w-full h-[35px] mt-2 px-2' placeholder='Username' />

          <label htmlFor='password' className='font-semibold mt-4'>Password</label>
          <input type="password" className='border rounded w-full h-[35px] mt-2 px-2' placeholder='Password' />
          <button className='border h-[35px] w-[120px] bg-orange-500 text-white font-semibold rounded mt-6'>
            Login 
          </button>
        </form>
    </div>
    </>
  )
}

export default Login