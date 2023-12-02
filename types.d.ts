interface Address {
  name: string;
  street1: string;
  street2?: string; // for apt / suite / po / etc
  city: string;
  state: string;
  zipcode: string;
  country: string;
}

interface Client extends Address {
  id: string;
  createdByUserId: string;
  type: string;
}

interface Product {
  id: string;
  name: string;
  rate: number;
  description: string;
}

interface Invoice {
  id: string;
  name: string;
  client: Client;
  userAddress: Address;
  status: string;
  description?: string;
  products: Product[];
}
