import React, { useState } from "react";
import "./BookmarkForm.css";

const BookmarkForm = ({ onBookmarkAdded }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/create.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, link }),
      });

      if (!response.ok) {
        throw new Error("Failed to add bookmark.");
      }

      setTitle("");
      setLink("");
      onBookmarkAdded();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Bookmark</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default BookmarkForm;
