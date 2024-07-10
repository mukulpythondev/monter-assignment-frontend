import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import AddBookModal from '../components/AddBookModal';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('/books/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBooks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Failed to fetch books', error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    

    fetchBooks();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Library</h1>
      <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded mb-4">Add Book</button>
      {books.length === 0 ? (
        <p>Your library is empty</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id} className="border p-2 mb-2">
              <Link to={`/books/details/${book._id}`}>
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {showModal && <AddBookModal closeModal={closeModal} fetchBooks={() => fetchBooks()} />}
    </div>
  );
};

export default BooksPage;
