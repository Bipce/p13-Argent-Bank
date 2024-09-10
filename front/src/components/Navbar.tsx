import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/argentBankLogo.png";
import { useAppSelector } from "../app/store.ts";
import { selectUser } from "../features/user/userSlice.ts";

const Navbar = () => {
  const { firstName } = useAppSelector(selectUser);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        <Link className="main-nav-item" to={"/user"}>
          <FontAwesomeIcon icon={faUserCircle} />
          {firstName}
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