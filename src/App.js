import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { SessionProvider } from './contexts/SessionContext';
import Sidebar from './components/Sidebar';
import Landing from './components/Landing';
import Chat from './components/Chat';

function App() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <BrowserRouter>
          <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/chat/:sessionId" element={<Chat />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;
