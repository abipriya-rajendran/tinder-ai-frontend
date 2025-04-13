import './App.css'
import {User, MessageCircle, X, Heart} from 'lucide-react'

const ProfileSelector = () => {
  return (
    <div className='rounded-lg overflow-hidden bg-white shadow-lg'>
      <div className='relative'>
        <img src='http://localhost:8080/images/3a0def1e-e83c-4df9-a279-645d179e18b2.jpg'/>
        <div className='absolute bottom-0 left-0 right-0 text-white p-4 bg-gradient-to-t from-black'>
          <h2 className='text-3x1 font-bold'>This is the name, age</h2>
        </div>
      </div>
      <div className='p-4'>
          <p className='text-grey-600'>
            I'm a Software Engineer with 10 years of experience.
          </p>
      </div>
      <div className='flex justify-center space-x-4 p-4'>
        <button className='bg-red-500 rounded-full p-4 text-white hover:bg-red-700'
          onClick={() => console.log("swipe left")}>
          <X size={24}/>
        </button>
        <button className='bg-green-500 rounded-full p-4 text-white hover:bg-green-700'
          onClick={() => console.log("swipe right")}>
          <Heart size={24} />
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
    <div className='max-w-md mx-auto'>
      <nav className='flex justify-between'>
        <User/>
        <MessageCircle />
      </nav>
      <ProfileSelector />
    </div>
    </>
  )
}

export default App
