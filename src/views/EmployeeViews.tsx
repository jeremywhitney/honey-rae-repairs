import { Outlet, Route, Routes } from "react-router-dom";
import { EmployeeNav } from "../components/nav/EmployeeNav";
import { Welcome } from "../components/welcome/Welcome";
import { TicketList } from "../components/tickets/TicketList";
import { EmployeeList } from "../components/employees/EmployeesList";
import { EmployeeDetails } from "../components/employees/EmployeeDetails";
import { CustomerList } from "../components/customers/CustomersList";
import { CustomerDetails } from "../components/customers/CustomerDetails";
import { EmployeeForm } from "../components/forms/EmployeeForm";
import { StoredUser } from "../types/users";

interface EmployeeViewsProps {
  currentUser: StoredUser;
}

export const EmployeeViews = ({ currentUser }: EmployeeViewsProps) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <EmployeeNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route
          path="tickets"
          element={<TicketList currentUser={currentUser} />}
        />
        <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path=":employeeId" element={<EmployeeDetails />} />
        </Route>
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>
        <Route
          path="profile"
          element={<EmployeeForm currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
