import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SingleChat from "../../../Components/chats/singleChat.jsx";
const ChatPage = ({ params }) => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <SingleChat params={params} />;
};

export default ChatPage;
