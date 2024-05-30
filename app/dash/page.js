import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashBoard from "../Components/Dash";
const Dash = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <DashBoard />;
};

export default Dash;
