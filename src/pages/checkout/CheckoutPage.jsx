import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import usePageSEO from '../../hooks/usePageSEO';
import {
  ShieldCheck,
  Truck,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  AlertCircle,
  Sparkles,
  Lock,
  User,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';
import { createOrder } from '../../services/orderService';
import Button from '../../components/ui/Button';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR',
  'Chandigarh',
];

const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    name: 'Complimentary White-Glove Courier',
    description: 'Insured temperature-controlled international transit with real-time telemetry.',
    price: 0,
    estimatedDelivery: '3–5 Business Days',
  },
  {
    id: 'priority',
    name: 'Priority Armored Air Transport',
    description: 'Dedicated direct flight allocation with personal biometric courier handoff.',
    price: 35,
    estimatedDelivery: '1–2 Business Days',
  },
];

export const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, cartSubtotal, totalItemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  usePageSEO({
    title: 'CHRONOS — Secure Timepiece Allocation Checkout',
    description: 'Complete your luxury timepiece allocation with white-glove courier delivery and full international warranty coverage.',
  });

  // Form State initialized with authenticated user details
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
    country: 'India',
  });

  const [selectedShippingId, setSelectedShippingId] = useState('standard');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Find selected shipping method
  const selectedShipping =
    SHIPPING_OPTIONS.find((s) => s.id === selectedShippingId) || SHIPPING_OPTIONS[0];

  const shippingFee = selectedShipping.price;
  const grandTotal = cartSubtotal + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setSubmitError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Street address is required.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State / Region is required.';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal / PIN code is required.';
    } else if (formData.postalCode.trim().length < 4) {
      newErrors.postalCode = 'Please enter a valid postal code.';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (cartItems.length === 0) {
      setSubmitError('Your cart is empty. Please add items to proceed.');
      return;
    }

    if (!validateForm()) {
      setSubmitError('Please complete all required fields correctly before placing your order.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        userId: user?.id || user?.email || formData.email,
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          fullName: formData.fullName,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        shippingMethod: selectedShipping,
        items: cartItems,
        subtotal: cartSubtotal,
        shippingFee,
        total: grandTotal,
      };

      const createdOrder = await createOrder(orderPayload);

      // Clear Cart (Wishlist remains untouched)
      clearCart();

      // Navigate to order confirmation
      navigate(`/order-success?orderId=${createdOrder.orderId}`, {
        state: { order: createdOrder },
        replace: true,
      });
    } catch (err) {
      setSubmitError(err.message || 'Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  // If cart is empty, show polished fallback
  if (cartItems.length === 0) {
    return (
      <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black flex items-center justify-center px-4 py-28 overflow-x-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-10 sm:p-14 bg-zinc-950/90 border border-zinc-800 rounded-3xl text-center space-y-6 max-w-lg mx-auto shadow-2xl backdrop-blur-xl relative z-10"
        >
          <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-inner">
            <ShoppingBag className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-mono font-black text-white uppercase tracking-tight">
              YOUR CART IS EMPTY
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              No timepieces or bespoke accessories have been added for checkout. Explore the collection to configure your timepiece.
            </p>
          </div>

          <div className="pt-2">
            <Link to="/products">
              <Button
                variant="gold"
                size="lg"
                style={{ color: '#000000', backgroundColor: '#d4af37' }}
                className="font-mono text-xs uppercase tracking-widest font-bold px-8 py-4 shadow-xl hover:shadow-amber-500/20"
              >
                <span style={{ color: '#000000', fontWeight: 800 }}>Explore Collection</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* Background Soft Studio Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-10 relative z-10">
        {/* Navigation Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Shopping Bag</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <div className="space-y-2 border-b border-zinc-800/80 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-zinc-900 border border-amber-400/30 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              SECURE BESPOKE CHECKOUT
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-black text-white uppercase tracking-tight">
            FINAL ALLOCATION & <span className="text-gradient-gold">DISPATCH.</span>
          </h1>
        </div>

        {/* Global Submit Error Banner */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-3 text-xs text-rose-400 font-mono"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </motion.div>
        )}

        {/* Two-Column Desktop Layout */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Contact, Shipping, Delivery & Demo Payment Notice */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section 1: Customer Contact Info */}
            <div className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                <div className="p-2 bg-amber-400/10 rounded-xl text-amber-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block">
                    STEP 01 // IDENTITY
                  </span>
                  <h2 className="text-base font-mono font-bold text-white uppercase tracking-wide">
                    Contact Information
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Lord Alexander Vance"
                    className={`w-full px-4 py-3 bg-zinc-900/80 border ${
                      errors.fullName ? 'border-rose-500' : 'border-zinc-800'
                    } rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 transition`}
                  />
                  {errors.fullName && <p className="text-[11px] font-mono text-rose-400">{errors.fullName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vance@chronos.luxury"
                    className={`w-full px-4 py-3 bg-zinc-900/80 border ${
                      errors.email ? 'border-rose-500' : 'border-zinc-800'
                    } rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 transition`}
                  />
                  {errors.email && <p className="text-[11px] font-mono text-rose-400">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 bg-zinc-900/80 border ${
                      errors.phone ? 'border-rose-500' : 'border-zinc-800'
                    } rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 transition`}
                  />
                  {errors.phone && <p className="text-[11px] font-mono text-rose-400">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: Shipping Destination Address */}
            <div className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                <div className="p-2 bg-amber-400/10 rounded-xl text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block">
                    STEP 02 // LOGISTICS
                  </span>
                  <h2 className="text-base font-mono font-bold text-white uppercase tracking-wide">
                    Shipping Address
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="addressLine1" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Street Address / Estate <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    type="text"
                    autoComplete="street-address"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="Penthouse 42, Sky Tower, Marine Drive"
                    className={`w-full px-4 py-3 bg-zinc-900/80 border ${
                      errors.addressLine1 ? 'border-rose-500' : 'border-zinc-800'
                    } rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 transition`}
                  />
                  {errors.addressLine1 && <p className="text-[11px] font-mono text-rose-400">{errors.addressLine1}</p>}
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="addressLine2" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Apartment / Suite / Landmark <span className="text-zinc-600 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="addressLine2"
                    name="addressLine2"
                    type="text"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Near Oberoi Promenade"
                    className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="city" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    City <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className={`w-full px-4 py-3 bg-zinc-900/80 border ${
                      errors.city ? 'border-rose-500' : 'border-zinc-800'
                    } rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 transition`}
                  />
                  {errors.city && <p className="text-[11px] font-mono text-rose-400">{errors.city}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="state" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    State / Province <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-400/80 transition cursor-pointer"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st} className="bg-zinc-950 text-white">
                        {st}
                      </option>
                    ))}
                    <option value="Other International Region" className="bg-zinc-950 text-white">
                      Other International Region
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="postalCode" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Postal / PIN Code <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="400021"
                    className={`w-full px-4 py-3 bg-zinc-900/80 border ${
                      errors.postalCode ? 'border-rose-500' : 'border-zinc-800'
                    } rounded-xl text-white text-xs sm:text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-amber-400/80 transition`}
                  />
                  {errors.postalCode && <p className="text-[11px] font-mono text-rose-400">{errors.postalCode}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="country" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Country <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-400/80 transition cursor-pointer"
                  >
                    <option value="India" className="bg-zinc-950 text-white">India</option>
                    <option value="United States" className="bg-zinc-950 text-white">United States</option>
                    <option value="United Kingdom" className="bg-zinc-950 text-white">United Kingdom</option>
                    <option value="United Arab Emirates" className="bg-zinc-950 text-white">United Arab Emirates</option>
                    <option value="Singapore" className="bg-zinc-950 text-white">Singapore</option>
                    <option value="Switzerland" className="bg-zinc-950 text-white">Switzerland</option>
                    <option value="Germany" className="bg-zinc-950 text-white">Germany</option>
                    <option value="Japan" className="bg-zinc-950 text-white">Japan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Shipping & Delivery Method */}
            <div className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                <div className="p-2 bg-amber-400/10 rounded-xl text-amber-400">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block">
                    STEP 03 // DISPATCH TIER
                  </span>
                  <h2 className="text-base font-mono font-bold text-white uppercase tracking-wide">
                    Delivery Speed & Handling
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((option) => {
                  const isSelected = selectedShippingId === option.id;
                  return (
                    <label
                      key={option.id}
                      onClick={() => setSelectedShippingId(option.id)}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400/5 border-amber-400/80 shadow-md shadow-amber-500/5'
                          : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                            isSelected
                              ? 'border-amber-400 bg-amber-400'
                              : 'border-zinc-700 bg-zinc-900'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-mono font-bold text-white">
                              {option.name}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded">
                              {option.estimatedDelivery}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          {option.price === 0 ? 'COMPLIMENTARY' : formatCurrency(option.price)}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Demo Payment Section */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-zinc-950 via-zinc-900/70 to-zinc-950 border border-zinc-800 rounded-3xl space-y-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block">
                    STEP 04 // CONFIRMATION
                  </span>
                  <h2 className="text-base font-mono font-bold text-white uppercase tracking-wide">
                    Payment Method
                  </h2>
                </div>
              </div>

              <div className="p-5 bg-zinc-900/50 border border-amber-400/20 rounded-2xl space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Interactive Portfolio Demonstration</span>
                </div>
                <p className="text-zinc-400 font-sans leading-relaxed text-xs">
                  This checkout is a high-fidelity prototype. No payment gateway is connected, and no live credit card, bank details, or UPI transactions are required.
                </p>
              </div>

              {/* Submit CTA for Mobile */}
              <div className="lg:hidden pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={isSubmitting}
                  style={{ color: '#000000', backgroundColor: '#d4af37' }}
                  className="w-full font-mono text-xs uppercase tracking-widest font-bold py-4 flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span style={{ color: '#000000', fontWeight: 800 }}>PROCESSING SECURE ALLOCATION...</span>
                  ) : (
                    <>
                      <span style={{ color: '#000000', fontWeight: 800 }}>
                        PLACE ORDER // {formatCurrency(grandTotal)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-black" style={{ color: '#000000' }} />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Customization List */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 bg-zinc-950/90 border border-zinc-800/90 rounded-3xl space-y-6 shadow-2xl backdrop-blur-xl sticky top-28">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block mb-1">
                  ALLOCATION SUMMARY
                </span>
                <h3 className="text-xl font-mono font-black text-white uppercase tracking-tight">
                  YOUR TIMEPIECES ({totalItemCount})
                </h3>
              </div>

              {/* Ordered Items List with Customization Previews */}
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {cartItems.map((item) => {
                  const colorObj = item.product?.colors?.find(
                    (c) => c.hex === item.customization?.color || c.id === item.customization?.color
                  );
                  const colorName = colorObj?.name || (item.customization?.color ? 'Custom Finish' : null);
                  const colorHex = colorObj?.hex || (item.customization?.color?.startsWith('#') ? item.customization.color : '#121214');
                  const faceObj = item.product?.watchFaces?.find((f) => f.id === item.customization?.watchFace);
                  const faceName = faceObj?.name || item.customization?.watchFace || null;

                  return (
                    <div
                      key={item.key || item.product?.id}
                      className="p-3.5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl flex items-center gap-3.5"
                    >
                      <div className="w-16 h-16 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-1.5 shrink-0">
                        <img
                          src={item.product?.images?.[0] || '/assets/chronos-pro-main.jpg'}
                          alt={item.product?.name}
                          className="w-full h-full object-contain filter drop-shadow"
                        />
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-mono font-bold text-white uppercase truncate">
                            {item.product?.name}
                          </h4>
                          <span className="text-xs font-mono font-bold text-white shrink-0">
                            {formatCurrency((item.product?.price || 0) * (item.quantity || 1))}
                          </span>
                        </div>

                        {/* Customization Details Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                          {colorName && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-300">
                              <span
                                className="w-2 h-2 rounded-full border border-zinc-600 shrink-0"
                                style={{ backgroundColor: colorHex }}
                              />
                              <span>{colorName}</span>
                            </span>
                          )}
                          {faceName && (
                            <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-amber-400">
                              {faceName}
                            </span>
                          )}
                          <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-400">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-3 pt-4 border-t border-zinc-800/80 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Product Subtotal</span>
                  <span className="text-white font-bold">{formatCurrency(cartSubtotal)}</span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>{selectedShipping.name}</span>
                  <span className={shippingFee === 0 ? 'text-emerald-400 font-bold' : 'text-white font-bold'}>
                    {shippingFee === 0 ? 'COMPLIMENTARY' : formatCurrency(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Import Duties</span>
                  <span className="text-zinc-300">INCLUDED</span>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-mono font-bold text-white uppercase block">
                      Grand Total
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Taxes & duties inclusive</span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono text-gradient-gold">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Desktop Submit Button */}
              <div className="hidden lg:block pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={isSubmitting}
                  style={{ color: '#000000', backgroundColor: '#d4af37' }}
                  className="w-full font-mono text-xs uppercase tracking-widest font-bold py-4 flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span style={{ color: '#000000', fontWeight: 800 }}>PROCESSING ALLOCATION...</span>
                  ) : (
                    <>
                      <span style={{ color: '#000000', fontWeight: 800 }}>PLACE ORDER</span>
                      <ArrowRight className="w-4 h-4 text-black" style={{ color: '#000000' }} />
                    </>
                  )}
                </Button>
              </div>

              {/* Trust & Guarantee Badges */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-2 text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>2-Year International Hardware Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>30-Day Bespoke Return Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
