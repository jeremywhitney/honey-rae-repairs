import {
  Employee,
  EmployeeWithUserAndTickets,
  EmployeeWithUserObject,
} from "../types/employees";

export const getAllEmployees = async (): Promise<EmployeeWithUserObject[]> => {
  const response = await fetch(`http://localhost:8088/employees?_expand=user`);
  return response.json();
};

export const getEmployeeByUserId = async (
  userId: number
): Promise<EmployeeWithUserAndTickets | null> => {
  const response = await fetch(
    `http://localhost:8088/employees?userId=${userId}&_expand=user&_embed=employeeTickets`
  );
  const employees = await response.json();
  return employees[0] || null;
};

export const updateEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await fetch(
    `http://localhost:8088/employees/${employee.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  );
  return response.json();
};
