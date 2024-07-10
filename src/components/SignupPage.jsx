import { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users/register', { email, password, username });
      setIsOtpSent(true);
    } catch (error) {
      console.error('Signup failed', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Signup failed');
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post('/users/verify-otp', { email, otp: otp.toString() });
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/login');
    } catch (error) {
      console.error('Error verifying OTP or saving tokens', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      {!isOtpSent ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="username" className="block">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
        </form>
      ) : (
        <div className="mt-4">
          <div className="mb-4">
            <label htmlFor="otp" className="block">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button onClick={handleOtpVerification} className="bg-blue-500 text-white p-2 rounded">Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
