import { User } from "../types/users";

export const getNonStaffUsers = async (): Promise<User[]> => {
  const response = await fetch(`http://localhost:8088/users?isStaff=false`);
  return response.json();
};

export const getStaffUsers = async (): Promise<User[]> => {
  const response = await fetch(`http://localhost:8088/users?isStaff=true`);
  return response.json();
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const response = await fetch(`http://localhost:8088/users?email=${email}`);
  const user = await response.json();
  return user[0] || null;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};
