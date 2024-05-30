import { redirect } from "next/navigation";

import { cookies } from "next/headers";
const INDEX = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token && typeof token.value === "string") {
    redirect("/dash");
  } else redirect("/login");
};

export default INDEX;
