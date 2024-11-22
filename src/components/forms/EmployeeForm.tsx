import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployeeByUserId, updateEmployee } from "../../services/employeeService";
import { StoredUser } from "../../types/users";
import { Employee, EmployeeWithUserObject } from "../../types/employees";
import "./Form.css";

interface EmployeeFormProps {
  currentUser: StoredUser;
}

export const EmployeeForm = ({ currentUser }: EmployeeFormProps) => {
  const [employee, setEmployee] = useState<EmployeeWithUserObject | null>(null);
  const navigate = useNavigate(); // returns a function

  useEffect(() => {
    getEmployeeByUserId(currentUser.id).then((data) => {
      setEmployee(data);
    });
  }, [currentUser]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!employee) return;

    const stateCopy = { ...employee };
    // Handle different input types
    if (event.target.name === "rate") {
      stateCopy.rate = event.target.value;
    } else if (event.target.name === "specialty") {
      stateCopy.specialty = event.target.value;
    }
    setEmployee(stateCopy);
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!employee) return;

    const editedEmployee: Employee = {
      id: employee.id,
      specialty: employee.specialty,
      rate: employee.rate,
      userId: employee.userId,
    };

    updateEmployee(editedEmployee).then(() => {
      navigate(`/employees/${currentUser.id}`); // pass the path you want to navigate to
    });
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <form className="profile" onSubmit={handleSave}>
      <h2>Update Profile</h2>
      <fieldset>
        <div className="form-group">
          <label>Specialty:</label>
          <input
            type="text"
            name="specialty"
            value={employee.specialty}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Hourly Rate:</label>
          <input
            type="number"
            name="number"
            value={employee.rate}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-primary" type="submit">
            Save Profile
          </button>
        </div>
      </fieldset>
    </form>
  );
};
