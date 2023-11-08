import { create } from "zustand";

type ClientStore = {
  clients: Client[];
  add: (newClient: Client) => void;
  update: (clientToUpdate: Client) => void;
  delete: (clientToDelete: Client) => void;
};

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  add: (newClient: Client) =>
    set((state) => ({ clients: [...state.clients, newClient] })),
  update: (clientToUpdate: Client) =>
    set((state) => {
      // Need to add ID field to check for change
      const index = state.clients.findIndex((item) => item === clientToUpdate);
      const updatedClients = [...state.clients];

      updatedClients[index] = clientToUpdate;

      console.log(updatedClients, clientToUpdate);

      return {
        clients: updatedClients,
      };
    }),
  delete: (clientToDelete: Client) =>
    set((state) => {
      const index = state.clients.findIndex((item) => item === clientToDelete);

      return {
        clients: [
          ...state.clients.slice(0, index),
          ...state.clients.splice(index + 1),
        ],
      };
    }),
}));
