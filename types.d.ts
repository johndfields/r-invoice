interface Client {
  name: string;
  street1: string;
  street2?: string; // for apt / suite / po / etc
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
