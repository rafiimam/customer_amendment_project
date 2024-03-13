import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css';

const LoginPage = ({ isAuthenticated, setIsAuthenticated, setEmployeeInfo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleLogin = async () => {
    setIsSubmitted(true); 
    if (!email.includes('@jamunabank.com.bd')) {
      setMessage('Please enter the full email including @jamunabank.com.bd');
      return; 
    }
    try {
      setLoading(true);

      const response = await axios.post('http://172.23.190.52:3009/Authentication/authenticate', {
        email,
        password,
      });

      if (response.data.Success) {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('email', email);

        const employeeInfoResponse = await axios.post('http://172.23.190.52:3004/getEmployeeInfo', {
          mail: email,
        });

        const employeeInfo = employeeInfoResponse.data[0];
        setEmployeeInfo(employeeInfo);

        localStorage.setItem('employeeInfo', JSON.stringify(employeeInfo));

        console.log('Employee Information:', employeeInfo); 

      } else {
        setMessage('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('An error occurred during authentication.');
      console.error('Error during authentication:', error); 
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage(''); // Reset error message when email changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className='loginBox'>
      <div id="login-form">
        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        )}

        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder='example@jamunabank.com.bd'
            className={message && !email.includes('@jamunabank.com.bd') && isSubmitted ? 'invalid' : ''}
          />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
          {message && <p className="error">{message}</p>}
          <input type="submit" value="Submit" disabled={loading} />
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
