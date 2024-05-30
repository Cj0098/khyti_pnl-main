import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SettingPage from "../../Components/setting/Setting";
const Setting = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <SettingPage />;
};

export default Setting;
