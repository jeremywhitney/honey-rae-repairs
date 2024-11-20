export interface ServiceTicket {
  id: number;
  userId: number;
  description: string;
  emergency: boolean;
  dateCompleted: string | null;
}

export interface EmployeeTicket {
  id: number;
  employeeId: number;
  serviceTicketId: number;
}

// This represents the response when tickets include embedded employee tickets
export interface ServiceTicketWithEmployees extends ServiceTicket {
  employeeTickets: EmployeeTicket[];
}
