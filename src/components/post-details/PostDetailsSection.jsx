import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import PostDetailsContent from "./PostDetailsContent";
import RelatedPosts from "./RelatedPosts";

export default function PostDetailsSection({ id }) {
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://blogify-oquvchi.vercel.app/api/posts/${id}`,
        );
        const data = await response.json();
        setPost(data.post);
        setRelated(data.related ? data.related.slice(0, 2) : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-101.5 flex flex-col justify-center items-center">
        <LoaderCircle className="animate-spin" />
        <p className="mt-2 text-sm text-[#6B7280]">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-101.5 flex flex-col justify-center items-center">
        <p className="mt-2 text-sm text-red-500">Post not found.</p>
      </div>
    );
  }

  return (
    <>
      <PostDetailsContent post={post} />
      <RelatedPosts related={related} />
    </>
  );
}
