import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPageLayout from "./layout/LandingPagesLayout";
import AuthPagesLayout from "./layout/AuthPagesLayout";
import AdminPagesLayout from "./layout/AdminPagesLayout";
import HomePage from "./pages/landing/HomePage";
import PostsPage from "./pages/landing/PostsPage";
import PostDetailsPage from "./pages/landing/PostDetailsPage";
import DashboardLoginPage from "./pages/auth/DashboardLoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminPostsPage from "./pages/admin/AdminPostsPage";
import CreatePostPage from "./pages/admin/CreatePostPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LandingPageLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "posts", element: <PostsPage /> },
        { path: "post-details/:id", element: <PostDetailsPage /> },
      ],
    },
    {
      element: <AuthPagesLayout />,
      children: [{ path: "login", element: <DashboardLoginPage /> }],
    },
    {
      element: (
        <ProtectedRoute>
          <AdminPagesLayout />
        </ProtectedRoute>
      ),
      path: "dashboard",
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "posts", element: <AdminPostsPage /> },
        { path: "create-post", element: <CreatePostPage /> },
        { path: "posts/:id/edit", element: <CreatePostPage /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
