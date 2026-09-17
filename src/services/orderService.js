/**
 * CHRONOS Order Service Abstraction
 * 
 * Manages order creation, unique order ID generation, local persistence,
 * and order history retrieval for authenticated accounts.
 * 
 * SECURITY NOTE:
 * Plaintext payment credentials, passwords, or secrets are NEVER collected or stored.
 */

const ORDERS_STORAGE_KEY = 'chronos_orders_archive_v1';

/**
 * Generate a unique luxury order identifier (e.g. CHR-2026-8K9P2X)
 * @returns {string}
 */
export const generateOrderId = () => {
  const year = new Date().getFullYear();
  const randomSegment = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CHR-${year}-${randomSegment}`;
};

/**
 * Retrieve all stored demo orders from localStorage
 * @returns {Array<object>}
 */
export const getAllOrders = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read CHRONOS orders from localStorage:', e);
  }
  return [];
};

/**
 * Retrieve an order by its unique Order ID
 * @param {string} orderId 
 * @returns {object|null}
 */
export const getOrderById = (orderId) => {
  if (!orderId) return null;
  const orders = getAllOrders();
  return orders.find((o) => o.orderId === orderId) || null;
};

/**
 * Retrieve all orders associated with a specific user email or ID
 * @param {string} userEmailOrId 
 * @returns {Array<object>}
 */
export const getUserOrders = (userEmailOrId) => {
  if (!userEmailOrId) return [];
  const normalized = userEmailOrId.trim().toLowerCase();
  const orders = getAllOrders();
  return orders.filter(
    (o) =>
      (o.userId && o.userId.toLowerCase() === normalized) ||
      (o.customer?.email && o.customer.email.toLowerCase() === normalized)
  );
};

/**
 * Get the most recently placed order
 * @returns {object|null}
 */
export const getLatestOrder = () => {
  const orders = getAllOrders();
  return orders.length > 0 ? orders[0] : null;
};

/**
 * Create and persist a new demo order
 * @param {object} payload
 * @returns {Promise<object>} Created order object
 */
export const createOrder = async (payload) => {
  // Simulate network latency for realistic checkout experience
  await new Promise((resolve) => setTimeout(resolve, 800));

  const {
    userId,
    customer,
    shippingAddress,
    shippingMethod,
    items,
    subtotal,
    shippingFee = 0,
    total,
  } = payload;

  if (!items || !items.length) {
    throw new Error('Cannot create an order with an empty cart.');
  }

  if (!customer?.name || !customer?.email || !customer?.phone) {
    throw new Error('Customer contact information is incomplete.');
  }

  if (!shippingAddress?.addressLine1 || !shippingAddress?.city || !shippingAddress?.state || !shippingAddress?.postalCode) {
    throw new Error('Shipping address information is incomplete.');
  }

  const orderId = generateOrderId();
  const newOrder = {
    orderId,
    createdAt: new Date().toISOString(),
    userId: userId || customer.email,
    customer: {
      name: customer.name.trim(),
      email: customer.email.trim().toLowerCase(),
      phone: customer.phone.trim(),
    },
    shippingAddress: {
      fullName: shippingAddress.fullName?.trim() || customer.name.trim(),
      addressLine1: shippingAddress.addressLine1.trim(),
      addressLine2: (shippingAddress.addressLine2 || '').trim(),
      city: shippingAddress.city.trim(),
      state: shippingAddress.state.trim(),
      postalCode: shippingAddress.postalCode.trim(),
      country: shippingAddress.country?.trim() || 'India',
      phone: (shippingAddress.phone || customer.phone).trim(),
    },
    shippingMethod: {
      id: shippingMethod?.id || 'standard',
      name: shippingMethod?.name || 'Complimentary Global Express',
      price: typeof shippingMethod?.price === 'number' ? shippingMethod.price : 0,
      estimatedDelivery: shippingMethod?.estimatedDelivery || '3–5 Business Days',
    },
    items: items.map((item) => ({
      key: item.key,
      productId: item.product?.id,
      name: item.product?.name,
      slug: item.product?.slug,
      price: item.product?.price,
      image: item.product?.images?.[0] || '/assets/chronos-pro-main.jpg',
      category: item.product?.category,
      quantity: item.quantity,
      customization: item.customization || null,
    })),
    subtotal,
    shippingFee,
    total,
    status: 'ALLOCATION CONFIRMED',
    trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
  };

  try {
    const existing = getAllOrders();
    const updated = [newOrder, ...existing];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not persist new order to localStorage:', e);
  }

  return newOrder;
};
