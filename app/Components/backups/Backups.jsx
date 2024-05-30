"use client";
import { useTokenContext } from "../../Context/token";
import { useEffect, useState } from "react";
import SearchUser from "../../services/searchuser";
import FetchUsers from "../../services/fetchusers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "../../Components/Loading";
import FetchArticles from "../../services/fetchArticles";
import { redirect } from "next/navigation";
import FetchBackups from "../../services/fetchBackups";
const Articles = () => {
  const { token } = useTokenContext();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [backups, setBackups] = useState([]);

  const handleNextPage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    setIsLoading(true);

    if (token)
      FetchBackups(token).then((res) => {
        setBackups(res.data);
        // setTotalPages(usr.data.last_page);

        setIsLoading(false);
      });
    else setBackups([]);
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
        {/* <div className="items-center justify-center flex-1">
          {term ? (
            <button
              className="px-2 py-1 mx-4 text-white bg-red-600 rounded-lg"
              onClick={handleCancelSearch}
            >
              انصراف{" "}
            </button>
          ) : (
            ""
          )}
          <button
            className="px-2 py-1 mx-2 bg-gray-400 rounded-lg"
            onClick={handleSearchUser}
          >
            برسی{" "}
          </button>
          <input
            onChange={(e) => setTerm(e.target.value)}
            onFocus={(e) => setTerm(e.target.value)}
            onBlur={(e) => setTerm(e.target.value)}
            className="w-1/2 px-4 py-1 mx-auto text-right rounded-lg"
            placeholder="جستوجو بر اساس نام کاربری یا شماره تماس "
          />
        </div> */}
        <div className="m-4">
          <div
            className="grid grid-cols-12 px-2 bg-gray-300 border-b border-gray-300 border-dashed rounded-full"
            dir="rtl"
          >
            <div className="col-span-1">شماره </div>
            <div className="col-span-4 ">عنوان</div>

            <div className="col-span-5">دریافت</div>
          </div>
          {backups.map((b) => (
            <div
              key={b}
              className="grid grid-cols-12 px-2 py-1 my-2 bg-white border-b border-gray-400 border-dashed rounded-full"
              dir="rtl"
            >
              <div className="col-span-1">1</div>
              <div className="col-span-6">{b.substr(7)}</div>
              <div className="col-span-2">
                <a
                  target="_blank"
                  href={`https://dl.lezatkhayati.com/lezatekhayati/${b}`}
                  className="bg-green-300 rounded px-2"
                >
                  دریافت
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Articles;
