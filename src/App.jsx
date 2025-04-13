import './App.css'
import {User, MessageCircle, X, Heart} from 'lucide-react'
import React, {useState} from 'react'

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

const MatchesList = () => {
  return (
    <div className='rounded-large shadow-lg p-4'>
      <h2 className='text-2xl font-bold mb-4'>Matches</h2>
        <ul>
        {[
          { id: 1, firstName: 'Foo', lastName: 'Bar', imageUrl: 'http://127.0.0.1:8080/images/01f4c42f-86cb-45e6-ad2b-05430afb3639.jpg'},
          { id: 2, firstName: 'Baz', lastName: 'Qux', imageUrl: 'http://127.0.0.1:8080/images/3a0def1e-e83c-4df9-a279-645d179e18b2.jpg'}
        ].map(match => (
          <li key={match.id} className='mb-2'>
            <button className='w-full hover:bg-gray-100 rounded flex item-center'>
              <img src={match.imageUrl} className='w-16 h-16 rounded-full mr-3 object-cover' />
              <span>
                <h3 className='font-bold'>{match.firstName} {match.lastName}</h3>
              </span>
            </button>
          </li>
        ))
        }
        </ul>
    </div>
  );
}

const ChatScreen = () => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      console.log(input);
      setInput('');
    }
  }

  return (
    <div className='rounded-large shadow-lg p-4'>
      <h2 className='text-2xl font-bold mb-4'>Chat with Foo Bar</h2>
      <div className='h-[50vh] border rounded overflow-y-auto mb-4 p-2'>
        {
          [
            "Hi",
            "What's up?",
            "What's up?",
            "What's up?",
            "What's up?",
            "What's up?",
            "What's up?",
            "What's up?"
          ].map((message, index) => (
            <div key={index}>
              <div className='mb-4 p-2 rounded bg-gray-100'>{message}</div>
            </div>)
          )
        }
      </div>
      <div className='flex'>
        <input 
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='border flex-1 rounded p-2 mr-2'
          placeholder='Type a message...' 
        />
        <button 
          className='bg-blue-500 text-white rounded p-2'
          onClick={() => handleSend()}  
        >Send</button>
      </div>
    </div>
  )
}

function App() {

  const [currentState, setCurrentScreen] = useState('profile');

  const renderScreen = () => {
    switch(currentState) {
      case 'profile':
        return <ProfileSelector />;
      case 'matches':
        return <MatchesList />;
      case 'chat':
        return <ChatScreen />;
    }
  }

  return (
    <>
    <div className='max-w-md mx-auto'>
      <nav className='flex justify-between'>
        <User onClick = {() => {setCurrentScreen('profile')}}/>
        <MessageCircle onClick = {() => setCurrentScreen('matches')}/>
      </nav>
      {renderScreen()}
    </div>
    </>
  )
}

export default App
