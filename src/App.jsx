import './App.css'
import {User, MessageCircle, X, Heart, Send} from 'lucide-react'
import React, {useState, useEffect} from 'react'

const fetchRandomProfile = async () => {
  const response = await fetch('http://localhost:8080/profiles/random');
  if (!response.ok) {
    throw new Error('Failed to fetch a random profile');
  }
  return response.json();
}

const saveMatch = async (profileId) => {
  const response = await fetch('http://localhost:8080/matches', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({ profileId })
    }
  );
  if (!response.ok) {
    throw new Error('Failed to save the match');
  }
}

const fetchMatches = async () => {
  const response = await fetch('http://localhost:8080/matches');
  if (!response.ok) {
    throw new Error('Failed to fetch matches');
  }
  return response.json();
}

const fetchConversation = async (conversationId) => {
  const response = await fetch('http://localhost:8080/conversations/' + conversationId);
  if (!response.ok) {
    throw new Error('Failed to fetch conversation');
  }
  return response.json();
}

const sendMessage = async (message, conversationId) => {
  const response = await fetch('http://localhost:8080/conversations/' + conversationId, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({ messageText: message, authorId : 'user' })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to submit message');
  }
  return response.json;
}

const ProfileSelector = ({ profile, onSwipe }) => {
  return (profile ?  
    (<div className='rounded-lg overflow-hidden bg-white shadow-lg'>
      <div className='relative'>
        <img src={'http://localhost:8080/images/' + profile.imageUrl} />
        <div className='absolute bottom-0 left-0 right-0 text-white p-4 bg-gradient-to-t from-black'>
          <h2 className='text-3x1 font-bold'>{profile.firstName} {profile.lastName}, {profile.age}</h2>
        </div>
      </div>
      <div className='p-4'>
          <p className='text-grey-600'>{profile.bio}</p>
      </div>
      <div className='flex justify-center space-x-4 p-4'>
        <button className='bg-red-500 rounded-full p-4 text-white hover:bg-red-700'
          onClick={() => onSwipe("left", profile.id)}>
          <X size={24}/>
        </button>
        <button className='bg-green-500 rounded-full p-4 text-white hover:bg-green-700'
          onClick={() => onSwipe("right", profile.id)}>
          <Heart size={24} />
        </button>
      </div>
    </div>) : (<div>Loading...</div>)
  )
}

const MatchesList = ({matches, onSelectMatch }) => {
  return (
    <div className='rounded-large shadow-lg p-4'>
      <h2 className='text-2xl font-bold mb-4'>Matches</h2>
        <ul>
        {matches.map((match, index) => (
          <li key={index} className='mb-2'>
            <button 
              className='w-full hover:bg-gray-100 rounded flex item-center'
              onClick={() => onSelectMatch(match.profile, match.conversationId)}>
              <img src={'http://localhost:8080/images/' + match.profile.imageUrl} className='w-16 h-16 rounded-full mr-3 object-cover' />
              <span>
                <h3 className='font-bold'>{match.profile.firstName} {match.profile.lastName}</h3>
              </span>
            </button>
          </li>
        ))
        }
        </ul>
    </div>
  );
}

const ChatScreen = ({currentMatch, conversation, refreshChatState}) => {
  const [input, setInput] = useState('');

  const handleSend = async (input) => {
    if (input.trim()) {
      await sendMessage(input, conversation.id);
      setInput('');
      refreshChatState();
    }
  }

  return currentMatch ? (
    <div className='rounded-lg shadow-lg p-4'>
      <h2 className='text-2xl font-bold mb-4'>Chat with {currentMatch.firstName} {currentMatch.lastName}</h2>
      <div className='h-[50vh] border rounded-lg overflow-y-auto mb-6 p-4 bg-gray-50'>
        {
          conversation.messages.map((message, index) => (
            <div key={index} className={`flex ${message.authorId == 'user'} ? justify-end : 'justify-start' mb-4`}>
              <div className={`flex items-end ${message.authorId === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {message.authorId === 'user' ? (<User size={15} />) : 
              (<img
                src={`http://localhost:8080/images/${currentMatch.imageUrl}`}
                className="w-11 h-11 rounded-full"
              />)}
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.authorId === 'user'
                    ? 'bg-blue-500 text-white ml-2'
                    : 'bg-gray-200 text-gray-800 mr-2'
                }`}
              >{message.messageText}
              </div>
              </div>
            </div>)
          )
        }
      </div>
      <div className='flex'>
        <input 
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='flex-1 border-2 border-gray-300 rounded-full py-2 px-4 mr-2 focus:outline-none focus:border-blue-500'
          placeholder='Type a message...' 
        />
        <button 
          className='bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors duration-200'
          onClick={() => handleSend(input)}
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  ) : <div>Loading...</div>
}

function App() {

  const loadRandomProfile = async () => {
    try {
      const profile = await fetchRandomProfile();
      setCurrentProfile(profile);
    } catch(error) {
      console.log(error);
    }
  }

  const loadMatches = async () => {
    try {
      const matches = await fetchMatches();
      setMatches(matches);
    } catch(error) {
      console.log(error);
    }
  }

  const onSwipe = async (direction, profileId) => {
    loadRandomProfile();
    if (direction === 'right') {
      await saveMatch(profileId);
      await loadMatches();
    }
  }

  const onSelectMatch = async (profile, conversationId) => {
    const conversation = await fetchConversation(conversationId);
    setCurrentChatMetaData({ match: profile, conversation });
    setCurrentScreen('chat');
  }

  const refreshChatState = async () => {
    const conversation = await fetchConversation(currentChatMetaData.conversation.id);
    setCurrentChatMetaData({ match: currentChatMetaData.match, conversation });
  }

  useEffect(() => {
    loadRandomProfile();
    loadMatches();
  }, []);

  const [currentState, setCurrentScreen] = useState('profile');
  const [currentProfile, setCurrentProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [currentChatMetaData, setCurrentChatMetaData] = useState({match: [], conversation: []});

  const renderScreen = () => {
    switch(currentState) {
      case 'profile':
        return <ProfileSelector profile={currentProfile} onSwipe={onSwipe} />;
      case 'matches':
        return <MatchesList matches={matches} onSelectMatch={onSelectMatch} />;
      case 'chat':
        return <ChatScreen 
          currentMatch={currentChatMetaData.match} 
          conversation={currentChatMetaData.conversation} 
          refreshChatState={refreshChatState} />;
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
