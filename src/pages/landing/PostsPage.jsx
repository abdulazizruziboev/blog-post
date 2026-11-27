import { useState, useEffect } from "react";
import PostsSearch from "../../components/posts/PostsSearch";
import PostsList from "../../components/posts/PostsList";
import { formatDate } from "../../tools/formatDate";

const categories = ["All", "Technology", "Productivity", "Design"];

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Filter & Search states
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://blogify-oquvchi.vercel.app/api/posts",
        );
        if (!response.ok) throw new Error("Failed to load posts");
        const data = await response.json();

        if (Array.isArray(data.posts)) {
          const filteredPosts = data.posts.filter((post) => {
            const matchesSearch = String(post.title)
              .toLowerCase()
              .includes(searchValue.toLowerCase());
            const matchesCategory =
              category === "All" || post.category === category;

            return matchesSearch && matchesCategory;
          });

          setPosts(
            filteredPosts.map((post) => ({
              id: post.id,
              image: post.image,
              category: post.category,
              date: formatDate(post.createdAt),
              title: post.title,
              excerpt: post.excerpt,
            })),
          );
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.log(err);
        if (err.name !== "AbortError") {
          setError("Could not load posts.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [category, searchValue]);

  return (
    <>
      <PostsSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <PostsList
        posts={posts}
        loading={loading}
        error={error}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />
    </>
  );
}
