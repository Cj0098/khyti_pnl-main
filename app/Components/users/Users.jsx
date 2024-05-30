"use client";

import SearchUser from "../../services/searchuser";
import { useEffect, useState } from "react";
import FetchUsers from "../../services/fetchusers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import Loading from "../../Components/Loading";
import { toast } from "react-toastify";
import { useTokenContext } from "../../Context/token";
const UsersComp = () => {
  const searchRef = useRef(null);
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const { token } = useTokenContext();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [term, setTerm] = useState();
  const [fresh, setFresh] = useState(0);
  const handleSearchUser = (e) => {
    e.preventDefault();
    if (term && token) {
      setIsLoading(true);
      SearchUser(token, term).then((user) => {
        setMembers(user.data);
        setIsLoading(false);
      });
    } else toast.error("فیلد خیالیست");
  };
  const handleCancelSearch = () => {
    // router.refresh();
    setFresh(fresh + 1);
    setTerm(null);
    // console.log("newval", page);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    setIsLoading(true);

    if (token)
      FetchUsers(token, page).then((usr) => {
        setMembers(usr.data.data);
        // setTotalPages(usr.data.last_page);
        let pgs = [];
        for (let index = 1; index <= usr.data.last_page; index++) {
          console.log("wtf");
          pgs.push(index);
        }
        setTotalPages(pgs);

        setIsLoading(false);
      });
    else setMembers([]);
  }, [token, page, fresh]);
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else
    return (
      <div className="container mx-auto mt-12">
        <form
          className="items-center justify-center flex-1"
          onSubmit={(e) => handleSearchUser(e)}
        >
          {term ? (
            <span
              className="px-2 py-1 mx-4 text-white bg-red-600 rounded-lg"
              onClick={handleCancelSearch}
            >
              انصراف{" "}
            </span>
          ) : (
            ""
          )}
          <button className="px-2 py-1 mx-2 bg-gray-400 rounded-lg">
            برسی{" "}
          </button>
          <input
            ref={searchRef}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onFocus={(e) => setTerm(e.target.value)}
            onBlur={(e) => setTerm(e.target.value)}
            className="w-1/2 px-4 py-1 mx-auto text-right rounded-lg"
            placeholder="جستوجو بر اساس نام کاربری یا شماره تماس "
            required
          />
        </form>
        <div className="m-4">
          <div
            className="grid grid-cols-12 px-2 bg-gray-300 border-b border-gray-300 border-dashed rounded-full"
            dir="rtl"
          >
            <div className="col-span-1">شماره </div>
            <div className="col-span-2 ">نام</div>
            <div className="col-span-2 ">شماره تماس</div>
            <div className="col-span-2 ">تاریخ ثبت نام</div>
            <div className="col-span-1 ">معرف</div>

            <div className="col-span-4">اکشن ها</div>
          </div>
          {members.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-12 px-2 py-1 my-2 bg-white border-b border-gray-400 border-dashed rounded-full"
              dir="rtl"
            >
              <div className="col-span-1">{u.id}</div>
              <div
                className={
                  u.role == "admin"
                    ? "text-red-600 col-span-2"
                    : "text-black col-span-2"
                }
              >
                {u.name}
              </div>
              <div className="col-span-2">{u.phone}</div>
              <div className="col-span-2" dir="lrt">
                {`${u.time[2]} / ${u.time[1]} / ${u.time[0]}`}{" "}
                {u.isNew ? (
                  <span className="text-[10px] text-white bg-red-500 rounded">
                    new
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="col-span-1 ">{u.refer}</div>
              <div className="flex items-center justify-between col-span-4 mr-2">
                <Link
                  href={`/dash/users/` + u.id}
                  className="px-4 cursor-pointer  rounded-lg bg-green-400 text-[12px] text-white"
                >
                  بروفایل
                </Link>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            {page < totalPages.length ? (
              <button onClick={handleNextPage}>صفحه بعدی </button>
            ) : (
              "تموم شد حاجی"
            )}

            <select
              value={page}
              onChange={(e) => setPage(parseInt(e.target.value))}
            >
              {!term &&
                totalPages.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
            </select>
            {page > 1 && !term ? (
              <button onClick={() => setPage(page - 1)}>صفحه قبلی </button>
            ) : (
              "صفحه قبلی نداریم که "
            )}
          </div>

          <div className="container flex mx-auto bg-red-200"></div>
        </div>
      </div>
    );
};
export default UsersComp;
