import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UsersComp from "../../Components/users/Users";
const Users = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <UsersComp />;
};

export default Users;
