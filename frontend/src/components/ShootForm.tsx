import { useEffect, useState } from "react";
import "./ShootForm.css";

type Shoot = {
  id: number;
  title: string;
  description: string;
  location: string;
  shoot_date: string;
  status: string;
  image_path: string;
};

type ShootFormData = {
  title: string;
  description: string;
  location: string;
  shoot_date: string;
  status: string;
  files: FileList | null;
};

type ShootFormProps = {
  onSubmit: (data: ShootFormData) => void;
  message: string;
  error: string;
  loading: boolean;
  editingShoot: Shoot | null;
};

function ShootForm({
  onSubmit,
  message,
  error,
  loading,
  editingShoot,
}: ShootFormProps) {
  const [formData, setFormData] = useState<ShootFormData>({
    title: "",
    description: "",
    location: "",
    shoot_date: "",
    status: "planned",
    files: null,
  });

  useEffect(() => {
    if (editingShoot) {
      setFormData({
        title: editingShoot.title,
        description: editingShoot.description,
        location: editingShoot.location,
        shoot_date: editingShoot.shoot_date,
        status: editingShoot.status,
        files: null,
      });
    }
  }, [editingShoot]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      files: e.target.files,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form className="shoot-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <input
        type="date"
        name="shoot_date"
        value={formData.shoot_date}
        onChange={handleChange}
      />

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="planned">Planned</option>
        <option value="completed">Completed</option>
      </select>

      {!editingShoot && (
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : editingShoot ? "Update Shoot" : "Create Shoot"}
      </button>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default ShootForm;