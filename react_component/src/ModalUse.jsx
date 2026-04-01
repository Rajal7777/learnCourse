import { useContext } from "react";
import ThemeContext from "./store/Theme";

export default function ModalUse() {
  //theme context
  const { theme, handleChangeColor } = useContext(ThemeContext);
  console.log(theme);

  return (
    <div
      style={{
        backgroundColor: theme,
        width: "350px",
        color: "whitesmoke",
      }}
    >
      <h1
        style={{
          color: theme === "gray" ? "red" : "blue" ,
        }}
      >change color</h1>
      <p
        style={{
          color: theme === "gray" ? "whitesmoke" : "black",
        }}
      >
        {" "}
        This is a para
      </p>
      <button
        onClick={handleChangeColor}
        className={theme === "gray" ? "textColor" : "col"}
      >
        current color is {theme}
      </button>
    </div>
  );
}
