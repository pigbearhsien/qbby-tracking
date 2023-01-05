import { useState, useEffect } from "react";

const ThemePicker = () => {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    fetch("https://bootswatch.com/api/5.json")
      .then((response) => response.json())
      .then((result) => setThemes(result.themes));
  }, []);
  const setTheme = (e) => {
    const themeName = themes[e.target.selectedIndex].name;

    document.getElementById("theme").href = themes[e.target.selectedIndex].css;
  };
  return (
    <select onChange={(e) => setTheme(e)}>
      {themes.map((theme, index) => (
        <option id={theme.name} key={theme.name}>
          {index}. {theme.name}
        </option>
      ))}
    </select>
  );
};

export default ThemePicker;
