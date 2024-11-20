import { User } from "./users";

export interface Customer {
  id: number;
  address: string;
  phoneNumber: string;
  userId: number;
}

export interface CustomerWithUserObject extends Customer {
  user: User;
}
