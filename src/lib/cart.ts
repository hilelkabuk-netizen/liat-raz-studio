export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  type: "product" | "voucher";
}

const CART_KEY = "liatraz-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id && i.type === item.type);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
}

export function updateQuantity(id: string, quantity: number) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    if (quantity <= 0) {
      saveCart(cart.filter((i) => i.id !== id));
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
}

export function clearCart() {
  saveCart([]);
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
