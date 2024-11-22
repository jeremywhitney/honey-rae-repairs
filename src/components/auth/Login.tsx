import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService";
import { StoredUser } from "../../types/users";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getUserByEmail(email).then((response) => {
      if (response) {
        const userToStore: StoredUser = {
          id: response.id,
          isStaff: response.isStaff,
        };
        localStorage.setItem("honey_user", JSON.stringify(userToStore));
        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>Honey Rae Repairs</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
