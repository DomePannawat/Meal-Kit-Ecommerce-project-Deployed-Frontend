import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuthContext } from "../Context/AuthContext";
import axios from "axios";

type MenuItem = {
  _id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

type MenuContextType = {
  menuItems: MenuItem[];
  filterCategory: (categories: string) => void;
  sortByPrice: (order: "asc" | "desc" | "default") => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]); // เก็บข้อมูลต้นฉบับ
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // เก็บข้อมูลที่เปลี่ยนแปลงได้
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/product`
        );
        headers: {
          Authorization: `Bearer ${token}`;
        }

        setAllMenuItems(response.data.products); // เก็บข้อมูลต้นฉบับ
        setMenuItems(response.data.products); // ตั้งค่าข้อมูลเริ่มต้น
      } catch (err) {
        console.error(err);
      }
    };

    fetchMenuItems();
  }, [token]);

  const filterCategory = (categories: string) => {
    const regex = new RegExp(categories, "i");
    setMenuItems(
      categories
        ? allMenuItems.filter((item) => regex.test(item.category))
        : allMenuItems // รีเซ็ตกลับเป็นข้อมูลต้นฉบับ
    );
  };

  const sortByPrice = (order: "asc" | "desc" | "default") => {
    let sortedItems;
    if (order === "asc") {
      sortedItems = [...menuItems].sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sortedItems = [...menuItems].sort((a, b) => b.price - a.price);
    } else {
      sortedItems = [...allMenuItems]; // เรียงลำดับตามข้อมูลต้นฉบับ
    }
    setMenuItems(sortedItems);
  };

  return (
    <MenuContext.Provider value={{ menuItems, filterCategory, sortByPrice }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context)
    throw new Error("useMenuContext must be used within a MenuProvider");
  return context;
};
