import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

//NavLik  is a specialized version of the Link component that includes built-in support for styling active or pending states.
//it has a propert like { isActive, isPending}
function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end //means it is the end only "/" not "/about"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
