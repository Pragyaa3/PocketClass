import React, { useState } from 'react';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth } from "../lib/firebase";  // Import Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";  // Import Firestore methods

function SignupForm() {
  const [role, setRole] = useState('student'); // Default role is "student"
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // User signed up successfully
      console.log('User signed up successfully:', user);

      // Get Firestore instance
      const db = getFirestore();

      // Create a document for the user in the Firestore 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        name,
        role,
        mobile,
        gender,
        email,  // You can also store the email if needed
        createdAt: new Date()  // Optional: store the signup date
      });

      alert("Signup successful and user details saved!");

      // Optionally, redirect the user to another page after successful signup
      // For example: window.location.href = "/dashboard";

    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("Error during signup. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Sign Up</h2>
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter your name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
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

        <Form.Group className="mb-3" controlId="formGroupMobile">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control 
            type="tel" 
            placeholder="Enter your mobile number" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control 
            as="select" 
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            required
          >
            <option value="" disabled>Choose</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default SignupForm;
