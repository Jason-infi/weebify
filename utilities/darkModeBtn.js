import React from "react";
import { themeContext, themes } from "./themeContext";
import { useContext, useState } from "react";

const DarkModeBtn = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { changeTheme } = useContext(themeContext);
  return (
    <>
      {!darkMode ? (
        <button
          aria-label='toggle light mode'
          className='hover:scale-110 opacity-90 hover:opacity-100 select-none'
          onClick={() => {
            setDarkMode((prev) => !prev);
            changeTheme(darkMode ? themes.dark : themes.light);
          }}
        >
          light
        </button>
      ) : (
        <button
          aria-label='toggle dark mode'
          className='hover:scale-110 opacity-90 hover:opacity-100 select-none'
          onClick={() => {
            setDarkMode((prev) => !prev);
            changeTheme(darkMode ? themes.dark : themes.light);
          }}
        >
          yark
        </button>
      )}
    </>
  );
};

export default DarkModeBtn;
