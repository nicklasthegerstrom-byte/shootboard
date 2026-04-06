import { useEffect, useState } from "react";
import "./ViewShoots.css";

const API_URL = import.meta.env.VITE_API_URL;

type Shoot = {
  id: number;
  title: string;
  description: string;
  image_path: string;
  location: string;
  shoot_date: string;
  status: string;
};

type ViewShootsProps = {
  selectedShootId: number | null;
  setPage: (page: string) => void;
  setEditingShoot: (shoot: Shoot | null) => void;
};

function ViewShoots({
  selectedShootId,
  setPage,
  setEditingShoot,
}: ViewShootsProps) {
  const [shoots, setShoots] = useState<Shoot[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchShoots() {
      try {
        const shootsResponse = await fetch(`${API_URL}/shoots`);
        const shootsData: Shoot[] = await shootsResponse.json();
        setShoots(shootsData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchShoots();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm("Delete this shoot?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/shoots/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete shoot");
      }

      setShoots(shoots.filter((shoot) => shoot.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  function handleEdit(shoot: Shoot) {
    setEditingShoot(shoot);
    setPage("create");
  }

  const sortedShoots = [...shoots].sort((a, b) => b.id - a.id);

  const filteredShoots = sortedShoots.filter((shoot) =>
    shoot.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleShoots =
    selectedShootId === null
      ? filteredShoots
      : filteredShoots.filter((shoot) => shoot.id === selectedShootId);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search shoots..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="shoots-container">
        {visibleShoots.map((shoot) => (
          <div key={shoot.id} className="shoot-card">
            <img
              src={`${API_URL}${shoot.image_path}`}
              alt={shoot.title}
              className="shoot-image"
            />

            <div className="shoot-content">
              <h2>{shoot.title}</h2>

              <p className="meta">
                {shoot.location} · {shoot.shoot_date}
              </p>

              <p className="description">{shoot.description}</p>
              <p className="meta">
                Status: {shoot.status.charAt(0).toUpperCase() + shoot.status.slice(1)}
              </p>

              <div className="shoot-actions">
                <span className="action edit" onClick={() => handleEdit(shoot)}>
                  Edit
                </span>
                <span className="action delete" onClick={() => handleDelete(shoot.id)}>
                  Delete
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewShoots;