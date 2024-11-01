import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import styles from "./LandingSearchBar.module.css";
interface LandingSearchBarProps {
  onRequestChange: (value: string) => void;
  onSearch?: (value: string) => void;
}

const LandingSearchBar: React.FC<LandingSearchBarProps> = ({
  onRequestChange,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onRequestChange(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onRequestChange("");
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    } else {
      console.log("Search for:", searchValue);
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder='PRUEBA CON "CARPINTERO", "MECANICO"'
        value={searchValue}
        onChange={handleInputChange}
        maxLength={47}
      />
      {searchValue && (
        <button
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}
      <button
        className={styles.searchButton}
        onClick={handleSearch}
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </div>
  );
};
export default LandingSearchBar;
