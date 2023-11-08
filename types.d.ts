interface Address {
  name: string;
  street1: string;
  street2?: string; // for apt / suite / po / etc
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Client extends Address {
  id: string;
}

interface Product {
  id: string;
  name: string;
  rate?: number;
  description?: string;
  quantity?: number;
}

interface Invoice {
  id: string;
  name: string;
  client: Client;
  userAddress: Address;
  status: string;
  description?: string;
  products: Product[]
}
