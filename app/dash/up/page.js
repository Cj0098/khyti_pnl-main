// import Files from "../../Components/UploadCenter/Files.jsx";
// const UploadCenter = () => {
//   return (
//     <div className="container p-4 mx-auto">
//       <Files />
//     </div>
//   );
// };

// export default UploadCenter;

import Files from "../../Components/UploadCenter/Files.jsx";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const UploadCenter = () => {
  const cookieStore = cookies();
  const checkToken = cookieStore.get("token");
  if (checkToken == null) redirect("/login");
  else return <Files />;
};

export default UploadCenter;
