"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
});

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
  setCart((prev) => {
    const existing = prev.find((p) => p.id === item.id);

    if (existing) {
      return prev.map((p) =>
        p.id === item.id
          ? { ...p, quantity: p.quantity + 20 }
          : p
      );
    }

    return [
      ...prev,
      {
        ...item,
        quantity: 20,
      },
    ];
  });
};

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

 const increaseQuantity = (id: string) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 20 }
        : item
    )
  );
};

  const decreaseQuantity = (id: string) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 20 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}