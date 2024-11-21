import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";
import { StoredUser, User } from "../../types/users";
import "./Login.css";

export const Register = () => {
  const [customer, setCustomer] = useState<Omit<User, "id">>({
    email: "",
    fullName: "",
    isStaff: false,
  });
  let navigate = useNavigate();

  const registerNewUser = async () => {
    const createdUser = await createUser(customer);
    if ("id" in createdUser) {
      const userToStore: StoredUser = {
        id: createdUser.id,
        isStaff: createdUser.isStaff,
      };
      localStorage.setItem("honey_user", JSON.stringify(userToStore));
      navigate("/");
    }
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getUserByEmail(customer.email).then((response) => {
      if (response) {
        window.alert("Account with that email address already exists");
      } else {
        registerNewUser();
      }
    });
  };

  const updateCustomer = (evt: ChangeEvent<HTMLInputElement>) => {
    const copy = { ...customer };
    if (evt.target.type === "checkbox") {
      copy.isStaff = evt.target.checked;
    } else {
      // Handle text/email inputs
      if (evt.target.id === "email" || evt.target.id === "fullName") {
        copy[evt.target.id] = evt.target.value;
      }
    }
    setCustomer(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Honey Rae Repairs</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="fullName"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>
              <input onChange={updateCustomer} type="checkbox" id="isStaff" />
              I am an employee{" "}
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
