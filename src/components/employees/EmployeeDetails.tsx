import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeByUserId } from "../../services/employeeService";
import { EmployeeWithUserAndTickets } from "../../types/employees";

export const EmployeeDetails = () => {
  const [employee, setEmployee] = useState<EmployeeWithUserAndTickets | null>(null);
  const { employeeId } = useParams<{ employeeId: string }>();

  useEffect(() => {
    if (employeeId) {
      getEmployeeByUserId(parseInt(employeeId, 10)).then((data) => {
        setEmployee(data);
      });
    }
  }, [employeeId]);

  if (!employee) return <div>Loading...</div>;

  return (
    <section className="employee">
      <header className="employee-header">{employee.user.fullName}</header>
      <div>
        <span className="employee-info">Email : </span>
        {employee.user.email}
      </div>
      <div>
        <span className="employee-info">Specialty : </span>
        {employee.specialty}
      </div>
      <div>
        <span className="employee-info">Rate : </span>
        {employee.rate}
      </div>
      <footer className="employee-footer">
        Currently working on {employee.employeeTickets.length} tickets
      </footer>
    </section>
  );
};
