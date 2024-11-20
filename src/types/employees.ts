import { EmployeeTicket } from "./tickets";
import { User } from "./users";

export interface Employee {
  id: number;
  specialty: string;
  rate: string;
  userId: number;
}

export interface EmployeeWithUserObject extends Employee {
  user: User;
}

export interface EmployeeWithUserAndTickets
  extends EmployeeWithUserObject {
  employeeTickets: EmployeeTicket[];
}
