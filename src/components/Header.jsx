export const Header = ({ toggleMain, showMain }) => {
  return (
    <div className="navigation">
      <ul>
        <li
          onClick={() => toggleMain([true, false, false])}
          className={`list ${showMain[0] ? "activeNavbarLi" : ""}`}
        >
          <a href="#" title="Головна">
            <span className="icon">
              <ion-icon name="list-circle-outline"></ion-icon>
            </span>
            <span className="navbarText">Головна</span>
          </a>
        </li>

        <li
          onClick={() => toggleMain([false, true, false])}
          className={`list ${showMain[1] ? "activeNavbarLi" : ""}`}
        >
          <a href="#" title="Налаштування">
            <span className="icon">
              <ion-icon name="settings-outline"></ion-icon>
            </span>
            <span className="navbarText">Налаштування</span>
          </a>
        </li>
        <li
          onClick={() => toggleMain([false, false, true])}
          className={`list ${showMain[2] ? "activeNavbarLi" : ""}`}
        >
          <a href="#" title="Імпорт/експорт даних">
            <span className="icon">
              <ion-icon name="cloud-download-outline"></ion-icon>
            </span>
            <span className="navbarText">Дані</span>
          </a>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
};
