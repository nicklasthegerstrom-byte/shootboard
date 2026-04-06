import logo from "../assets/shootboard.png";
import "./Header.css";

type HeaderProps = {
  setPage: (page: string) => void;
  currentPage: string;
  setSelectedShootId: (id: number | null) => void;
  setEditingShoot: (shoot: any | null) => void;
};

function Header({
  setPage,
  currentPage,
  setSelectedShootId,
  setEditingShoot,
}: HeaderProps) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="ShootBoard"
        className="logo"
        onClick={() => {
          setSelectedShootId(null);
          setEditingShoot(null);
          setPage("home");
        }}
      />

      <nav className="header-nav">
        <span
          className={currentPage === "create" ? "active" : ""}
          onClick={() => {
            setSelectedShootId(null);
            setEditingShoot(null);
            setPage("create");
          }}
        >
          Create new Shoot
        </span>

        <span
          className={currentPage === "view" ? "active" : ""}
          onClick={() => {
            setSelectedShootId(null);
            setEditingShoot(null);
            setPage("view");
          }}
        >
          View all Shoots
        </span>

        <span
          className={currentPage === "calendar" ? "active" : ""}
          onClick={() => {
            setSelectedShootId(null);
            setEditingShoot(null);
            setPage("calendar");
          }}
        >
          Calendar View
        </span>
      </nav>
    </header>
  );
}

export default Header;