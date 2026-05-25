// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("dental_cart");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("dental_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // CORRECCIÓN SÓLIDA: Si se pasa 'clearAll' como true, borra todo. Si no, resta 1 de forma segura.
  const removeFromCart = (id, clearAll = false) => {
    setCart(prev => {
      if (clearAll) {
        return prev.filter(item => item.id !== id);
      }
      
      return prev.map(item => {
        if (item.id === id) {
          // Solo restamos si es mayor a 1 para blindar que nunca quede en 0 o negativo
          return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item;
        }
        return item;
      });
    });
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    // Agregamos 'setCart' al Provider para mantener compatibilidad absoluta con tus archivos
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);