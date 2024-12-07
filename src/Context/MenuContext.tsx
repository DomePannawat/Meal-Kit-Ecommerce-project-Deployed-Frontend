import React, { createContext, useContext, useState, ReactNode } from "react";
import { food_list } from "../assets/assets";

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
  const [menuItems, setMenuItems] = useState<MenuItem[]>(food_list);

  const filterCategory = (categories: string) => {
    const regex = new RegExp(categories, "i");
    setMenuItems(
      categories
        ? food_list.filter((item) => regex.test(item.category))
        : food_list
    );
  };

  const sortByPrice = (order: "asc" | "desc" | "default") => {
    let sortedItems;
    if (order === "asc") {
      sortedItems = [...menuItems].sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sortedItems = [...menuItems].sort((a, b) => b.price - a.price);
    } else {
      sortedItems = [...menuItems].sort(
        (a, b) => a._id - b._id

      );
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