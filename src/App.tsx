import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CartProvider, useCart } from './context/CartContext';
import CartModal from './components/CartModal';
import Login from './pages/Login/LoginPage';
import MyPage from './pages/MyPage';
import SignUpPage from './pages/Login/SignUpPage';
import FindPwPage from './pages/Login/FindPwPage';
import ResetPasswordPage from './pages/Login/ResetPasswordPage';

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
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/find/pw' element={<FindPwPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
      </Routes>

      {isCartOpen && <CartModal onClose={closeCart} />}
    </>
  );
};

export default App;
