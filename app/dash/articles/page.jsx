import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Articles from "../../Components/articles/Articles";
const ArticlesPage = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <Articles />;
};

export default ArticlesPage;
