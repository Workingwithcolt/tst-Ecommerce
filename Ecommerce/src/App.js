import { useContext, useState } from "react";
import { Auth, AuthContext } from "./Auth";
import Dashboard from "./Components/userProfile/Dashboard";
import { LoginPage } from "./Components/userProfile/LoginPage";
import { LoginWithEmail } from "./Components/userProfile/LoginWithEmail";
import { auth } from "./FirebaseHelpers/firebase-config";
import { SignUpWithEmail } from "./Components/userProfile/SignUpWithEmail";
import { useNavigate } from "react-router-dom";
import Button from "./Components/GenericComponents/Button";

function App() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true)

  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
