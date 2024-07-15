import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import { CustomerList } from "./components/customers/CustomersList";
import { EmployeeList } from "./components/employees/EmployeesList";
import { TicketList } from "./components/tickets/TicketList";
import { NavBar } from "./components/nav/NavBar";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="tickets" element={<TicketList />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="employees" element={<EmployeeList />} />
      </Route>
    </Routes>
  );
};
