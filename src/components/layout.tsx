import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faLaptopCode,
  faSignInAlt,
  faUserPlus,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC, MouseEvent, ReactNode, useEffect } from "react";
import { useLayout } from "@/hooks/useLayout";

config.autoAddCss = false; /* eslint-disable import/first */
type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const {
    browseBootcampClickHandler,
    accountClickHandler,
    logoutHandler,
    onClickHamburgerHandler,
    hamburgerOpened,
    accountNavOpened,
    setAccountNavOpened,
    session,
    error,
    handleClickOutsideAccountNav,
  } = useLayout();

  useEffect(() => {
    function handleOutsideClick(event: any) {
      const accountNav = document.querySelector(".dropdown-menu");
      const accountNavToggle = document.querySelector(".account-nav-toggle");
      handleClickOutsideAccountNav(
        event as MouseEvent<Document>,
        accountNav as HTMLElement | null,
        accountNavToggle as HTMLElement | null,
        setAccountNavOpened
      );
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setAccountNavOpened]);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <FontAwesomeIcon icon={faLaptopCode} size="lg" /> DevCamper
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            onClick={onClickHamburgerHandler}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            // className="collapse navbar-collapse show"
            className={`collapse navbar-collapse ${
              hamburgerOpened ? "show" : ""
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              {!session ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" href="/account/login">
                      <i className="fas fa-sign-in-alt"></i>
                      <FontAwesomeIcon icon={faSignInAlt} size="lg" /> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/account/register">
                      <FontAwesomeIcon icon={faUserPlus} size="lg" /> Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown" onClick={accountClickHandler}>
                  <button className="nav-link dropdown-toggle account-nav-toggle">
                    <FontAwesomeIcon icon={faUser} size="lg" /> Account
                  </button>
                  <div
                    className={`dropdown-menu ${
                      accountNavOpened ? "show" : ""
                    }`}
                  >
                    {session.user?.role === "publisher" && (
                      <Link className="dropdown-item" href="/manage/bootcamp">
                        Manage Bootcamp
                      </Link>
                    )}
                    {session.user?.role === "user" && (
                      <Link className="dropdown-item" href="/manage/reviews">
                        Manage Reviews
                      </Link>
                    )}
                    <Link className="dropdown-item" href="/account/manage">
                      Manage Account
                    </Link>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      href="login.html"
                      onClick={logoutHandler}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} size="lg" /> Logout
                    </a>
                  </div>
                </li>
              )}

              <li className="nav-item d-none d-sm-block">
                <a className="nav-link" href="#">
                  |
                </a>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/bootcamps"
                  onClick={browseBootcampClickHandler}
                >
                  Browse Bootcamps
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
