import { useState } from "react";
import ShootForm from "../components/ShootForm";

type Shoot = {
  id: number;
  title: string;
  description: string;
  image_path: string;
  location: string;
  shoot_date: string;
  status: string;
};

type ShootFormData = {
  title: string;
  description: string;
  location: string;
  shoot_date: string;
  status: string;
  files: FileList | null;
};

type CreateShootProps = {
  setPage: (page: string) => void;
  setSelectedShootId: (id: number | null) => void;
  editingShoot: Shoot | null;
  setEditingShoot: (shoot: Shoot | null) => void;
};

function CreateShoot({
  setPage,
  setSelectedShootId,
  editingShoot,
  setEditingShoot,
}: CreateShootProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: ShootFormData) {
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

        const patchResult: Shoot = await patchResponse.json();

        setMessage("Shoot updated successfully.");
        setSelectedShootId(patchResult.id);
        setEditingShoot(null);
        setPage("view");
        return;
      }

      const collageFormData = new FormData();

      if (data.files) {
        Array.from(data.files).forEach((file: File) => {
          collageFormData.append("files", file);
        });
      }

      const collageResponse = await fetch("http://localhost:8000/upload-collage", {
        method: "POST",
        body: collageFormData,
      });

      if (!collageResponse.ok) {
        const errorData = await collageResponse.json();
        throw new Error(errorData.detail || "Failed to create collage");
      }

      const collageResult: { image_path: string } = await collageResponse.json();

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

      const shootResult: Shoot = await shootResponse.json();

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