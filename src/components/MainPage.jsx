import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/authContext';
import UserDetailsModal from './UserDetailsModel';
import axios from '../utils/axios';

const MainPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/users/details', { // Adjusted to '/users/' to get basic user info
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = response.data.data;

        setUserDetails(user);

        // Check if user details are incomplete
        if (!user.location || !user.age || !user.work || !user.dob || !user.description) {
          setUserEmail(user.email);
          setShowModal(true);
        }
      } catch (error) {
        console.error('Failed to fetch user details', error.response?.data?.message || error.message);
      }
    };

    if (isAuthenticated) {
      fetchUserDetails();
    }
  }, [isAuthenticated]);

  const closeModal = () => setShowModal(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Book Review Application</h1>
      
      {/* Display user details if available */}
      {userDetails && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold">User Information</h2>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Location:</strong> {userDetails.location}</p>
          <p><strong>Age:</strong> {userDetails.age}</p>
          <p><strong>Work:</strong> {userDetails.work}</p>
          <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
          <p><strong>Description:</strong> {userDetails.description}</p>
        </div>
      )}
      
      {/* Button to update user info */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Update Info
      </button>

      {showModal && <UserDetailsModal email={userEmail} closeModal={closeModal} />}
    </div>
  );
};

export default MainPage;
