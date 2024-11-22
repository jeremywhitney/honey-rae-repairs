import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerByUserId } from "../../services/customerService";
import { CustomerWithUserObject } from "../../types/customers";
import "./Customers.css";

export const CustomerDetails = () => {
  const [customer, setCustomer] = useState<CustomerWithUserObject | null>(null);
  const { customerId } = useParams<{ customerId: string }>();

  useEffect(() => {
    if (customerId) {
      getCustomerByUserId(parseInt(customerId, 10)).then((data) => {
        setCustomer(data);
      });
    }
  }, [customerId]);

  if (!customer) return <div>Loading...</div>;

  return (
    <section className="customer">
      <header className="customer-header">{customer.user.fullName}</header>
      <div>
        <span className="customer-info">Email : </span>
        {customer.user.email}
      </div>
      <div>
        <span className="customer-info">Address : </span>
        {customer.address}
      </div>
      <div>
        <span className="customer-info">Phone Number : </span>
        {customer.phoneNumber}
      </div>
    </section>
  );
};
