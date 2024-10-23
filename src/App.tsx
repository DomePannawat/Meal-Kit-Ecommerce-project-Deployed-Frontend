import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className='text-5xl font-bold text-sage-mint'>Test</h1>
    <hr />
    <h2 className='text-4xl font-bold text-blue-500'>Meal-Kit-Ecommerce-project</h2>
    <hr />
    <h2 className='text-3xl font-bold text-green-500'>Hello World</h2>
    </>
  )
}

export default App
