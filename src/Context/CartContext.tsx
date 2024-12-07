import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CartItem = {
  _id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem, quantity: number) => void;
  getCartItemCount: () => number;
  updateQuantity: (_id: number, quantity: number) => void;
  removeFromCart: (_id: number) => void;
  clearCart: () => void;
  totalAmount: number;
  userInfo: { name: string; address: string };
  updateUserInfo: (name: string, address: string) => void;
  clearUserInfo: () => void; 
};

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<{ name: string; address: string }>({
    name: "",
    address: "",
  });

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  const addToCart = (product: any, quantity: number) => {
    const existingProductIndex = cartItems.findIndex(item => item._id === product._id);
    if (existingProductIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const updateQuantity = (_id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (_id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== _id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    setTotalAmount(0);
  };

  // ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้
  const updateUserInfo = (name: string, address: string) => {
    setUserInfo({ name, address });
  };

  // ฟังก์ชันลบข้อมูลผู้ใช้
  const clearUserInfo = () => {
    setUserInfo({ name: "", address: "" }); // รีเซ็ตข้อมูลผู้ใช้ให้เป็นค่าว่าง
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemCount,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
        userInfo,
        updateUserInfo,
        clearUserInfo, 
      }}
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