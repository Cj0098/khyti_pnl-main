import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NewCourse from "../../../Components/courses/New";
import EditCourse from "../../../Components/courses/Id";

const New = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <EditCourse />;
};

export default New;
