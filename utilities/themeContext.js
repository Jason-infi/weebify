import { createContext } from "react";

export const themes = {
  dark: "dark",
  light: "",
};

export const themeContext = createContext({
  theme: themes.light,
  changeTheme: () => {},
});
