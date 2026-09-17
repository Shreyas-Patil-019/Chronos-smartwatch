import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Loader from './components/ui/Loader';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CustomizerProvider } from './context/CustomizerContext';

import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/home/HomePage'));
const TechnologyPage = lazy(() => import('./pages/technology/TechnologyPage'));
const ProductsPage = lazy(() => import('./pages/products/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/product/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/cart/CartPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const AccountPage = lazy(() => import('./pages/account/AccountPage'));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage'));

// Static & Auxiliary Pages
const WishlistPage = lazy(() => import('./pages/static/WishlistPage'));
const OrderSuccessPage = lazy(() => import('./pages/static/OrderSuccessPage'));
const AboutPage = lazy(() => import('./pages/static/AboutPage'));
const ContactPage = lazy(() => import('./pages/static/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/static/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/static/TermsPage'));
const ShippingPage = lazy(() => import('./pages/static/ShippingPage'));
const ReturnsPage = lazy(() => import('./pages/static/ReturnsPage'));
const NotFoundPage = lazy(() => import('./pages/static/NotFoundPage'));

export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CustomizerProvider>
              <BrowserRouter>
                <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><Loader label="Loading Chronos..." /></div>}>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<HomePage />} />
                      <Route path="technology" element={<TechnologyPage />} />
                      <Route path="products" element={<ProductsPage />} />
                      <Route path="products/:slug" element={<ProductDetailPage />} />
                      <Route path="cart" element={<CartPage />} />
                      <Route path="wishlist" element={<WishlistPage />} />
                      <Route path="login" element={<LoginPage />} />
                      <Route path="register" element={<RegisterPage />} />
                      <Route path="forgot-password" element={<ForgotPasswordPage />} />
                      <Route
                        path="account"
                        element={
                          <ProtectedRoute>
                            <AccountPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="checkout"
                        element={
                          <ProtectedRoute>
                            <CheckoutPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="order-success" element={<OrderSuccessPage />} />
                      <Route path="about" element={<AboutPage />} />
                      <Route path="contact" element={<ContactPage />} />
                      <Route path="privacy" element={<PrivacyPage />} />
                      <Route path="terms" element={<TermsPage />} />
                      <Route path="shipping" element={<ShippingPage />} />
                      <Route path="returns" element={<ReturnsPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Route>
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </CustomizerProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
