import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/argentBankLogo.png";
import { AppDispatch } from "../app/store.ts";
import { getProfile } from "../services/apiCalls.ts";
import { setUser } from "../features/user/userSlice.ts";

const Navbar = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile();
        const { firstName } = data.body;

        dispatch(setUser({ firstName }));
        setUserFirstName(firstName);

      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        <Link className="main-nav-item" to={"/user"}>
          <FontAwesomeIcon icon={faUserCircle} />
          {userFirstName}
        </Link>

        <Link className="main-nav-item" to={"/sign-in"}>
          <FontAwesomeIcon icon={faUserCircle} />
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;