import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import bars from "../../assets/bars-solid.svg";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Globe from "../../assets/Globe.svg";
import Avatar from "../Avatar/Avatar";
import "./navbar.css";
import { setcurrentuser } from "../../action/currentuser";
import { jwtDecode } from "jwt-decode";

function Navbar({ handleSlideIn }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingLanguage, setPendingLanguage] = useState(null);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // New state for mobile menu
  const User = useSelector((state) => state.currentuserreducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("Profile");
    localStorage.removeItem("userEmail");
    navigate("/");
    dispatch(setcurrentuser(null));
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          alert(
            `${t("navbar.location")}\n${t("navbar.latitude")}: ${latitude}\n${t(
              "navbar.longitude"
            )}: ${longitude}`
          );
        },
        () => {
          alert(t("navbar.location_error"));
        }
      );
    } else {
      alert(t("navbar.geolocation_unsupported"));
    }
  };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("Profile"));
    if (profile?.token) {
      try {
        const decodedToken = jwtDecode(profile.token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          handleLogout();
        } else {
          dispatch(setcurrentuser(profile));
        }
      } catch (error) {
        console.error("Invalid token:", error);
        handleLogout();
      }
    } else {
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        dispatch(
          setcurrentuser({
            result: { email: storedEmail, name: storedEmail.split("@")[0] },
          })
        );
      }
    }
  }, [dispatch, navigate]);

  const sendOtpForLanguageChange = async (language) => {
    if (!User?.result?.email) {
      setError(t("navbar.no_email"));
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: User.result.email, language }),
      });
      const data = await response.json();
      if (response.ok) {
        setPendingLanguage(language);
        setOtpModalOpen(true);
        setError("");
      } else {
        setError(data.message || t("navbar.otp_send_failed"));
      }
    } catch (err) {
      setError(t("navbar.otp_send_failed"));
      console.error("Error sending OTP:", err);
    }
  };

  const verifyOtpAndChangeLanguage = async () => {
    if (!otp || otp.length !== 6) {
      setError(t("navbar.invalid_otp_format"));
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: User.result.email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        i18n.changeLanguage(pendingLanguage);
        setOtpModalOpen(false);
        setOtp("");
        setPendingLanguage(null);
        setLanguageDropdownOpen(false);
        setError("");
      } else {
        setError(data.message || t("navbar.otp_verify_failed"));
      }
    } catch (err) {
      setError(t("navbar.otp_verify_failed"));
      console.error("Error verifying OTP:", err);
    }
  };

  const changeLanguage = (lng) => {
    if (User?.result) {
      sendOtpForLanguageChange(lng);
    } else {
      i18n.changeLanguage(lng);
      setLanguageDropdownOpen(false);
    }
  };

  const getCurrentLanguageName = () => {
    switch (i18n.language) {
      case "en":
        return t("navbar.lang_en");
      case "es":
        return t("navbar.lang_es");
      case "hi":
        return t("navbar.lang_hi");
      case "pt":
        return t("navbar.lang_pt");
      case "zh":
        return t("navbar.lang_zh");
      case "fr":
        return t("navbar.lang_fr");
      default:
        return t("navbar.lang_en");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button className="slide-in-icon" onClick={handleSlideIn}>
          <img src={bars} alt="bars" width="15" />
        </button>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <img src={bars} alt="menu" width="20" />
        </button>

        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <div className={`nav-links ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
            <Link to="/" className="nav-item nav-btn" onClick={toggleMobileMenu}>
              {t("navbar.about")}
            </Link>
            <Link to="/" className="nav-item nav-btn" onClick={toggleMobileMenu}>
              {t("navbar.products")}
            </Link>
            <Link to="/" className="nav-item nav-btn" onClick={toggleMobileMenu}>
              {t("navbar.for_teams")}
            </Link>
            <form>
              <input
                type="text"
                placeholder={t("navbar.search_placeholder")}
                className="search-input"
              />
              <img src={search} alt="search" width="18" className="search-icon" />
            </form>
          </div>
        </div>

        <div className="navbar-2">
          <div className="language-selector">
            <div className="language-display">
              <img
                src={Globe}
                alt="language"
                width="18"
                style={{ cursor: "pointer", marginRight: "5px" }}
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              />
              <span>{getCurrentLanguageName()}</span>
            </div>
            {languageDropdownOpen && (
              <div className="dropdown-content language-dropdown">
                <button onClick={() => changeLanguage("en")}>{t("navbar.lang_en")}</button>
                <button onClick={() => changeLanguage("es")}>{t("navbar.lang_es")}</button>
                <button onClick={() => changeLanguage("hi")}>{t("navbar.lang_hi")}</button>
                <button onClick={() => changeLanguage("pt")}>{t("navbar.lang_pt")}</button>
                <button onClick={() => changeLanguage("zh")}>{t("navbar.lang_zh")}</button>
                <button onClick={() => changeLanguage("fr")}>{t("navbar.lang_fr")}</button>
              </div>
            )}
          </div>

          {User?.result ? (
            <div className="dropdown">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  backgroundColor="#009dff"
                  px="10px"
                  py="7px"
                  borderRadius="50%"
                  color="white"
                >
                  {User.result.name?.charAt(0)?.toUpperCase() || "?"}
                </Avatar>
              </div>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <Link
                    to={`/Users/${User.result._id || User.result.email}`}
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLocation();
                    }}
                  >
                    {t("navbar.obtain_location")}
                  </Link>
                  <button onClick={handleLogout}>{t("navbar.logout")}</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/Auth" className="nav-item nav-links" onClick={toggleMobileMenu}>
              {t("navbar.login")}
            </Link>
          )}
        </div>
      </div>

      {otpModalOpen && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <h3>{t("navbar.verify_otp")}</h3>
            <p>{t("navbar.otp_sent", { email: User.result.email })}</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder={t("navbar.enter_otp")}
              maxLength="6"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={verifyOtpAndChangeLanguage}>{t("navbar.submit_otp")}</button>
            <button
              onClick={() => {
                setOtpModalOpen(false);
                setOtp("");
                setError("");
              }}
            >
              {t("navbar.cancel")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;