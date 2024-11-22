import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNonStaffUsers } from "../../services/userService";
import { User } from "../users/User";
import { User as UserType } from "../../types/users"
import "./Customers.css";

export const CustomerList = () => {
  const [customers, setCustomers] = useState<UserType[]>([]);

  useEffect(() => {
    getNonStaffUsers().then((customerArray) => {
      setCustomers(customerArray);
    });
  }, []);

  return (
    <div className="customers">
      {customers.map((customerObj) => {
        return (
          <Link to={`/customers/${customerObj.id}`} key={customerObj.id}>
            <User user={customerObj} />
          </Link>
        );
      })}
    </div>
  );
};
