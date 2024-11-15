// src/components/TopBar.tsx

import React, { useState, useRef, useEffect } from "react";
import styles from "./TopBar.module.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing menu icons
import { useHistory } from "react-router";
import logo from "../../../assets/contratoGT_logo.svg";

interface TopBarProps {
  goWantToWork(): void;
  goWantToHire(): void;
  currentSection: string;
}

const TopBar: React.FC<TopBarProps> = ({
  goWantToWork,
  goWantToHire,
  currentSection,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const firstNavButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const [route, setRoute] = useState("/home");

  useEffect(() => {
    const userData = localStorage.getItem("User");

    // Cambiar a '/searched' solo si `userData` no es nulo y no está vacío
    if (userData !== "" && userData !== null) {
      setRoute("/searched");
    }
  }, []);

  const history = useHistory();

  // Toggle the menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when a navigation item is clicked
  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  // Handle accessibility: Shift focus when menu opens/closes
  useEffect(() => {
    if (isMenuOpen) {
      // Shift focus to the first navigation button
      firstNavButtonRef.current?.focus();

      // Add event listener for Escape key to close the menu
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMenuOpen(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      // Return focus to the menu icon
      menuButtonRef.current?.focus();
    }
  }, [isMenuOpen]);

  return (
    <div className={styles.topBar}>
      <div className={styles.stylesWrapper}>
        {/* Title Container */}
        <div
          className={styles.landBarTittleContainer}
          style={{ display: "flex" }}
        >
          <img src={logo} style={{ width: "110px" }} />
          <h1>CONTRATO-GT</h1>
        </div>

        {/* Navigation Actions */}
        <div
          className={`${styles.lanBarActionsContainer} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          {currentSection == "hire" ? <p></p> : <p></p>}

          <p
            className={styles.hireButton}
            onClick={goWantToHire}
            style={
              currentSection == "hire"
                ? { textDecoration: "underline" }
                : { textDecoration: "none" }
            }
          >
            QUIERO CONTRATAR
          </p>

          <p
            className={styles.workButton}
            onClick={goWantToWork}
            style={
              currentSection == "hire"
                ? { textDecoration: "underline" }
                : { textDecoration: "none" }
            }
          >
            QUIERO TRABAJAR
          </p>
        </div>

        {/* Join Container */}
        <div
          className={`${styles.landBarJoinContainer} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          <button
            className={styles.landLogInButton}
            onClick={() => {
              history.push(route);
            }}
            aria-label="Iniciar Sesión"
          >
            INICIAR SESION
          </button>
          <button
            className={styles.landSignInButton}
            onClick={() => history.push("/register")}
            aria-label="Registrar"
          >
            REGISTRAR
          </button>
        </div>

        {/* Menu Icon for Mobile */}
        <div
          className={styles.menuIcon}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleMenu();
          }}
          ref={menuButtonRef}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default TopBar;
