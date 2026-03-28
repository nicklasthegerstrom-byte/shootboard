import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CreateShoot from "./pages/CreateShoot";
import ViewShoots from "./pages/ViewShoots";

function App() {
  const [page, setPage] = useState("home");
  const [selectedShootId, setSelectedShootId] = useState<number | null>(null);
  const [editingShoot, setEditingShoot] = useState<any | null>(null);
  

  return (
    <div className="app">
      <Header
        setPage={setPage}
        currentPage={page}
        setSelectedShootId={setSelectedShootId}
        setEditingShoot={setEditingShoot}
      />

      <main className="main">
        {page === "home" && null}

        {page === "create" && (
          <CreateShoot
            setPage={setPage}
            setSelectedShootId={setSelectedShootId}
            editingShoot={editingShoot}
            setEditingShoot={setEditingShoot}
          />
        )}

        {page === "view" && (
          <ViewShoots
            selectedShootId={selectedShootId}
            setPage={setPage}
            setEditingShoot={setEditingShoot}
          />
        )}
      </main>
    </div>
  );
}

export default App;