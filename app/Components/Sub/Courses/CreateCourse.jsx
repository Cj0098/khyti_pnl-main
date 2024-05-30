"use client";

import React, { useEffect, useState } from "react";
import { IoPlaySkipBackOutline } from "react-icons/io5";

import Modal from "../../../Components/UploadCenter/Modal";
import { FaCaretLeft, FaSourcetree, FaAngleDown } from "react-icons/fa";
// import { Button, Modal } from "flowbite-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading";
import FetchCreateCourse from "../../../services/fetchCreateSubCourse";
import { useTokenContext } from "../../../Context/token";
import FetchSingleSubCourse from "../../../services/fetchSingleSubCourse";
const NewCourse = (props) => {
  const [openModal, setOpenModal] = useState(0);
  const [coursesArray, setCoursesArray] = useState([]);

  const { token } = useTokenContext();
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setIsSubmitted] = useState([false]);

  const [isPublished, setIsPublished] = useState([false]);

  const [data, setData] = useState({
    name: "",
    thumbnail: null,
    hasTrailer: false,
    trailer: null,
    price: 0,
    des: "",
    courses: [],
  });
  const SetModal = (arg) => {
    setOpenModal(arg);
  };

  const SetFile = (arg) => {
    if (openModal == 1) setData({ ...data, thumbnail: arg });
    else setData({ ...data, trailer: arg });
  };
  const setLessonFile = (arg) => {
    handleInputChange(openModal.substr(7), "url", arg.substr(42));
  };

  const HandleSubmitCourse = (e) => {
    console.log("clicked");
    e.preventDefault();
    setData(() => ({
      ...data,
      courses: coursesArray,
      id: isPublished[1] ?? "0",
    }));
    if (data.thumbnail && data.trailer !== null) {
      FetchCreateCourse(token, data).then((res) => {
        setIsPublished(() => [true, res.data.id]);
        setData({ ...data, id: res.data.id });
        toast.success("با موفقیت بارگزاری شد");
      });
    } else toast.error("تمام مقادیر اجباری میباشند");
  };

  useEffect(() => {
    setIsLoading(true);

    if (token)
      if (props.id !== undefined) {
        FetchSingleSubCourse(props.id, token).then((res) => {
          setData({
            id: res.data.id,
            name: res.data.name,
            thumbnail: res.data.thumbnail,
            hasTrailer: true,
            trailer: res.data.trailer,
            price: res.data.price,
            des: res.data.des,
            courses: res.data.courses,
          });
          setIsPublished([true, res.data.id]);

          setIsLoading(false);
        });
      }
    setIsLoading(false);
  }, [props.id, token]);
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  const handleInputChange = (index, fieldName, value) => {
    const updatedCourses = [...data.courses];
    updatedCourses[index][fieldName] = value;
    setData({ ...data, courses: updatedCourses });
  };
  const handleRemoveCourse = (index) => {
    const updatedCourses = [...data.courses];
    updatedCourses.splice(index, 1);
    setData({ ...data, courses: updatedCourses });
  };

  return (
    <div className="container p-10 mx-auto">
      {JSON.stringify(data)}
      <form onSubmit={(e) => HandleSubmitCourse(e)} className="flex " dir="rtl">
        <input
          type="text"
          value={data.name}
          className="px-2 py-1 my-4 text-right bg-white rounded basis-4/5"
          placeholder="عنوان دوره"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          onBlur={(e) => setData({ ...data, name: e.target.value })}
          required
        />

        {isPublished[0] ? (
          <button
            type="submit"
            className="mr-4 basis-1/4 w-full text-gray-600 bg-cyan-400 text-[25px] text-center py-1 cursor-pointer rounded-lg"
          >
            ویرایش
          </button>
        ) : (
          <button
            type="submit"
            className="mr-4 basis-1/4 text-gray-600 bg-green-400 text-[25px] text-center py-1 cursor-pointer rounded-lg"
            disabled={submitted[0]}
          >
            انتشار
          </button>
        )}
      </form>
      <div className="grid grid-cols-12">
        <div className="col-span-4 text-right ">
          {isPublished[0] ? (
            <div className="px-2 mx-1 my-4 text-gray-600 bg-green-300 rounded-lg">
              <a href={`https://methodmoghadam.com`} target="_blank">
                مشاهده سایت
              </a>
            </div>
          ) : (
            ""
          )}

          <div className="mx-1 my-4 text-gray-600">
            <div className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg ">
              <span className="mx-3"> هزینه اشتراک</span>
            </div>
            <div className="flex items-center justify-between">
              تومان
              <input
                value={data.price && data.price}
                type="text"
                placeholder="هزینه دوره را وارد کنید"
                onChange={(e) => setData({ ...data, price: e.target.value })}
                className="text-right rounded-lg grow"
              />
            </div>
          </div>

          <div className="mx-1 my-4 text-gray-600">
            <div className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg ">
              <span className="mx-3"> افزودن تریلر</span>
              <input
                type="checkbox"
                checked={data.hasTrailer}
                onChange={() => {
                  data.hasTrailer == true
                    ? setData({ ...data, hasTrailer: false, trailer: null })
                    : setData({ ...data, hasTrailer: true });
                }}
              />
            </div>
          </div>
          {data.hasTrailer ? (
            <div className="mx-1 my-4 text-gray-600">
              <span
                className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg cursor-pointer"
                onClick={() => setOpenModal(3)}
              >
                انتخاب تریلر
                <FaSourcetree />
              </span>
              <a
                href={data.trailer}
                target="_blank"
                className="flex items-center justify-between gap-4"
              >
                مشاهده تریلر
                <IoPlaySkipBackOutline size={25} />
              </a>
              {/* <video
                width="320"
                height="240"
                controls
                className="w-full bg-red-400 cursor-pointer h-26"
              >
                <source src={data.trailer} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
            </div>
          ) : (
            ""
          )}
          <div className="mx-1 my-4 text-gray-600">
            <span className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg ">
              تصویر شاخص
              <FaSourcetree />
            </span>
            <img
              src={data.thumbnail ?? "/missing.png"}
              onClick={() => setOpenModal(1)}
              alt=""
              className="cursor-pointer h-26"
            />

            {[1, 3].includes(openModal) && (
              <Modal SetModal={SetModal} SetFile={SetFile} />
            )}
            {typeof openModal == "string" && (
              <Modal SetModal={SetModal} SetFile={setLessonFile} />
            )}
          </div>

          <div className="flex justify-between mx-1 my-4 text-gray-600 bg-white">
            <button
              className="px-4 text-black bg-gray-400 "
              onClick={() =>
                setData({
                  ...data,
                  courses: [...data.courses, { name: "", url: "" }],
                })
              }
            >
              +
            </button>

            <span className="flex items-center justify-end px-2 text-left rounded-lg">
              افزودن درس <FaSourcetree />
            </span>
          </div>
        </div>

        <div className="col-span-8">
          <textarea
            className="w-full my-2 text-right"
            onChange={(e) => setData({ ...data, des: e.target.value })}
            value={data.des}
          ></textarea>

          {data.courses.map((sec, i) => (
            <div className="" key={i}>
              <div className="mx-1 my-4 text-gray-600">
                <div className="flex items-center justify-between px-2 mb-2 text-right bg-white rounded-lg">
                  {/* <input
                    type="text"
                    value={sec.url}
                    placeholder="آدرس فایل"
                    className="px-2 py-1 text-right rounded-lg"
                    onChange={(e) =>
                      handleInputChange(i, "url", e.target.value)
                    }
                  /> */}
                  {sec.url == "" ? (
                    <button onClick={(e) => setOpenModal("lesson:" + i)}>
                      انتخاب رسانه
                    </button>
                  ) : (
                    <>
                      <button onClick={(e) => setOpenModal("lesson:" + i)}>
                        ویرایش رسانه
                      </button>
                      <a
                        href={`https://dl.lezatkhayati.com/lezatekhayati/${sec.url}`}
                        target="_blank"
                      >
                        مشاهده رسانه انتخابی
                      </a>
                    </>
                  )}
                  {/* {sec.url !== "" && (
                    <a
                      href={`https://dl.lezatkhayati.com/lezatekhayati/${sec.url}`}
                      target="_blank"
                    >
                      مشاهده رسانه انتخابی
                    </a>
                  )} */}
                  <input
                    type="text"
                    value={sec.name}
                    placeholder="عنوان درس"
                    className="my-1 text-right rounded-lg"
                    onChange={(e) =>
                      handleInputChange(i, "name", e.target.value)
                    }
                  />

                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveCourse(i)}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NewCourse;
