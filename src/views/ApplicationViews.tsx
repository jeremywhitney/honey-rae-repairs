import { useEffect, useState } from "react";
import { EmployeeViews } from "./EmployeeViews";
import { CustomerViews } from "./CustomerViews";
import { StoredUser } from "../types/users";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user");
    if (localHoneyUser) {
      const honeyUserObject = JSON.parse(localHoneyUser);
      setCurrentUser(honeyUserObject);
    }
  }, []);

  if (!currentUser) return null

  return currentUser.isStaff ? (
    <EmployeeViews currentUser={currentUser} />
  ) : (
    <CustomerViews currentUser={currentUser} />
  );
};
