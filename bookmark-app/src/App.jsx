import React, { useState } from "react";
import BookmarkList from "./components/booksmarklist";
import BookmarkForm from "./components/bookmarksform";
import "./App.css";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="app-container">
      <h1>Bookmarks</h1>
      <BookmarkForm onBookmarkAdded={triggerRefresh} />
      <BookmarkList refresh={refresh} />
    </div>
  );
};

export default App;

