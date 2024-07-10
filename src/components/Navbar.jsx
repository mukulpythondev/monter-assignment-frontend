import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <button onClick={() => handleNavClick('/')} className="text-white px-3">Home</button>
          <button onClick={() => handleNavClick('/books')} className="text-white px-3">Books</button>
        </div>
        <div>
          {isAuthenticated ? (
            <>
              <button onClick={logout} className="text-white px-3">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="text-white px-3">Login</button>
              <button onClick={() => navigate('/signup')} className="text-white px-3">Signup</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
