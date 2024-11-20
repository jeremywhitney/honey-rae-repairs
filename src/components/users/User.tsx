import { User as UserType } from "../../types/users"
import "./User.css";

interface UserProps {
  user: UserType
}

export const User = ({ user }: UserProps) => {
  return (
    <div className="user">
      <div>
        <div className="user-info">Name</div>
        <div>{user.fullName}</div>
      </div>
      <div>
        <div className="user-info">Email</div>
        <div>{user.email}</div>
      </div>
    </div>
  );
};