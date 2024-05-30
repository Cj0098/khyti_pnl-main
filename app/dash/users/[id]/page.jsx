import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SingleUser from "../../../Components/users/Id";
const User = ({ params }) => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <SingleUser params={params} />;
};

export default User;
