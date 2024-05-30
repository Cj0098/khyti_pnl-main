import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Musics from "../../Components/musics/Musics";
const MusicPage = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <Musics />;
};

export default MusicPage;
