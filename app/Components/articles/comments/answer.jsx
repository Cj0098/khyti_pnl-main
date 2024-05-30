"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import FetchSubmitComment from "../../../services/fetchSubmitComment";
import { useTokenContext } from "../../../Context/token";
const Comment = ({ parent }) => {
  return (
    <div className="flex flex-col-reverse">
      <div
        className="border border-slate-800 rounded-lg px-2 py-1 my-2"
        dir="rtl"
      >
        {parent.user.name} : {parent.text}
      </div>
      {parent.parent !== null ? <Comment parent={parent.parent} /> : ""}
    </div>
  );
};

const Answer = ({ comment, setModal }) => {
  const [Answer, setAnswer] = useState();
  const { token } = useTokenContext();
  const handelSubmitComment = (e) => {
    e.preventDefault();
    FetchSubmitComment(token, Answer, comment.id, comment.post_id).then(
      (res) => {
        setModal(false);
        toast.success("با موفقیت افزوده شد");
      }
    );
  };
  return (
    <div className="container fixed z-50 w-96 h-full py-4 mx-auto bg-gray-200 shadow-lg left-10 right-20 top-10 rounded-lg text-right overflow-y-scroll">
      <button className="mx-2" onClick={() => setModal(false)}>
        x
      </button>
      <div className=" relative mx-auto  px-2 py-4 flex flex-col-reverse">
        <form className="flex" onSubmit={(e) => handelSubmitComment(e)}>
          <button className="bg-green-300 rounded-lg mx-2 px-1">ثبت</button>
          <input
            type="text"
            required
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="باسخ را اینجا بنویسید"
            className="grow px-2 py-1 my-2 rounded-lg text-right"
          />
        </form>
        <div
          className="border border-slate-800 rounded-lg px-2 py-1 my-2 bg-green-200"
          dir="rtl"
        >
          {comment.user.name} : {comment.text}
        </div>

        {comment.parent == null ? "" : <Comment parent={comment.parent} />}
      </div>
    </div>
  );
};

export default Answer;
