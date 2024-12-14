import React, { useEffect, useState } from "react";
import "./BookmarkList.css";

const BookmarkList = ({ refresh }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch("/api/readAll.php");
        if (!response.ok) {
          throw new Error("Fetching the bookmarks failed.");
        }

        const data = await response.json();
        setBookmarks(data);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [refresh]);

  const handleEdit = (bookmark) => {
    setEditingBookmark({ ...bookmark });
  };

  const saveChanges = async () => {
    try {
      const response = await fetch("/api/update.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBookmark),
      });

      if (!response.ok) {
        throw new Error("Updating the book failed.");
      }

      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.id === editingBookmark.id ? editingBookmark : bookmark
        )
      );

      setEditingBookmark(null);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/delete.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Deleting the book failed.");
      }

      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  if (loading) return <p>Loading bookmarks...</p>;
  if (errorMessage) return <p className="error-message">{errorMessage}</p>;

  return (
    <div className="list-container">
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            {editingBookmark && editingBookmark.id === bookmark.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editingBookmark.title}
                  onChange={(e) =>
                    setEditingBookmark({
                      ...editingBookmark,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="url"
                  value={editingBookmark.link}
                  onChange={(e) =>
                    setEditingBookmark({
                      ...editingBookmark,
                      link: e.target.value,
                    })
                  }
                />
                <button className="save-button" onClick={saveChanges}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditingBookmark(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h3>{bookmark.title}</h3>
                <p>{bookmark.link}</p>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(bookmark)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(bookmark.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkList;
