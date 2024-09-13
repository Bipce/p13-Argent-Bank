import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../app/store.ts";
import { logout, selectUser, setUser, setAccessToken } from "../features/userSlice.ts";
import { useGetUserProfileMutation } from "../features/apiSlice.ts";
import logo from "../assets/img/argentBankLogo.png";

const Navbar = () => {
  const { firstName, isConnected, accessToken } = useAppSelector(selectUser);
  const [getUserProfile] = useGetUserProfileMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setAccessToken(token));
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (accessToken) {
        const data = await getUserProfile().unwrap();
        const { firstName, lastName } = data.body;
        dispatch(setUser({ firstName, lastName }));
      }
    })(
    );
  }, [accessToken, dispatch, getUserProfile]);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {(isConnected) &&
          <Link className="main-nav-item" to={"/user"}>
            <FontAwesomeIcon icon={faUserCircle} className="icon" />
            {firstName}
          </Link>
        }

        {isConnected
          ? <>
            <button className="main-nav-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOut} className="icon" />Sign Out
            </button>
          </>
          : <>
            <Link className="main-nav-item" to={"/sign-in"}>
              <FontAwesomeIcon icon={faSignIn} className="icon" />Sign In
            </Link>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;