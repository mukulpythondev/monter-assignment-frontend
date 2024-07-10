import { useState, useEffect } from 'react';
import axios from '../utils/axios';

const UserDetailsModal = ({ email, closeModal }) => {
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [work, setWork] = useState('');
  const [dob, setDob] = useState('');
  const [description, setDescription] = useState('');

  // Fetch existing user details to prefill the form
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/users/details', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userDetails = response.data.data;
        setLocation(userDetails.location || '');
        setAge(userDetails.age || '');
        setWork(userDetails.work || '');
        setDob(userDetails.dob || '');
        setDescription(userDetails.description || '');
      } catch (error) {
        console.error('Failed to fetch user details for prefill', error.response?.data?.message || error.message);
      }
    };

    fetchUserDetails();
  }, [email,location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put('/auth/update-info', {
        location,
        age,
        work,
        dob,
        description
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      closeModal();
    } catch (error) {
      console.error('Failed to update user details', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded relative">
        <button
          onClick={closeModal}
          className="absolute top-2 text-2xl right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="location" className="block">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="work" className="block">Work:</label>
            <input
              type="text"
              id="work"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dob" className="block">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block">Brief Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsModal;
