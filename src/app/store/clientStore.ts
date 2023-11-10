import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ClientStore = {
  clients: Client[];
  setClients: (clients: Client[]) => void;
  add: (newClient: Client) => void;
  update: (clientToUpdate: Client) => void;
  delete: (clientToDelete: Client) => void;
};

export const useClientStore = create<ClientStore>()(
  persist(
    (set) => ({
      clients: [],
      setClients: (clients: Client[]) => set((state) => ({ clients })), // TODO: Update with real array
      add: (newClient: Client) =>
        set((state) => ({ clients: [...state.clients, newClient] })),
      update: (clientToUpdate: Client) =>
        set((state) => {
          // Need to add ID field to check for change
          const index = state.clients.findIndex(
            (item) => item.id === clientToUpdate.id
          );
          const updatedClients = [...state.clients];

          updatedClients[index] = clientToUpdate;

          return {
            clients: updatedClients,
          };
        }),
      delete: (clientToDelete: Client) =>
        set((state) => {
          const index = state.clients.findIndex(
            (item) => item.id === clientToDelete.id
          );

          return {
            clients: [
              ...state.clients.slice(0, index),
              ...state.clients.splice(index + 1),
            ],
          };
        }),
    }),
    {
      name: "client-store",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
