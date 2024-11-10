import React, { useState } from 'react';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth } from "../lib/firebase";  // Import Firebase Auth
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginForm() {
  const [role, setRole] = useState('student'); // Default role is "student"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('Logged in successfully:', user);

      // Handle role-based logic here if needed (for example, if you have different dashboards)
      if (role === "student") {
        // Redirect or handle student-specific logic
        console.log("Student logged in");
      } else if (role === "instructor") {
        // Redirect or handle instructor-specific logic
        console.log("Instructor logged in");
      }

    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Role selection with radio buttons */}
        <Form.Group className="mb-3">
          <Form.Label>Select Role</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Student"
              value="student"
              checked={role === 'student'}
              onChange={handleRoleChange}
            />
            <Form.Check
              inline
              type="radio"
              label="Instructor"
              value="instructor"
              checked={role === 'instructor'}
              onChange={handleRoleChange}
            />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
