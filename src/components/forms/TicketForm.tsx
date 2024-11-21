import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../../services/ticketService";
import { StoredUser } from "../../types/users";
import { ServiceTicket } from "../../types/tickets";
import "./Form.css";

interface TicketFormProps {
  currentUser: StoredUser;
}

export const TicketForm = ({ currentUser }: TicketFormProps) => {
  const [ticket, setTicket] = useState<
    Omit<ServiceTicket, "id" | "userId" | "dateCompleted">
  >({
    description: "",
    emergency: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { type, checked, value, name } = event.target;
    const ticketCopy = { ...ticket };

    if (type === "checkbox") {
      ticketCopy.emergency = checked;
    } else {
      ticketCopy.description = value;
    }

    setTicket(ticketCopy);
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (ticket.description) {
      const newTicket: Omit<ServiceTicket, "id"> = {
        userId: currentUser.id,
        description: ticket.description,
        emergency: ticket.emergency,
        dateCompleted: "",
      };
      createTicket(newTicket).then(() => {
        navigate("/tickets");
      });
    } else {
      window.alert("Please fill out the description!");
    }
  };

  return (
    <form onSubmit={handleSave}>
      <h2>New Service Ticket</h2>
      <fieldset>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Brief description of problem"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Emergency:
            <input type="checkbox" onChange={handleInputChange} />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-info" type="submit">
            Submit Ticket
          </button>
        </div>
      </fieldset>
    </form>
  );
};
