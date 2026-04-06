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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    shoot_date: "",
    status: "planned",
  });

  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (editingShoot) {
      setFormData({
        title: editingShoot.title ?? "",
        description: editingShoot.description ?? "",
        location: editingShoot.location ?? "",
        shoot_date: editingShoot.shoot_date ?? "",
        status: editingShoot.status ?? "planned",
      });
      setFiles(null);
    } else {
      setFormData({
        title: "",
        description: "",
        location: "",
        shoot_date: "",
        status: "planned",
      });
      setFiles(null);
    }
  }, [editingShoot]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFiles(e.target.files);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      ...formData,
      files,
    });
  }

  return (
    <form className="shoot-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          placeholder="Titel"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Beskrivning"
          value={formData.description}
          onChange={(e) => {
            handleChange(e);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          placeholder="Plats"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="shoot_date">Shoot date</label>
        <input
          id="shoot_date"
          type="date"
          name="shoot_date"
          value={formData.shoot_date}
          onChange={handleChange}
          required
        />
      </div>

      {editingShoot && (
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="planned">Planned</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}

      {!editingShoot && (
        <div className="form-group">
          <label htmlFor="files">Upload 4 inspirational images</label>
          <input
            id="files"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />

          {files && (
            <div className="upload-info">
              <p>{files.length} file(s) selected</p>

              {files.length !== 4 && (
                <p className="upload-error">Please choose exactly 4 images.</p>
              )}

              <ul className="file-list">
                {Array.from(files).map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : editingShoot ? "Update shoot" : "Save shoot"}
      </button>

      {loading && <p className="loading">Saving shoot...</p>}
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default ShootForm;