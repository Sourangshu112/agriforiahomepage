import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  itemCount: number;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  itemCount: 0,
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          itemCount: state.itemCount + 1,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        itemCount: state.itemCount + 1,
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
      itemCount: state.itemCount - (state.items.find((i) => i.id === id)?.quantity || 0),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      ),
      itemCount: state.itemCount + (quantity - (state.items.find((i) => i.id === id)?.quantity || 0)),
    })),
}));