"use client";
import { useTokenContext } from "../../../Context/token";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "../../../Components/Loading";
import FetchArticleComments from "../../../services/fetchArticleComments";
import Answer from "../comments/answer";
const Comments = () => {
  const router = useRouter();

  const { token } = useTokenContext();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [comments, setComments] = useState();
  const [comment, setComment] = useState();
  const [openAnswer, setOpenAnswer] = useState(false);
  const [fresh, setFresh] = useState(1);
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const setModal = (arg) => {
    setOpenAnswer(arg);
    setFresh(fresh + 1);
  };
  useEffect(() => {
    setIsLoading(true);
    if (token)
      FetchArticleComments(token, page).then((res) => {
        setComments(res.data.data);
        let pgs = [];
        for (let index = 1; index <= res.data.last_page; index++) {
          pgs.push(index);
        }
        setTotalPages(pgs);

        setIsLoading(false);
      });
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
        {openAnswer ? <Answer comment={comment} setModal={setModal} /> : ""}
        <div className="m-4">
          <div
            className="grid grid-cols-12 px-2 bg-gray-300 border-b border-gray-300 border-dashed rounded-full"
            dir="rtl"
          >
            <div className="col-span-1">شماره </div>
            <div className="col-span-4 ">مقاله</div>

            <div className="col-span-4">متن</div>
            <div className="col-span-3">اکشن ها</div>
          </div>
          {comments.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-12 px-2 py-1 my-2 bg-white border-b border-gray-400 border-dashed rounded-full"
              dir="rtl"
            >
              <div className="col-span-1">{c.id}</div>
              <div className="">{c.post.name}</div>

              <div className="flex items-center justify-between col-span-7">
                {c.text}
              </div>
              <div className="flex">
                <button className="rounded bg-cyan-200 px-2">تایید</button>
                <button
                  className="rounded bg-green-200 px-2 mx-2"
                  onClick={() => {
                    setComment(c);
                    openAnswer ? setOpenAnswer(false) : setOpenAnswer(true);
                  }}
                >
                  باسخ
                </button>
                <button className="rounded bg-red-200 px-2">حذف</button>
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
              {totalPages.length > 0 &&
                totalPages.map((i) => (
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

export default Comments;
