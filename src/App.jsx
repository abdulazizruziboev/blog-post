import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPageLayout from "./layout/LandingPagesLayout";
import HomePage from "./pages/landing/HomePage";
import PostsPage from "./pages/landing/PostsPage";
import PostDetailsPage from "./pages/landing/PostDetailsPage";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LandingPageLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "posts", element: <PostsPage /> },
        { path: "post-details", element: <PostDetailsPage /> },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
