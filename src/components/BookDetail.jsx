import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import AddReviewModal from '../components/AddReviewModal';

const BookDetailsPage = () => {
  const { id } = useParams(); // Assuming your route parameter is named `id`
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/books/details?bookId=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBook(response.data.data);
      } catch (error) {
        console.error('Failed to fetch book details', error.response?.data?.message || error.message);
      }
    };

    fetchBookDetails();
  }, [id]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="container mx-auto p-4">
      {book ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Average Rating:</strong> {book.averageRating || 'No reviews yet'}</p>
          <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded">
            {book.reviews && book.reviews.length ? 'Add Review' : 'No Reviews - Add Review'}
          </button>
          {showModal && <AddReviewModal closeModal={closeModal} bookId={book._id} />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetailsPage;
