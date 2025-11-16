import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SessionContext } from '../contexts/SessionContext';

const Chat = () => {
  const { sessionId } = useParams();
  const { history, setHistory } = useContext(SessionContext);
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState({}); 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`https://simplified-chat-application-backend-zmi0.onrender.com/api/sessions/${sessionId}`);
        setHistory(res.data.history);
      } catch (error) {
        alert('Error loading session');
      }
    };
    fetchHistory();
  }, [sessionId, setHistory]);

  const askQuestion = async () => {
    if (!question.trim()) return;
    try {
      const res = await axios.post('https://simplified-chat-application-backend-zmi0.onrender.com/api/chat/ask', { sessionId, question });
      setHistory([...history, { question, answer: res.data }]);
      setQuestion('');
    } catch (error) {
      alert('Error asking question');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {history.map((item, idx) => (
            <div key={idx} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-bold text-gray-900 dark:text-white">Q: {item.question}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{item.answer.description}</p>
              <table className="mt-4 table-auto border-collapse border border-gray-300 dark:border-gray-600 w-full">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    {Object.keys(item.answer.table[0] || {}).map(key => (
                      <th key={key} className="border border-gray-300 dark:border-gray-600 p-2 text-left text-gray-900 dark:text-white">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.answer.table.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="border border-gray-300 dark:border-gray-600 p-2 text-gray-900 dark:text-white">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setFeedback({ ...feedback, [idx]: 'like' })}
                  className={`p-2 rounded ${feedback[idx] === 'like' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
                >
                  👍 Like
                </button>
                <button
                  onClick={() => setFeedback({ ...feedback, [idx]: 'dislike' })}
                  className={`p-2 rounded ${feedback[idx] === 'dislike' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
                >
                  👎 Dislike
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="max-w-4xl mx-auto flex">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
          />
          <button
            onClick={askQuestion}
            className="px-6 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
