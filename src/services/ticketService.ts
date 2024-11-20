import {
  EmployeeTicket,
  ServiceTicket,
  ServiceTicketWithEmployees,
} from "../types/tickets";

export const getAllTickets = async (): Promise<
  ServiceTicketWithEmployees[]
> => {
  const response = await fetch(
    `http://localhost:8088/serviceTickets?_embed=employeeTickets`
  );
  return response.json();
};

export const assignTicket = async (
  employeeTicket: EmployeeTicket
): Promise<EmployeeTicket> => {
  const response = await fetch(`http://localhost:8088/employeeTickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeTicket),
  });
  return response.json();
};

export const updateTicket = async (
  ticket: ServiceTicket
): Promise<ServiceTicket> => {
  const response = await fetch(
    `http://localhost:8088/serviceTickets/${ticket.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    }
  );
  return response.json();
};

export const deleteTicket = async (ticketId: number): Promise<Response> => {
  const response = await fetch(
    `http://localhost:8088/serviceTickets/${ticketId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to delete ticket ${ticketId}: ${response.status}`);
  }
  return response;
};

export const createTicket = async (
  ticket: Omit<ServiceTicket, "id">
): Promise<ServiceTicket> => {
  const response = await fetch(`http://localhost:8088/serviceTickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });
  return response.json();
};
