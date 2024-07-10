import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/MainPage';
import BooksPage from './components/BookPage';
import Error from './components/Error';
import BookDetailsPage from './components/BookDetail';

const AppLayout = () => (
  <div className="w-full min-h-[100vh] flex flex-col">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/books", element: <BooksPage /> },
      { path: "/books/details/:id", element: <BookDetailsPage /> }
    ],
    errorElement: <Error/>
  }
]);

const App = () => (
  <AuthProvider>
    <RouterProvider router={AppRouter} />
  </AuthProvider>
);

export default App;
