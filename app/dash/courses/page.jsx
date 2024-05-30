import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Courses from "../../Components/courses/Courses";
const SingleArt = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <Courses />;
};

export default SingleArt;
