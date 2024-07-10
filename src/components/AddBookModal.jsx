import { useState } from 'react';
import axios from '../utils/axios';

const AddBookModal = ({ closeModal, fetchBooks }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState(''); // New state for genre

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('/books/create', {
        title,
        author,
        description,
        genre // Include genre in request
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchBooks(); // Refresh book list
      closeModal(); // Close modal
    } catch (error) {
      console.error('Failed to add book', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block">Author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="block">Genre:</label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Book</button>
        </form>
        <button onClick={closeModal} className="bg-red-500 text-white p-2 rounded mt-4">Close</button>
      </div>
    </div>
  );
};

export default AddBookModal;
