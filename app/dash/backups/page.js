import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Backups from "../../Components/backups/Backups";
const ArticlesPage = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <Backups />;
};

export default ArticlesPage;
