import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './FirstSidebar.css'; // Your CSS file

interface Props {
	isOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
}

// react-transition-group package is needed

const Sidebar:React.FC<Props> = ({ isOpen, onClose, children }) => {
	const sidebarRef = React.useRef(null); // Ref for the sidebar itself
	const overlayRef = React.useRef(null); // Ref for the overlay

	return (
		<>
			{/* Overlay */}
			<CSSTransition
				nodeRef={overlayRef} // Pass the ref
				in={isOpen}
				timeout={300}       // Must match CSS transition duration
				classNames="overlay-fade"
				unmountOnExit
			>
				<div ref={overlayRef} className="sidebar-overlay" onClick={onClose}></div>
			</CSSTransition>

			{/* Sidebar */}
			<CSSTransition
				nodeRef={sidebarRef}
				in={isOpen}
				timeout={300}
				classNames="sidebar-slide"
				unmountOnExit
			>
				<aside ref={sidebarRef} className="sidebar"> {/* Attach ref here */}
					<button onClick={onClose} className="sidebar-close-button">
						×
					</button>
					<div className="sidebar-content">
						{children || ( // Default content if no children are passed
							<nav>
								<ul>
									<li><a href="#home">Home</a></li>
									<li><a href="#services">Services</a></li>
								</ul>
							</nav>
						)}
					</div>
				</aside>
			</CSSTransition>
		</>
	);
};

export default Sidebar;