import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { StoredUser } from "../../types/users";

interface TicketFilterBarProps {
  setShowEmergencyOnly: (value: boolean) => void;
  setShowOpenOnly: (value: boolean) => void;
  setSearchTerm: (value: string) => void;
  currentUser: StoredUser;
}

export const TicketFilterBar = ({
  setShowEmergencyOnly,
  setShowOpenOnly,
  setSearchTerm,
  currentUser,
}: TicketFilterBarProps) => {
  const navigate = useNavigate();

  return (
    <div className="filter-bar">
      {currentUser.isStaff ? (
        <>
          <button
            className="filter-btn btn-primary"
            onClick={() => {
              setShowEmergencyOnly(true);
            }}
          >
            Emergency
          </button>
          <button
            className="filter-btn btn-info"
            onClick={() => {
              setShowEmergencyOnly(false);
            }}
          >
            Show All
          </button>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(event.target.value);
            }}
            type="text"
            placeholder="Search Tickets"
            className="ticket-search"
          />
        </>
      ) : (
        <>
          <button
            className="filter-btn btn-primary"
            onClick={() => {
              navigate("/tickets/create");
            }}
          >
            Create Ticket
          </button>
          <button
            className="filter-btn btn-info"
            onClick={() => {
              setShowOpenOnly(true);
            }}
          >
            Open Tickets
          </button>
          <button
            className="filter-btn btn-secondary"
            onClick={() => {
              setShowOpenOnly(false);
            }}
          >
            All My Tickets
          </button>
        </>
      )}
    </div>
  );
};
