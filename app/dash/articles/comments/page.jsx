import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Comments from "../../../Components/articles/comments/comments";
const CommentsPage = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <Comments />;
};

export default CommentsPage;
