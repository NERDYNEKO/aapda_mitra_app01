// FIX: Implement the main App component, which was previously missing.
// This component manages application state, routing, and renders different pages based on user authentication and navigation.
import React, { useState, useCallback } from 'react';
import { Page, Alert } from './types';

// Components
import Auth from './components/Auth';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import Shelters from './components/Shelters';
import VolunteerPortal from './components/VolunteerPortal';
import EmergencyContacts from './components/EmergencyContacts';
import Map from './components/Map';
import ReportIncident from './components/ReportIncident';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Chatbot from './components/Chatbot';

// Icons
import { ChatBubbleIcon } from './components/icons/ChatBubbleIcon';
import { CloseIcon } from './components/icons/CloseIcon';

const initialAlerts: Alert[] = [
  { id: 1, type: 'Flood Warning', area: 'Guwahati, Assam', severity: 'High', message: 'River Brahmaputra is flowing above the danger level. People in low-lying areas are advised to move to safer places.', time: '2 hours ago' },
  { id: 2, type: 'Cyclone Alert', area: 'Coastal Odisha', severity: 'Medium', message: 'A cyclone is expected to make landfall in the next 48 hours. Fishermen are advised not to venture into the sea.', time: '8 hours ago' },
  { id: 3, type: 'Heatwave', area: 'Jaipur, Rajasthan', severity: 'Low', message: 'Temperatures are expected to rise above 45°C. Stay hydrated and avoid outdoor activities during peak hours.', time: '1 day ago' },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleLogin = (isNewUser: boolean) => {
    setIsAuthenticated(true);
    if (isNewUser) {
      setCurrentPage('profile');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  }, []);

  const handleAddAlert = (newAlertData: Omit<Alert, 'id' | 'time'>) => {
    const newAlert: Alert = {
      ...newAlertData,
      id: alerts.length + Math.floor(Math.random() * 1000), // Use random to avoid key collision
      time: 'Just now',
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
    navigate('alerts');
    alert("Incident reported successfully! It will now appear in the alerts feed.");
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard navigate={navigate} />;
      case 'alerts': return <Alerts alerts={alerts} />;
      case 'shelters': return <Shelters />;
      case 'volunteer': return <VolunteerPortal />;
      case 'contacts': return <EmergencyContacts />;
      case 'map': return <Map />;
      case 'report': return <ReportIncident onAddAlert={handleAddAlert} />;
      case 'profile': return <Profile onLogout={handleLogout} />;
      default: return <NotFound />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-gray-900 text-brand-gray-100 font-sans flex items-center justify-center p-4">
        <Auth onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray-900 text-brand-gray-100 font-sans">
      <Header onMenuClick={() => setIsSidebarOpen(true)} navigate={navigate} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navigate={navigate} onLogout={handleLogout} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
      
      {/* Chatbot Floating UI */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatbotOpen && (
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsChatbotOpen(false)}></div>
        )}
        <div className={`transition-all duration-300 ease-in-out ${isChatbotOpen ? 'w-[calc(100%-3rem)] max-w-md h-[calc(100%-3rem)] max-h-[600px] ' : 'w-16 h-16'}`}>
          <div className="h-full w-full relative">
            {isChatbotOpen ? (
              <>
                <Chatbot />
                <button 
                  onClick={() => setIsChatbotOpen(false)} 
                  className="absolute top-0 right-0 -mt-3 -mr-3 bg-brand-gray-700 text-white rounded-full p-1.5 hover:bg-brand-gray-600 z-10 shadow-lg"
                  aria-label="Close chat"
                >
                  <CloseIcon />
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsChatbotOpen(true)}
                className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transform hover:scale-110 transition-transform"
                aria-label="Open AI assistant"
              >
                <ChatBubbleIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;