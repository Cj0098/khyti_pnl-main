"use client";
import { useTokenContext } from "../../Context/token";
import SearchUser from "../../services/searchuser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "../../Components/Loading";
import fetchDeleteCourse from "../../services/fetchMusics";
import FetchCourses from "../../services/fetchCourses";
import { toast } from "react-toastify";
import FetchMusics from "../../services/fetchMusics";
import FetchDeleteMusic from "../../services/fetchDeleteMusic";

const Courses = () => {
  const [musics, setMusics] = useState([]);
  const { token } = useTokenContext();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [fresh, setFresh] = useState(0);

  const handleDelete = (id) => {
    FetchDeleteMusic(token, id).then((res) => {
      setFresh(fresh + 1);
      toast.success("با موفقیت حذف شد");
    });
  };

  const handleCancelSearch = () => {
    // router.refresh();
    setPage(1);

    // console.log("newval", page);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    setIsLoading(true);

    if (token)
      FetchMusics(page).then((musics) => {
        setMusics(musics.data.data);
        // setTotalPages(usr.data.last_page);
        let pgs = [];
        for (let index = 1; index <= musics.data.last_page; index++) {
          console.log("wtf");
          pgs.push(index);
        }
        setTotalPages(pgs);

        setIsLoading(false);
      });
    else setMusics([]);
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

            <div className="col-span-7">اکشن ها</div>
          </div>
          {musics.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-12 px-2 py-1 my-2 bg-white border-b border-gray-400 border-dashed rounded-full"
              dir="rtl"
            >
              <div className="col-span-1">{u.id}</div>
              <div className="col-span-4">{u.name}</div>

              <div className="flex items-center justify-between col-span-7">
                <button
                  className="px-4 cursor-pointer  rounded-lg bg-red-400 text-[12px] text-white "
                  onClick={() => handleDelete(u.id)}
                >
                  حذف
                </button>
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
              {totalPages.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            {page > 1 ? (
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

export default Courses;
