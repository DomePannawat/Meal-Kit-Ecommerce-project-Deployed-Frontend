import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  
  type CartItem = {
    id: string;
    name: string;
    quantity: number;
  };
  
  type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem, quantity: number) => void;
    getCartItemCount: () => number;
    clearCart: () => void;
  };
  
  const CartContext = createContext<CartContextType | undefined>(undefined);
  
  interface CartProviderProps {
    children: ReactNode;
  }
  
  export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
    useEffect(() => {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);
  
    const addToCart = (item: CartItem, quantity: number) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id);
    
        if (existingItem) {
          return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        } else {
          return [...prevItems, { ...item, quantity }];
        }
      });
    };
    
    
  
    const getCartItemCount = () => {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
  
    const clearCart = () => {
      setCartItems([]);
      localStorage.removeItem("cartItems");
    };
  
    return (
      <CartContext.Provider
        value={{ cartItems, addToCart, getCartItemCount, clearCart }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
  };
  