import { useState } from "react";
import Preview from "./preview";
import Backup from "./backup";
import Search from "./search";

const App = () => {
  const [navItem, setNavItem] = useState("Search");
  const [navbarList, setNavbarList] = useState(["Search", "View", "Backup"]);

  const handleNav = (e) => {
    setNavItem(e.target.textContent);
  };
  return (
    <div>
      <div className="nav">
        {navbarList.map((item) => (
          <span
            onClick={handleNav}
            className={item === navItem ? "activeNavItem" : ""}
            id={item}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="App">
        <br />
        {navItem === navbarList[0] && <Search />}
        {navItem === navbarList[1] && <Preview />}
        {navItem === navbarList[2] && <Backup />}
      </div>
    </div>
  );
};

export default App;
