"use client";

import React, { useEffect, useState } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import Editor from "ckeditor5-custom-build";
import Editor from "@ckeditor/ckeditor5-build-classic";

import LessonModal from "../../Components/Modal/Modal";
import {
  blockquote,
  align,
  font,
  fontSize,
  fontColor,
  hiliteColor,
  horizontalRule,
  list,
  table,
  formatBlock,
  lineHeight,
  template,
  paragraphStyle,
  textStyle,
  link,
  image,
  video,
  audio,
  math,
} from "suneditor/src/plugins";
import imageGallery from "../../Components/imageGallery/imageGallery";

import FetchSingleCourse from "../../services/fetchSingleCourse";
import Modal from "../../Components/UploadCenter/Modal";
import { FaCaretLeft, FaSourcetree, FaAngleDown } from "react-icons/fa";
// import { Button, Modal } from "flowbite-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { toast } from "react-toastify";
import { useRef } from "react";
import Loading from "../../Components/Loading";
import FetchCreateCourse from "../../services/fetchCreateCourse";
import { useTokenContext } from "../../Context/token";
import { redirect } from "next/navigation";
const EditCourse = ({ params }) => {
  const [openModal, setOpenModal] = useState(0);
  const [showLesson, setShowLesson] = useState(0);
  const [tagsArray, setTagsArray] = useState([]);
  const [sectionsArray, setSectionsArray] = useState([]);
  const [section, setSection] = useState();
  const [tag, setTag] = useState();
  const ref = useRef(null);
  const lessonRef = useRef([]);
  const secRef = useRef(null);
  const { token } = useTokenContext();

  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [bodyContent, setBodyContent] = useState();
  const [isPublished, setIsPublished] = useState([
    params ? true : false,
    params && params.id,
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [isPricy, setIsPricy] = useState(false);
  const [currentSection, setCurrentSection] = useState();
  const [onUpload, setOnUpload] = useState([]);
  const priceRef = useRef();
  const [data, setData] = useState({
    isPin: false,
    hasPoster: false,
    poster: null,
    price: 0,
    description: null,
    gradient: null,
  });
  const SetModal = (arg) => {
    setOpenModal(arg);
  };

  const SetFile = (arg) => {
    if (openModal == 1) setThumbnail(arg);
    else setData({ ...data, poster: arg });
  };
  const setLessonFile = (arg) => {
    if (openModal == "demo")
      sectionsArray[onUpload[0]]["lessons"][onUpload[1]]["demo"] =
        arg.substr(42);
    else
      sectionsArray[onUpload[0]]["lessons"][onUpload[1]]["url"] =
        arg.substr(42);
    console.log(sectionsArray);
  };

  const handleLessonCollapse = (i) => {
    if (lessonRef.current[i].classList.contains("hidden"))
      lessonRef.current[i].classList.remove("hidden");
    else {
      lessonRef.current[i].classList.add("hidden");
    }
  };
  const HandleNewLesson = (i) => {
    lessonRef.current[i].classList.remove("hidden");
    // sectionsArray.find((item) => item === currentSection);
    // const index = sectionsArray.indexOf(currentSection);
    let lessons = sectionsArray;
    lessons[i]["lessons"].push({
      name: "",
      demo: "",
      url: "",
      content: "",
    });
    sectionsArray[i]["lessons"] = lessons[i]["lessons"];

    setSectionsArray([...sectionsArray]);

    console.log(sectionsArray);
    // setSectionsArray([..sectionsArray , { name: section ,  }])
  };

  const handleTags = (event) => {
    event.preventDefault();
    let isExists = tagsArray.find((item) => item === tag);
    if (!isExists) {
      setTagsArray([tag, ...tagsArray]);
      setTag(null);
      ref.current.value = "";
    } else toast.error("برچسب تکراری نمیتوانید اضافه کنید");
  };
  const handleSections = (event) => {
    event.preventDefault();
    let isExists = sectionsArray.find((item) => item === section);
    if (!isExists) {
      setSectionsArray([...sectionsArray, { name: section, lessons: [] }]);
      setSection(null);
      console.log(sectionsArray);
      secRef.current.value = "";
    } else toast.error("برچسب تکراری نمیتوانید اضافه کنید");
  };
  const handleDeleteTag = async (tg) => {
    let all = tagsArray;
    let item = all.indexOf(tg);
    all.splice(item, 1);
    setTagsArray([...tagsArray]);
  };
  const handleDeleteSection = async (sec) => {
    let all = sectionsArray;

    all.splice(sec, 1);
    setSectionsArray([...sectionsArray]);
  };

  const handleContent = (content) => {
    setBodyContent(content);
  };
  const HandleSubmitCourse = (e) => {
    e.preventDefault();
    if (thumbnail !== null) {
      sectionsArray;
      setSectionsArray([...sectionsArray]);
      let secs = JSON.stringify(sectionsArray);
      console.log(secs);
      FetchCreateCourse(
        token,
        title,
        isPricy,
        "مقدم جو",
        data.poster !== null ? data.poster.substr(42) : null,
        data.isPin,
        bodyContent,
        data.description,
        data.gradient,
        data.price,
        thumbnail.substr(42),
        secs,
        isPublished[1] ? isPublished[1] : null
      ).then((res) => {
        if (res.isDone) {
          if (res.message == "edited") {
            setIsPublished([true, res.data]);
          } else {
            setIsPublished([true, res.data.id]);
          }
          toast.success("با موفقیت بارگزاری شد");
        } else {
          toast.error("خطایی رخ داد");
        }
        // setIsPublished([true, res.data]);
      });
    } else {
      toast.error("تصویر شاخص انتخاب کنید");
    }
  };
  useEffect(() => {
    setIsLoading(true);
    if (isPublished[1]) {
      FetchSingleCourse(token, isPublished[1]).then((res) => {
        let resp = res.data;
        setData({
          isPin: resp.ispin == 0 ? false : true,
          price: resp.price,
          gradient: resp.gradient,
          description: resp.excerpt,
          poster: resp.poster,
          hasPoster: resp.poster !== undefined ? true : false,
        });
        setIsPricy(resp.type == "pricy" ? true : false);
        setThumbnail(resp.img);
        setBodyContent(resp.description);
        resp.sections.map((sec) => {
          sec.lessons.map((less) => {
            less.url !== null
              ? (less.url = less.url.substr(42))
              : (less.url = "");
            less.demo !== null
              ? (less.demo = less.demo.substr(42))
              : (less.demo = "");
          });
        });
        setSectionsArray(resp.sections);
        setTitle(resp.name);
      });
    }

    setIsLoading(false);
  }, []);

  const inputHandler = (event, editor) => {
    setBodyContent(editor.getData());
  };

  const handleLessonNameChange = (sectionIndex, lessonIndex, newName) => {
    setSectionsArray((prevSectionsArray) => {
      const updatedSectionsArray = [...prevSectionsArray];
      updatedSectionsArray[sectionIndex].lessons[lessonIndex].name = newName;
      return updatedSectionsArray;
    });
  };
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="container p-10 mx-auto">
      {showLesson !== 0 && (
        <LessonModal
          method={"lessonSection"}
          data={showLesson.less}
          show={() => setShowLesson(0)}
          output={(value) =>
            (sectionsArray[showLesson.i]["lessons"][showLesson.index][
              "content"
            ] = value)
          }
        />
      )}

      <form onSubmit={(e) => HandleSubmitCourse(e)} className="flex " dir="rtl">
        {JSON.stringify(isPublished)}
        <input
          type="text"
          className="px-2 py-1 my-4 text-right bg-white rounded basis-4/5"
          placeholder="عنوان دوره"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => setTitle(e.target.value)}
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
            disabled={submitted}
          >
            انتشار
          </button>
        )}
      </form>
      <div className="grid grid-cols-12">
        <div className="col-span-4 text-right ">
          {isPublished[0] ? (
            <div className="px-2 mx-1 my-4 text-gray-600 bg-green-300 rounded-lg">
              <a
                href={`https://lezatekhayati.com/course/${isPublished[1]}`}
                target="_blank"
              >
                مشاهده دوره
              </a>
            </div>
          ) : (
            ""
          )}

          <div className="mx-1 my-4 text-gray-600">
            <div className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg ">
              <span className="mx-3"> در صفحه اصلی بماند</span>
              <input
                type="checkbox"
                value={data.isPin}
                checked={data.isPin}
                onChange={() => {
                  data.isPin == true
                    ? setData({ ...data, isPin: false })
                    : setData({ ...data, isPin: true });
                  console.log(data);
                }}
              />
            </div>
            <div
              className={`flex items-center justify-between ${
                data.isPin ? "" : "hidden"
              }`}
            >
              <select
                onChange={(e) => setData({ ...data, gradient: e.target.value })}
              >
                <option value="linear-gradient(180deg, #F90000 39.06%, #000000 100%)">
                  قرمز
                </option>
                <option value="linear-gradient(180deg, #3D39FF 39.06%, #000000 100%)">
                  آبی
                </option>
                <option value="linear-gradient(180deg, #A900F9 39.06%, #000000 100%)">
                  بنفش
                </option>
              </select>
              انتخاب رنگ زمینه
            </div>
          </div>

          <div className="mx-1 my-4 text-gray-600">
            <div className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg ">
              <span className="mx-3"> انتشار بصورت ویژه</span>
              <input
                type="checkbox"
                value={isPricy}
                checked={isPricy}
                onChange={(e) => {
                  isPricy
                    ? (setIsPricy(false),
                      setData({ ...data, price: null }),
                      (priceRef.current.value = null))
                    : setIsPricy(true);
                }}
              />
            </div>

            <input
              type="text"
              className={`${
                isPricy ? "" : "hidden"
              } px-2 mx-6 bg-white rounded-lg w-4/5 text-right`}
              placeholder="هزینه ثبت نام"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              ref={priceRef}
            />
          </div>
          <div className="mx-1 my-4 text-gray-600">
            <div className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg ">
              <span className="mx-3"> افزودن بوستر</span>
              <input
                type="checkbox"
                value={data.hasPoster}
                checked={data.hasPoster}
                onChange={() => {
                  data.hasPoster == true
                    ? setData({ ...data, hasPoster: false, poster: null })
                    : setData({ ...data, hasPoster: true });
                }}
              />
            </div>
          </div>
          {data.hasPoster ? (
            <div className="mx-1 my-4 text-gray-600">
              <span className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg ">
                انتخاب بوستر
                <FaSourcetree />
              </span>
              <img
                src={data.poster ?? "/missing.png"}
                onClick={() => setOpenModal(3)}
                alt=""
                className="cursor-pointer h-26"
              />
            </div>
          ) : (
            ""
          )}
          <div className="mx-1 my-4 text-gray-600">
            <span
              className="flex items-center justify-end px-2 mb-3 text-left bg-white rounded-lg "
              onClick={() => setOpenModal(1)}
            >
              تصویر شاخص | + افزودن
              <FaSourcetree />
            </span>
            <img
              src={thumbnail ?? "/missing.png"}
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

          <div className="mx-1 my-4 text-gray-600">
            <span className="flex items-center justify-end px-2 mb-2 text-left bg-white rounded-lg">
              برچسب ها <FaSourcetree />
            </span>
          </div>
          <form
            onSubmit={handleTags}
            className="flex items-center justify-center w-full"
          >
            <button className="px-2 py-1 text-black bg-gray-400">+</button>
            <input
              required
              type="text"
              className="w-full px-1 mx-2 text-right bg-white rounded"
              placeholder="افزودن برچسب جدید"
              onChange={(e) => setTag(e.target.value)}
              onBlur={(e) => setTag(e.target.value)}
              onFocus={(e) => setTag(e.target.value)}
              ref={ref}
            />
          </form>
          {tagsArray.map((t, i) => (
            <span
              onClick={(e) =>
                handleDeleteTag(e.target.getAttribute("data-value"))
              }
              key={i}
              className="flex-row items-center justify-between mx-4 bg-white rounded cursor-pointer"
              data-value={t}
              disabled
            >
              {t} x
            </span>
          ))}

          <div className="mx-1 my-4 text-gray-600">
            <span className="flex items-center justify-end px-2 mb-2 text-left bg-white rounded-lg">
              افزودن سرفصل <FaSourcetree />
            </span>
          </div>
          <form
            onSubmit={handleSections}
            className="flex items-center justify-center w-full"
          >
            <button className="px-2 py-1 text-black bg-gray-400">+</button>
            <input
              required
              type="text"
              className="w-full px-1 mx-2 text-right bg-white rounded"
              placeholder="افزودن سرفصل جدید"
              onChange={(e) => setSection(e.target.value)}
              onBlur={(e) => setSection(e.target.value)}
              onFocus={(e) => setSection(e.target.value)}
              ref={secRef}
            />
          </form>
          {sectionsArray.map((t, i) => (
            <span
              onClick={() => handleDeleteSection(i)}
              key={i}
              className="flex-row items-center justify-between mx-4 bg-white rounded cursor-pointer"
              data-value={t.name}
              disabled
            >
              {t.name} x
            </span>
          ))}
        </div>

        <div className="col-span-8">
          <SunEditor
            setContents={bodyContent}
            className="px-4 "
            onChange={handleContent}
            setOptions={{
              height: 380,
              requestHeaders: {
                "X-Sample": "sample",
              },
              plugins: [
                blockquote,
                align,
                font,
                fontSize,
                fontColor,
                hiliteColor,
                horizontalRule,
                list,
                table,
                formatBlock,
                lineHeight,
                template,
                paragraphStyle,
                textStyle,
                link,
                image,
                video,
                audio,
                math,
                imageGallery,
              ],
              imageGalleryLoadURL:
                "https://lezatkhayati.com/api/upload/files/editor",
              buttonList: [
                // default
                ["undo", "redo"],
                [
                  ":p-More Paragraph-default.more_paragraph",
                  "font",
                  "fontSize",
                  "formatBlock",
                  "paragraphStyle",
                  "blockquote",
                ],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["fontColor", "hiliteColor", "textStyle"],
                ["removeFormat"],
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                [
                  "-right",
                  ":i-More Misc-default.more_vertical",
                  "fullScreen",
                  "showBlocks",
                  "codeView",
                  "preview",
                  "print",
                  "save",
                  "template",
                ],
                [
                  "-right",
                  ":r-More Rich-default.more_plus",
                  "table",

                  "imageGallery",
                ],
                ["-right", "image", "video", "audio", "link"],
                // (min-width: 992)
                [
                  "%992",
                  [
                    ["undo", "redo"],
                    [
                      ":p-More Paragraph-default.more_paragraph",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "paragraphStyle",
                      "blockquote",
                    ],
                    ["bold", "underline", "italic", "strike"],
                    [
                      ":t-More Text-default.more_text",
                      "subscript",
                      "superscript",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                    ],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["align", "horizontalRule", "list", "lineHeight"],
                    [
                      "-right",
                      ":i-More Misc-default.more_vertical",
                      "fullScreen",
                      "showBlocks",
                      "codeView",
                      "preview",
                      "print",
                      "save",
                      "template",
                    ],
                    [
                      "-right",
                      ":r-More Rich-default.more_plus",
                      "table",
                      "link",
                      "image",
                      "video",
                      "audio",

                      "imageGallery",
                    ],
                  ],
                ],
                // (min-width: 767)
                [
                  "%767",
                  [
                    ["undo", "redo"],
                    [
                      ":p-More Paragraph-default.more_paragraph",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "paragraphStyle",
                      "blockquote",
                    ],
                    [
                      ":t-More Text-default.more_text",
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                    ],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    [
                      ":e-More Line-default.more_horizontal",
                      "align",
                      "horizontalRule",
                      "list",
                      "lineHeight",
                    ],
                    [
                      ":r-More Rich-default.more_plus",
                      "table",
                      "link",
                      "image",
                      "video",
                      "audio",

                      "imageGallery",
                    ],
                    [
                      "-right",
                      ":i-More Misc-default.more_vertical",
                      "fullScreen",
                      "showBlocks",
                      "codeView",
                      "preview",
                      "print",
                      "save",
                      "template",
                    ],
                  ],
                ],
                // (min-width: 480)
                [
                  "%480",
                  [
                    ["undo", "redo"],
                    [
                      ":p-More Paragraph-default.more_paragraph",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "paragraphStyle",
                      "blockquote",
                    ],
                    [
                      ":t-More Text-default.more_text",
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                      "removeFormat",
                    ],
                    [
                      ":e-More Line-default.more_horizontal",
                      "outdent",
                      "indent",
                      "align",
                      "horizontalRule",
                      "list",
                      "lineHeight",
                    ],
                    [
                      ":r-More Rich-default.more_plus",
                      "table",
                      "link",
                      "image",
                      "video",
                      "audio",

                      "imageGallery",
                    ],
                    [
                      "-right",
                      ":i-More Misc-default.more_vertical",
                      "fullScreen",
                      "showBlocks",
                      "codeView",
                      "preview",
                      "print",
                      "save",
                      "template",
                    ],
                  ],
                ],
              ],
            }}
          />
          {/* <CKEditor
            editor={Editor}
            data={bodyContent ?? "توضیحات"}
            onChange={inputHandler}
            config={{
              language: "fa",
              extraPlugins: "html5video",
            }}
            style={{ zIndex: 1 }}
          /> */}

          <textarea
            className="w-full my-2 text-right"
            defaultValue={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea>
          {JSON.stringify(data.description)}
          {sectionsArray.map((sec, i) => (
            <div className="" key={i}>
              <div className="mx-1 my-4 text-gray-600">
                <div className="flex items-end justify-between px-2 mb-2 text-right bg-white rounded-lg">
                  <span
                    className="px-2 text-white bg-red-400 rounded-lg"
                    onClick={() => {
                      HandleNewLesson(i);
                    }}
                  >
                    افزودن درس
                  </span>
                  <span
                    className="flex items-center cursor-pointer"
                    onClick={() => handleLessonCollapse(i)}
                  >
                    <FaAngleDown /> {sec.name}
                  </span>
                </div>
              </div>

              <div
                ref={(element) => {
                  lessonRef.current[i] = element;
                }}
                className="hidden"
              >
                {sec.lessons.map((less, index) => (
                  <div className="mx-1 my-4 text-gray-600" key={index}>
                    <div className="flex items-center justify-between px-2 py-2 mb-2 text-right bg-white rounded-lg">
                      <div
                        onClick={() => setShowLesson({ less, i, index })}
                        className="cursor-pointer"
                      >
                        ویرایشگر متنی
                      </div>
                      <button
                        className="px-2 bg-red-200 rounded-lg"
                        onClick={() => {
                          const updatedSectionsArray = [...sectionsArray];
                          updatedSectionsArray[i].lessons.splice(index, 1);
                          setSectionsArray(updatedSectionsArray);
                        }}
                      >
                        حذف
                      </button>
                      {less.url !== "" && (
                        <>
                          <a
                            href={`https://dl.lezatkhayati.com/lezatekhayati/${less.url}`}
                            target="_blank"
                            className="px-1 text-sm rounded-lg bg-cyan-200"
                          >
                            مشاهده
                          </a>
                        </>
                      )}

                      <button
                        className="px-2 bg-green-200 rounded-lg"
                        onClick={() => {
                          setOpenModal("file");
                          setOnUpload([i, index]);
                        }}
                      >
                        انتخاب رسانه
                      </button>

                      {less.demo !== "" && (
                        <>
                          <a
                            href={`https://dl.lezatkhayati.com/lezatekhayati/${less.demo}`}
                            target="_blank"
                            className="px-1 text-sm rounded-lg bg-cyan-200"
                          >
                            مشاهده
                          </a>
                        </>
                      )}
                      <button
                        className="px-2 bg-green-200 rounded-lg"
                        onClick={() => {
                          setOpenModal("demo");
                          setOnUpload([i, index]);
                        }}
                      >
                        انتخاب دمو
                      </button>
                      {/* {JSON.stringify(
                        sectionsArray[i]["lessons"][index]["name"]
                      )} */}
                      <input
                        type="text"
                        className="text-right rounded-lg"
                        value={less.name}
                        placeholder="عنوان "
                        onChange={(e) =>
                          handleLessonNameChange(i, index, e.target.value)
                        }
                        onBlur={(e) =>
                          handleLessonNameChange(i, index, e.target.value)
                        }
                      />
                      {index}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EditCourse;
