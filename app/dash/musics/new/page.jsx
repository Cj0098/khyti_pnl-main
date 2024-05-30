import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NewMusic from "../../../Components/musics/NewMusic";
const NewMusicPage = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <NewMusic />;
};

export default NewMusicPage;
