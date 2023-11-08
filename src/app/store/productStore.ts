import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProductStore = {
  products: Product[];
  add: (newProduct: Product) => void;
  update: (productToUpdate: Product) => void;
  delete: (productToDelete: Product) => void;
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      add: (newProduct: Product) =>
        set((state) => ({ products: [...state.products, newProduct] })),
      update: (productToUpdate: Product) =>
        set((state) => {
          // Need to add ID field to check for change
          const index = state.products.findIndex(
            (item) => item.id === productToUpdate.id
          );
          const updatedProducts = [...state.products];

          updatedProducts[index] = productToUpdate;

          return {
            products: updatedProducts,
          };
        }),
      delete: (productToDelete: Product) =>
        set((state) => {
          const index = state.products.findIndex(
            (item) => item.id === productToDelete.id
          );

          return {
            products: [
              ...state.products.slice(0, index),
              ...state.products.splice(index + 1),
            ],
          };
        }),
    }),
    {
      name: "product-store",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
