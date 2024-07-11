import { getNonStaffUsers } from "../../services/userService";
import { useEffect, useState } from "react";
import "./Customers.css"
import { User } from "../../users/User";

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getNonStaffUsers().then((customerArray) => {
      setCustomers(customerArray);
    });
  }, []);

  return (
    <div className="customers">
      {customers.map((customerObj) => {
        return <User user={customerObj} />
      })}
    </div>
  );
};