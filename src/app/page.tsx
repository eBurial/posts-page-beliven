"use client";
import React from "react";
import Home from "./Home"; // Replace with your component file path
import { PostsProvider } from "./context/PostsContext"; // Replace with your context file path

const App = () => {
  return (
    <PostsProvider>
      <Home />
    </PostsProvider>
  );
};

export default App;
