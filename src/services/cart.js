const CART_KEY = 'in_cart';

// Older versions stored one array entry per unit added, with no quantity field.
// Group those into one line per product so existing carts keep working.
export function normalizeCart(items) {
  if (!Array.isArray(items)) return [];
  return items.reduce((cart, item) => {
    if (!item || !item.id) return cart;
    const quantity = Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1;
    const line = cart.find((entry) => entry.id === item.id);
    if (line) {
      line.quantity += quantity;
      return cart;
    }
    const { id, title, thumbnail, price } = item;
    return [...cart, { id, title, thumbnail, price: Number(price), quantity }];
  }, []);
}

export function readCart() {
  try {
    return normalizeCart(JSON.parse(localStorage.getItem(CART_KEY)));
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addItem(cart, product, quantity = 1) {
  return normalizeCart([...cart, { ...product, quantity }]);
}

export function setQuantity(cart, id, quantity) {
  if (quantity < 1) return cart.filter((item) => item.id !== id);
  return cart.map((item) => (item.id === id ? { ...item, quantity } : item));
}

export const cartCount = (cart) => cart.reduce((sum, item) => sum + item.quantity, 0);
export const cartTotal = (cart) => cart
  .reduce((sum, item) => sum + item.price * item.quantity, 0);
