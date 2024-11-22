import { CustomerWithUserObject } from "../types/customers";

export const getCustomerByUserId = async (
  userId: number
): Promise<CustomerWithUserObject | null> => {
  const response = await fetch(
    `http://localhost:8088/customers?userId=${userId}&_expand=user`
  );
  const customers = await response.json();
  return customers[0] || null;
};
