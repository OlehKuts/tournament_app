import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <NavLink
            to="/"
            end
            title="Головна"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <span className="icon">
              <ion-icon name="list-circle-outline"></ion-icon>
            </span>
            <span className="navbarText">Головна</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            title="Налаштування"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <span className="icon">
              <ion-icon name="settings-outline"></ion-icon>
            </span>
            <span className="navbarText">Налаштування</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/importPage"
            title="Імпорт/експорт даних"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <span className="icon">
              <ion-icon name="cloud-download-outline"></ion-icon>
            </span>
            <span className="navbarText">Дані</span>
          </NavLink>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
};
