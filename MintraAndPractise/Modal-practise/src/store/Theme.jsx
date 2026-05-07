import { createContext, useState } from "react";

const ThemeContext = createContext({
  theme: "",
  handleChangeColor: () => {},
});

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("gray");

  function handleChangeColor() {
    setTheme((prev) => (prev === "gray" ? "white" : "gray" ));
   
  }

  return (
    <ThemeContext.Provider value={{ theme, handleChangeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
