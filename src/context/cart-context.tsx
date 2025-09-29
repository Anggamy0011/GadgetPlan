'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

type CartItem = {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  color?: string;
  storage?: string;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => 
        item.productId === action.payload.productId && 
        item.color === action.payload.color && 
        item.storage === action.payload.storage
      );
      
      if (existingItem) {
        // If item with same options exists, update quantity
        const updatedItems = state.items.map(item => 
          item.id === existingItem.id 
            ? { ...item, quantity: item.quantity + action.payload.quantity } 
            : item
        );
        
        const newTotal = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity, 
          0
        );
        
        return { items: updatedItems, total: newTotal };
      } else {
        // Add new item
        const newItems = [...state.items, action.payload];
        const newTotal = newItems.reduce(
          (sum, item) => sum + item.price * item.quantity, 
          0
        );
        
        return { items: newItems, total: newTotal };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 
        0
      );
      
      return { items: updatedItems, total: newTotal };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => 
        item.id === action.payload.id 
          ? { ...item, quantity: Math.max(1, action.payload.quantity) } 
          : item
      );
      
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 
        0
      );
      
      return { items: updatedItems, total: newTotal };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  total: 0,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};