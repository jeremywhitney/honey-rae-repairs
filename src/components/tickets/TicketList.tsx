import { useEffect, useState } from "react";
import { getAllTickets } from "../../services/ticketService";
import { Ticket } from "./Ticket";
import { TicketFilterBar } from "./TicketFilterBar";
import { StoredUser } from "../../types/users";
import { ServiceTicketWithEmployees } from "../../types/tickets";
import "./Tickets.css";

interface TicketListProps {
  currentUser: StoredUser;
}

export const TicketList = ({ currentUser }: TicketListProps) => {
  const [allTickets, setAllTickets] = useState<ServiceTicketWithEmployees[]>([]);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState<boolean>(false);
  const [showOpenOnly, setShowOpenOnly] = useState<boolean>(false);
  const [filteredTickets, setFilteredTickets] = useState<ServiceTicketWithEmployees[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getAndSetTickets = async () => {
    const ticketsArray = await getAllTickets();
    if (currentUser.isStaff) {
      setAllTickets(ticketsArray);
    } else {
      const customerTickets = ticketsArray.filter(
        (ticket) => ticket.userId === currentUser.id
      );
      setAllTickets(customerTickets);
    }
  };

  // useEffect takes a function (callback function; what we want to happen), and an array (dependency array; when we want it to happen)
  useEffect(() => {
    getAndSetTickets();
  }, [currentUser]);

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(
        (ticket) => ticket.emergency === true
      );
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showEmergencyOnly, allTickets]); // When the dependency contains multiple state variables, the useEffect is watching for any time any of the values change.

  useEffect(() => {
    const foundTickets = allTickets.filter((ticket) =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(foundTickets);
  }, [searchTerm, allTickets]);

  useEffect(() => {
    if (showOpenOnly) {
      const openTickets = allTickets.filter(
        (ticket) => ticket.dateCompleted === ""
      );
      setFilteredTickets(openTickets);
    } else {
      setFilteredTickets(allTickets);
    }
  }, [showOpenOnly, allTickets]);

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <TicketFilterBar
        setShowEmergencyOnly={setShowEmergencyOnly}
        setShowOpenOnly={setShowOpenOnly}
        setSearchTerm={setSearchTerm}
        currentUser={currentUser}
      />
      <article className="tickets">
        {filteredTickets.map((ticketObj) => {
          return (
            <Ticket
              ticket={ticketObj}
              currentUser={currentUser}
              getAndSetTickets={getAndSetTickets}
              key={ticketObj.id}
            />
          );
        })}
      </article>
    </div>
  );
};
