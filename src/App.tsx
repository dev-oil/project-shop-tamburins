import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/common/Header';
import CategoryPage from './pages/Product/CategoryPage';
import ProductDetail from './pages/Product/ProductDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CartProvider, useCart } from './context/CartContext';
import CartModal from './components/CartModal';
import LoginPage from './pages/Login/LoginPage';
import MyPage from './pages/MyPage';
import SignUpPage from './pages/Login/SignUpPage';
import FindPwPage from './pages/Login/FindPwPage';
import ResetPasswordPage from './pages/Login/ResetPasswordPage';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicOnlyRoute from './components/routes/PublicOnlyRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Header />
          <Layout />
        </Router>
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

const Layout = () => {
  const { isCartOpen, closeCart } = useCart();

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:category' element={<CategoryPage />} />
        <Route
          path='/category/:category/:subCategory'
          element={<CategoryPage />}
        />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route
          path='/login'
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <PublicOnlyRoute>
              <SignUpPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path='/find/pw'
          element={
            <PublicOnlyRoute>
              <FindPwPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PublicOnlyRoute>
              <ResetPasswordPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path='/mypage'
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
      </Routes>

      {isCartOpen && <CartModal onClose={closeCart} />}
    </>
  );
};

export default App;
