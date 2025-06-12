import { useState } from 'react'
import './App.css'
import Sidebar from './components/FirstSidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <header className="app-header">
        <button onClick={toggleSidebar} className="menu-button">
          {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
        </button>
        <h1>Sidebar Demo</h1>
      </header>
      <main className="app-content">
        <p>Some graphs here</p>
      </main>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
        <h2>Sidebar Menu</h2>
        <p>Some items here...</p>
        sidebar with react-transitions
        {/* You can add more children or nav items */}
      </Sidebar>
    </div>
  )
}

export default App
