import { useState} from 'react';
import './SimpleSidebar.css'; // Different CSS file

interface Props{
    isOpen: boolean;
    onClose: () => void;
}

//Fully native
const SimpleSidebar = ({ isOpen, onClose }:Props) => {
  // No CSSTransition
  return (
    <>
      {isOpen && <div className="simple-sidebar-overlay" onClick={onClose}></div>}
      <aside className={`simple-sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={onClose}>Close</button>
        <p>Sidebar Content</p>
      </aside>
    </>
  );
};

function SSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div>
      <button onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close Simple Menu' : 'Open Simple Menu'}
      </button>
      <SimpleSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      {/* ... rest of your app */}
    </div>
  );
}

export default SSidebar;