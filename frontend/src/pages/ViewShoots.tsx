import { useEffect, useState } from "react";
import "./ViewShoots.css";

function ViewShoots({ selectedShootId, setPage, setEditingShoot }) {
  const [shoots, setShoots] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchShoots() {
      try {
        const shootsResponse = await fetch("http://localhost:8000/shoots");
        const shootsData = await shootsResponse.json();
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
      const response = await fetch(`http://localhost:8000/shoots/${id}`, {
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

  function handleEdit(shoot: any) {
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
            src={`http://localhost:8000${shoot.image_path}`}
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