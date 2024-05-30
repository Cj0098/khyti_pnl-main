import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Single from "../../../Components/articles/Single";
const SingleArt = ({ params }) => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <Single params={params} />;
};

export default SingleArt;
