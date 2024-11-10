import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router and Link

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

// Import your Login and Signup components
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <Router> {/* Wrap everything inside Router */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Other Navbar Links */}
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Login and Signup Buttons */}
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-primary">Login</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                <Button variant="primary">Sign Up</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes to render Login and Signup Pages */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page route */}
        <Route path="/login" element={<LoginForm />} /> {/* Login page route */}
        <Route path="/signup" element={<SignupForm />} /> {/* Sign Up page route */}
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="container mt-4">
      <h2>Welcome to the Home Page!</h2>
      <p>Click Login or Sign Up in the Navbar to navigate.</p>
    </div>
  );
}

export default App;