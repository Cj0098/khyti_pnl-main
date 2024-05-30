import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Cats from "../../../Components/articles/Cats";
const ArticlesPage = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <Cats />;
};

export default ArticlesPage;
