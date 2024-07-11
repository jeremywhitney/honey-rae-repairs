/* eslint-disable no-unused-vars */
import "./App.css";
import { CustomerList } from "./components/customers/CustomersList";
import { TicketList } from "./components/tickets/TicketList";

export const App = () => {
  return (
    <>
      {/* <TicketList /> */}
      <CustomerList />
    </>
  );
};
