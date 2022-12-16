import { useState, useEffect } from "react";
import React from "react";
import { themeContext, themes } from "./themeContext";

const themeContextWrapper = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);
  const changeTheme = (theme) => {
    setTheme(theme);
  };
  useEffect(() => {
    switch (theme) {
      case themes.dark:
        document.body.classList.add("dark");
        break;
      case themes.light:
      default:
        document.body.classList.remove("dark");
        break;
    }
  }, [theme]);
  return (
    <themeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default themeContextWrapper;
