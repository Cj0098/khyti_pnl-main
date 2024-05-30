"use client";
import { useEffect } from "react";
import { useTokenContext } from "../../Context/token";
import FetchSingleChat from "../../services/fetchSingleChat";
import { useState } from "react";
import Loading from "../Loading";
import { useRef } from "react";
import Files from "../UploadCenter/Files";
import FetchDeleteMessages from "../../services/fetchDeleteMessages";
import { toast } from "react-toastify";
const SingleChat = ({ params }) => {
  const checkRef = useRef([]);
  const [chat, setChat] = useState([]);
  const { token } = useTokenContext();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteArray, setDeleteArray] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [list, setList] = useState([]);
  const [fresh, setFresh] = useState(1);
  const [isCheck, setIsCheck] = useState([]);
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleCheckMessage = (id) => {
    if (deleteArray.includes(id)) {
      deleteArray.splice(deleteArray.indexOf(id), 1);
      setDeleteArray([...deleteArray]);
      checkRef.current[id].checked = false;
    } else {
      setDeleteArray([...deleteArray, id]);
      checkRef.current[id].checked = true;
    }
  };
  const HandleDeleteMessages = () => {
    FetchDeleteMessages(token, isCheck).then((res) => {
      toast.success("انجام شد");
    });
  };
  useEffect(() => {
    setIsLoading(true);
    if (token)
      FetchSingleChat(token, params.id, page).then((res) => {
        setList(res.data.data);
        let pgs = [];
        ("");
        for (let index = 1; index <= res.data.last_page; index++) {
          pgs.push(index);
        }
        setTotalPages(pgs);

        setIsLoading(false);
      });
  }, [fresh, token, page]);
  //   const handleCheckAll = () => {
  //     checkRef.current.map((ref) => {
  //       if (deleteArray.includes(parseInt(ref.value))) {
  //         deleteArray.splice(deleteArray.indexOf(parseInt(ref.value)), 1);
  //         setDeleteArray([]);
  //       } else {
  //         setDeleteArray((deleteArray) => [...deleteArray, parseInt(ref.value)]);
  //         ref.checked = true;
  //       }
  //     });
  //   };
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);

    setIsCheck(list.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
    // setFresh(fresh + 1);
    console.log(isCheck);
  };

  const handleClick = (e) => {
    console.log(e.target.checked);
    const { id, checked } = e.target;
    setIsCheck([...isCheck, parseInt(id)]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== parseInt(id)));
      // setFresh(fresh + 1);
    }
    console.log(isCheck);
  };
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  } else
    return (
      <div className="container mx-auto" dir="rtl">
        <button
          className="text-red-600 bg-white mx-2 rounded-lg px-2"
          onClick={HandleDeleteMessages}
        >
          حذف انتخاب شده ها
        </button>
        <button
          className="text-red-600 bg-white mx-2 rounded-lg px-2"
          onClick={() => handleSelectAll()}
        >
          {isCheckAll ? "حذف انتخاب" : "انتخاب همه"}
        </button>

        {list.map(({ id, user, body, files }) => (
          <div
            className="flex bg-white items-center rounded text-right px-2 my-1"
            key={id}
          >
            <input
              ref={(element) => {
                checkRef.current[id] = element;
              }}
              type="checkbox"
              className="mx-2"
              onChange={(e) => handleClick(e)}
              value={id}
              id={id}
              checked={isCheck.includes(id)}
            />
            <div>
              <span className="text-green-400">{user.name}</span> :
              {body == null ? (
                <div>
                  {(() => {
                    if (files.type == "image") {
                      return <img src={files.input} className="h-20" />;
                    } else if (files.type == "voice") {
                      return (
                        <audio controls>
                          <source src={files.input} type="audio/mpeg" />
                          Your browser does not support the audio tag.
                        </audio>
                      );
                    } else if (files.type == "video") {
                      return (
                        <video width="320" height="240" controls>
                          <source src={files.input} type="video/mp4" />
                        </video>
                      );
                    }
                  })()}
                </div>
              ) : (
                body
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          {page > 1 ? (
            <button onClick={() => setPage(page - 1)}>صفحه قبلی </button>
          ) : (
            "صفحه قبلی نداریم که "
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
          {page < totalPages.length ? (
            <button onClick={handleNextPage}>صفحه بعدی </button>
          ) : (
            "تموم شد حاجی"
          )}
        </div>
      </div>
    );
};

export default SingleChat;
