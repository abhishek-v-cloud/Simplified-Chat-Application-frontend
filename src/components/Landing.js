import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SessionContext } from '../contexts/SessionContext';

const Landing = () => {
  const { setHistory } = useContext(SessionContext);
  const navigate = useNavigate();

  const startNewChat = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/chat/start');
      const { sessionId } = res.data;
      setHistory([]); // Reset history
      navigate(`/chat/${sessionId}`);
    } catch (error) {
      alert('Error starting new chat');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to ChatGPT Clone
        </h1>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
          Start a new conversation to explore mock data and responses.
        </p>
        <button
          onClick={startNewChat}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          New Chat
        </button>
      </div>
    </div>
  );
};

export default Landing;