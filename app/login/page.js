import LoginBox from "../Components/LoginBox";
import { useTokenContext } from "../Context/token";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
const Login = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token && typeof token.value === "string") {
    redirect("/dash");
  } else
    return (
      <>
        <LoginBox />
      </>
    );
};

export default Login;
