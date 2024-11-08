

const Signup = () => {
  return (
    <>
      <div className='flex justify-center mt-10 font-bold text-3xl'>
        <h1>Create Your Account!</h1>
      </div>

      <div className='flex justify-center mt-6'>
        <form 
          action="" 
          className='flex flex-col justify-center items-center bg-gray-50 border border-gray-50 rounded-lg shadow-lg p-8 w-[350px]'
        >
          <label htmlFor='username' className='font-semibold'>Username</label>
          <input type="text" className='border rounded w-full h-[35px] mt-2 px-2' placeholder='Username' />

          <label htmlFor='password' className='font-semibold mt-4'>Password</label>
          <input type="password" className='border rounded w-full h-[35px] mt-2 px-2' placeholder='Password' />

          <label htmlFor='confirmpassword' className='font-semibold mt-4'>Confirm Password</label>
          <input type="password" className='border rounded w-full h-[35px] mt-2 px-2' placeholder='Confirm Password' />

          <label htmlFor='email' className='font-semibold mt-4'>Email</label>
          <input type="email" className='border rounded w-full h-[35px] mt-2 px-2' placeholder='Email' />

          <div className='flex items-center mt-4'>
            <input type="checkbox" className='border rounded w-[20px] h-[20px] mr-2'/>
            <label htmlFor='checkbox' className='text-sm'>ยินยอมข้อตกลง</label>
          </div>

          <button className='border h-[35px] w-[120px] bg-orange-500 text-white font-semibold rounded mt-6'>
            Sign Up
          </button>
        </form>
      </div>
    </>
  )
}

export default Signup
