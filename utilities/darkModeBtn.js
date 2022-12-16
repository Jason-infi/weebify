import React from "react";
import { themeContext, themes } from "./themeContext";
import { useContext, useState } from "react";

const darkModeBtn = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { changeTheme } = useContext(themeContext);
  return (
    <>
      {!darkMode ? (
        <button
          aria-label='toggle light mode'
          className='hover:scale-110 opacity-90 hover:opacity-100 select-none'
        >
          <p
            className='h-6 w-6'
            onClick={() => {
              setDarkMode((prev) => !prev);
              changeTheme(darkMode ? themes.dark : themes.light);
            }}
          >
            x
          </p>
        </button>
      ) : (
        <button
          aria-label='toggle dark mode'
          className='hover:scale-110 opacity-90 hover:opacity-100 select-none'
        >
          <p
            className='h-6 w-6'
            onClick={() => {
              setDarkMode((prev) => !prev);
              changeTheme(darkMode ? themes.dark : themes.light);
            }}
          >
            y
          </p>
        </button>
      )}
    </>
  );
};

export default darkModeBtn;
