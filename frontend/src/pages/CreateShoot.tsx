import { useState } from "react";
import ShootForm from "../components/ShootForm";

function CreateShoot({
  setPage,
  setSelectedShootId,
  editingShoot,
  setEditingShoot,
}) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setMessage("");
    setError("");

    if (
      !data.title.trim() ||
      !data.description.trim() ||
      !data.location.trim() ||
      !data.shoot_date.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!editingShoot && (!data.files || data.files.length !== 4)) {
      setError("Please choose exactly 4 images.");
      return;
    }

    setLoading(true);

    try {
      // EDIT MODE → PATCH
      if (editingShoot) {
        const updatedShoot = {
          title: data.title,
          description: data.description,
          location: data.location,
          shoot_date: data.shoot_date,
          status: data.status,
        };

        const patchResponse = await fetch(
          `http://localhost:8000/shoots/${editingShoot.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedShoot),
          }
        );

        if (!patchResponse.ok) {
          const errorData = await patchResponse.json();
          throw new Error(errorData.detail || "Failed to update shoot");
        }

        const patchResult = await patchResponse.json();

        setMessage("Shoot updated successfully.");
        setSelectedShootId(patchResult.id);
        setEditingShoot(null);
        setPage("view");
        return;
      }

      // CREATE MODE → upload collage first
      const collageFormData = new FormData();

      Array.from(data.files).forEach((file) => {
        collageFormData.append("files", file);
      });

      const collageResponse = await fetch("http://localhost:8000/upload-collage", {
        method: "POST",
        body: collageFormData,
      });

      if (!collageResponse.ok) {
        const errorData = await collageResponse.json();
        throw new Error(errorData.detail || "Failed to create collage");
      }

      const collageResult = await collageResponse.json();

      const newShoot = {
        title: data.title,
        description: data.description,
        image_path: collageResult.image_path,
        location: data.location,
        shoot_date: data.shoot_date,
      };

      const shootResponse = await fetch("http://localhost:8000/shoots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShoot),
      });

      if (!shootResponse.ok) {
        const errorData = await shootResponse.json();
        throw new Error(errorData.detail || "Failed to save shoot");
      }

      const shootResult = await shootResponse.json();

      setMessage("Shoot saved successfully.");
      setSelectedShootId(shootResult.id);
      setEditingShoot(null);
      setPage("view");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>{editingShoot ? "Edit Shoot" : "Create new Shoot"}</h2>

      <ShootForm
        onSubmit={handleSubmit}
        message={message}
        error={error}
        loading={loading}
        editingShoot={editingShoot}
      />
    </div>
  );
}

export default CreateShoot;