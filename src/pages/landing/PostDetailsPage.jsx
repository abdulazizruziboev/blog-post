import { useParams } from "react-router-dom";
import PostDetailsSection from "../../components/post-details/PostDetailsSection";

export default function PostDetailsPage() {
  const { id } = useParams();

  return <PostDetailsSection id={id} />;
}
