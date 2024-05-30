"use client";
import { useEffect, useState } from "react";
import FetchChats from "../../services/fetchChats";
import { useTokenContext } from "../../Context/token";
import Link from "next/link";
import Loading from "../../Components/Loading";
import { redirect } from "next/navigation";
const Chats = () => {
  const [chats, setChats] = useState();
  const { token } = useTokenContext();
  if (token == null) redirect("/login");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (token)
      FetchChats(token).then((res) => {
        setChats(res.data);
        setIsLoading(false);
      });
  }, [token]);
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else
    return (
      <div className="container mx-auto mt-12">
        <div className="m-4">
          <div
            className="grid grid-cols-12 px-2 bg-gray-300 border-b border-gray-300 border-dashed rounded-full"
            dir="rtl"
          >
            <div className="col-span-1">شماره </div>
            <div className="col-span-4 ">عنوان</div>

            <div className="col-span-7">اکشن ها</div>
          </div>
          <div
            className="grid grid-cols-12 px-2 py-1 my-2 bg-white border-b border-gray-400 border-dashed rounded-full"
            dir="rtl"
          >
            <div className="col-span-1">1 </div>
            <div className="col-span-4 ">برسش و باسخ عمومی</div>

            <div className="col-span-7 ">
              <Link
                href={"/dash/chats/1"}
                className="px-2 bg-green-300 rounded-lg"
              >
                مدیریت
              </Link>
            </div>
          </div>
          {chats.map((u) => (
            <div key={u.id}>
              {u.data !== null ? (
                <div
                  className="grid grid-cols-12 px-2 py-1 my-2 bg-white border-b border-gray-400 border-dashed rounded-full"
                  dir="rtl"
                >
                  <div className="col-span-1">{u.id} </div>
                  <div className="col-span-4 ">{u.data.name}</div>

                  <div className="col-span-7 ">
                    <Link
                      href={`/dash/chats/${u.id}`}
                      className="px-2 bg-green-300 rounded-lg"
                    >
                      مدیریت
                    </Link>
                  </div>
                </div>
              ) : (
                " "
              )}
            </div>
          ))}
          <div className="flex justify-between"></div>

          <div className="container flex mx-auto bg-red-200"></div>
        </div>
      </div>
    );
};

export default Chats;
