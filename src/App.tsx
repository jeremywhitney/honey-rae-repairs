import { Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./views/ApplicationViews";
import { Authorized } from "./views/Authorized";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          // Check if the user is authorized first
          <Authorized>
            {/* ApplicationViews is the CHILD component of Authorized */}
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  );
};
