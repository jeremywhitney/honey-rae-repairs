export interface User {
  id: number;
  fullName: string;
  email: string;
  isStaff: boolean;
}

export interface StoredUser {
  id: number;
  isStaff: boolean;
}
