import { useState } from 'react';
import axios from '../utils/axios';

const AddReviewModal = ({ closeModal, bookId }) => {
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`/books/${bookId}/reviews`, {
        rating,
        reviewText: text
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      closeModal();
    } catch (error) {
      console.error('Failed to add review', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">Add Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rating" className="block">Rating:</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 w-full"
              required
            >
              <option value="">Select rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block">Review:</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
      </div>
      <button onClick={closeModal} className="absolute top-4 right-4 text-white text-2xl">×</button>
    </div>
  );
};

export default AddReviewModal;
