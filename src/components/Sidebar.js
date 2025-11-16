import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../contexts/ThemeContext';
import { SessionContext } from '../contexts/SessionContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [sessions, setSessions] = useState([]);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const { setHistory } = useContext(SessionContext);
  const navigate = useNavigate();

  // Fetch sessions on mount
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sessions');
        setSessions(res.data);
      } catch (error) {
        alert('Error fetching sessions');
      }
    };
    fetchSessions();
  }, []);

  // Start new chat
  const startNewChat = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/chat/start');
      const { sessionId } = res.data;
      setHistory([]);
      navigate(`/chat/${sessionId}`);
      setIsOpen(false);
      // Refresh the session list
      const fetchSessions = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/sessions');
          setSessions(res.data);
        } catch (error) {
          alert('Error fetching sessions');
        }
      };
      fetchSessions();
    } catch (error) {
      alert('Error starting new chat');
    }
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 dark:bg-gray-200 text-white dark:text-black p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="mb-4 ml-44 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isDark ? 'Light' : 'Dark'}
          </button>

          <button
            onClick={startNewChat}
            className="w-full mb-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            New Chat
          </button>

          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Sessions</h3>
          <ul className="space-y-2">
            {sessions.map((session) => (
              <li key={session.id}>
                <Link
                  to={`/chat/${session.id}`}
                  className="block p-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  onClick={() => setIsOpen(false)} // Close on mobile
                >
                  {session.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-4 bg-gray-200 dark:bg-gray-700 rounded">
            <h4 className="font-bold text-gray-900 dark:text-white">User Info</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">Name: Abhsiehk</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Email: abhi@gmail.com</p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
